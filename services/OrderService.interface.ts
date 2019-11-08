import Order from "../interfaces/Order.interface";
import { AppEvent } from "../interfaces/AppEvent.interface";
import { AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";

export default interface OrderService {
  getList(): AuxHttpResponse<Order[]>;
  getByID(id: number): AuxHttpResponse<Order>;
  cancel(id: number): AuxHttpResponse<boolean>;
  // changeStatus(): AuxHttpResponse<AppEvent>;
}