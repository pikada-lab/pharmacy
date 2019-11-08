import Product from "../interfaces/Product.interface";
import { AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";

export default interface ProductService {
    getProductByID(id: number): AuxHttpResponse<Product>;
    getProductsByID(id: number[]): AuxHttpResponse<Product[]>;
}