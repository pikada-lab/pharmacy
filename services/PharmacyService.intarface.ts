import Hint from "../class/Hint";
import Product from "../interfaces/Product.interface";
import ProductService from "./ProductService.interface";
import { AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";

export default interface PharmacyService extends ProductService {
    smartHints(text: string): AuxHttpResponse<Hint[]>;
    smartSearch(text: string, page: number): AuxHttpResponse<Product[]>;
    setCountProductOnPage(count: number): void;
}