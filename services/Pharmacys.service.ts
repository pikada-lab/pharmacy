import ProductService from "./ProductService.interface";
import AuxHttpClient, { ResponseApi, map, AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";
import Product from "../interfaces/Product.interface";
import { URL_API } from "./SettingService.interface";
import ProductBase from "../entities/ProductBase";
import PharmacyService from "./PharmacyService.intarface";
import Hint from "../class/Hint";
import ProductsService from "./Products.service";

export default class PharmacysService extends ProductsService implements PharmacyService {
    private items: number = 8;
    constructor(protected http: AuxHttpClient) { 
        super(http);
    }
    smartHints(part: string): AuxHttpResponse<Hint[]> {
        return this.http.get(`${URL_API}/v1/products/hints/${part}`).pipe(
            map(response => { 
                if(response.status === 0) {
                    const hints:Hint[] = [];
                    response.response.forEach((element: any) => {
                        hints.push((element as Hint));
                    });
                    response.response = hints;
                }
                return response;
            })
        )
    }
    smartSearch(text: string, page: number): AuxHttpResponse<Product[]> {
        return this.http.get(`${URL_API}/v1/products/search/${text}&page=${page}&items=${this.items}`).pipe(
            map(response => { 
                if(response.status === 0) {
                    const products:Product[] = [];
                    response.response.forEach((element: any) => {
                        products.push(new ProductBase(element));
                    });
                    response.response = products;
                }
                return response;
            })
        )
    }
    setCountProductOnPage(count: number): void {
        this.items = count;
    }
}