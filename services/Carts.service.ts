import CartService from "./CartService.interface";
import Cart from "../interfaces/Cart.interface";
import AuxHttpClient, { ResponseApi, map } from "../interfaces/AuxHttpClient.interface";
import { RepositoryModifer } from "../interfaces/Repository.interface";
import UserCart from "../entities/UserCart";
import { StructureType } from "../interfaces/StructureType.type";
import Product from "../interfaces/Product.interface";
import ProductStock from "../interfaces/ProductStock.interface";
import CartProduct from "../interfaces/CartProduct.interface";
import OrderUserContacts from "../class/OrderUserContacts";
import { Adress } from "../class/Adress";
import Delivery from "../entities/Delivery";
import ProductsService from "./Products.service";
import { URL_API } from "./SettingService.interface";
import ProductBase from "../entities/ProductBase";

export class CartsService extends ProductsService implements CartService {
    private cart: Cart;
    private ready: boolean;

    constructor(http: AuxHttpClient, private repository: RepositoryModifer<StructureType>) {
        super(http);

        this.repository.getByID(0).then((cart) => {
            this.ready = false;
            const ids: number[] = (cart.products as any[]).reduce((ids, addid) => ids.push(addid.id), []);
            this.cart = new UserCart(cart);
            this.getProductsByID(ids).subscribe((products) => {
                this.cart.actualizeCartProducts(products.response);
                this.ready = true;
            })
        }).catch(() => {
            this.cart = new UserCart();
            this.repository.create(this.cart.getModel()).then(_=>{
                this.ready = true;
            }); 
        });
    }
    send(): ServiceRespone<number> {
        // TODO http
        return {
            subscribe: (callback) => {
                this.valid().subscribe(
                    (serverError) => {
                        if(serverError) {
                            return console.error('error: ', serverError);
                        }
                        this.http.post<number>(`${URL_API}/v1/orders`, JSON.stringify(this.cart.getModel()))
                        .subscribe((res) => callback(res.response))
                    }
                )
            }
        }
    }
    save(): ServiceRespone<boolean> {
        return {
            subscribe: (callback) => {
                this.ready = false;
                this.repository.update(this.cart.getModel(), 0).then(() => {
                    this.ready = true;
                    if (typeof callback != undefined) {
                        callback(true);
                    }
                }).catch(() => {
                    this.ready = true;
                    callback(false);
                })
            }
        }
    }
    getReadyDate(): ServiceRespone<ResponseApi<Date>> {
        return this.http.get(`${URL_API}/v1/orders/ready-date`).pipe(
            map(response => {
                if(response.status === 0) {
                    response.response = new ProductBase(response.response);
                }
                return response;
            })
        )
    }
    getDelivery(): ServiceRespone<Delivery> {
        return {
            subscribe: (callback) => {
                if (typeof callback != undefined) {
                    callback(this.cart.getDelivery());
                }
            }
        }
    }
    setAdress(adress: Adress): ServiceRespone<ResponseApi<Delivery>> {
        return this.http.post(`${URL_API}/v1/orders/adress`, JSON.stringify(adress)).pipe(
            map(response => { 
                if(response.status === 0) {
                    this.cart.setDelivery(response.response as Delivery);
                    response.response = (response.response as Delivery);
                }
                return response;
            })
        )
    }
    add(product: Product, item: ProductStock, quantity: number): boolean {
        if (this.cart.add(product, item, quantity)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    remove(item: CartProduct): boolean {
        if (this.cart.remove(item)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    findByProduct(item: Product): CartProduct[] {
        return this.cart.findByProduct(item);
    }
    getProducts(): CartProduct[] {
        return this.cart.getProducts();
    }
    clear(): void {
        this.cart.clear();
        this.save().subscribe(() => { });
    }
    valid(): ServiceRespone<string> {
        // TODO http
        return {
            subscribe: (callback) => {
                if (typeof callback != undefined) {
                    if(!this.cart.valid() ) {
                        return callback('Корзина не валидна');
                    }
                    this.http.post<string>(`${URL_API}/v1/orders/valid`, JSON.stringify(this.cart.getModel()))
                    .subscribe((res) => callback(res.message))
                }
            }
        }
    }
    getCountItems(): number {
        return this.cart.getCountItems();
    }
    getAmount(): number {
        return this.cart.getAmount();
    }
    setUserContacts(user: OrderUserContacts): boolean {
        this.save().subscribe(() => { });
        if ( this.cart.setUserContacts(user)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    changePharmacyDetails(pharmacy: import("../class/PharmacyDetails").default): ServiceRespone<import("../interfaces/ProductDecided.interface").default[]> {
        throw new Error("Method not implemented.");
    }
    changePharmacyApply(pharmacy: import("../class/PharmacyDetails").default, producStockDecided: import("../interfaces/ProductDecided.interface").default[]): boolean {
        throw new Error("Method not implemented.");
    }
}