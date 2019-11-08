import ProductService from "./ProductService.interface";
import AuxHttpClient, { map, AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";
import Product from "../interfaces/Product.interface";
import { URL_API } from "./SettingService.interface";
import ProductBase from "../entities/ProductBase";

export default class ProductsService implements ProductService {

    constructor(protected http: AuxHttpClient) {}
    getProductByID(id: number): AuxHttpResponse<Product> {
        return this.http.get(`${URL_API}/v1/products/${id}`).pipe(
            map(response => { 
                if(response.status === 0) {
                    response.response = new ProductBase(response.response);
                }
                return response;
            })
        )
    }
    getProductsByID(id: number[]): AuxHttpResponse<Product[]> {
        return this.http.get(`${URL_API}/v1/products/${id.join(',')}?arrayId`).pipe(
            map(response => { 
                if(response.status === 0) {
                    if(Array.isArray(response.response)) {
                        const redis = [];
                        for( let i of response.response)
                            redis.push(new ProductBase(i)); 
                        response.response = redis;
                    } 
                }
                return response;
            }))
    }
}