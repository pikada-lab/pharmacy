import OrderService from "./OrderService.interface";
import Order from "../interfaces/Order.interface";
import AuxHttpClient, { AuxHttpResponse, map } from "../interfaces/AuxHttpClient.interface"; 
import ProductsService from "./Products.service"; 
import { URL_API } from "./SettingService.interface";
import OrderProduced from "../entities/OrderProduced";

export default class OrdersService extends ProductsService implements OrderService {
    constructor(http: AuxHttpClient) {
        super(http);
    }

    getList(): AuxHttpResponse<Order[]> {
        return this.http.get<Order[]>(`${URL_API}/v1/orders`).pipe(
            map(response => {
                if(response.status === 0) {
                    const orders: Order[] = [];
                    response.response.forEach((element: any) => {
                        orders.push((element)); // TODO определить класс элемента в списке заказов
                    });
                    response.response = orders;
                }
                return response;
            })
        )
    }
    getByID(id: number): AuxHttpResponse<Order> {
        return this.http.get<OrderProduced>(`${URL_API}/v1/orders/${id}`).pipe(
            map(response => {
                if(response.status === 0) {
                    response.response = new OrderProduced(response.response);
                }
                return response;
            })
        )
    }
    cancel(id: number): AuxHttpResponse<boolean> {
        return this.http.get(`${URL_API}/v1/orders/${id}/cancel`);
    }
    // changeStatus(): AuxHttpResponse<AppEvent> {
    //     throw new Error("Method not implemented.");
    // }


}