import UserCart from "../entities/UserCart"
import Cart from "./Cart.interface"
import { StructureType } from "./StructureType.type";

export interface RepositoryGetOne<I> {
    getByID(id: number): Promise<I>;
}

export interface RepositoryGetAll<I> extends RepositoryGetOne<I> {
    all(): Promise<I[]>;
}


export interface RepositoryModifer<I> extends RepositoryGetAll<I> {
    create(data: I): Promise<I>;
    update(data: I, id: number): Promise<I>;
    deleteById(id: number): Promise<boolean>;
}

/*
interface RepositoryRespone<I> {
    response(callback: (data: I) => void): void;
}
*/

/**
 * @example
 *
// class OrderRepo implements RepositoryGetOne<number> {
//     getByID(id: number) {
//         return {
//             then: (callback: (data: number) => void) => {
//                 setTimeout(() => {
//                     callback(id)
//                 }, 1000)
//                 return this;
//             }
//         }
//     }
// }
// const r = new OrderRepo() as RepositoryGetOne<number>;
// r.getByID(11).response((data: number) => {})
// */
var RepositoryBase: StructureType[] = [];

export class CartRepositoriy implements RepositoryModifer<StructureType>  {
    create(data: StructureType): Promise<StructureType> {
        return new Promise<StructureType>((resolve, reject) => {
            RepositoryBase.push(data);
           resolve(data);
      })
    }
    update(data: StructureType, id: number): Promise<StructureType> {
        return new Promise<StructureType>((resolve, reject) => {
             RepositoryBase[id] = data;
            resolve(data);
       })
    }
    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
             delete RepositoryBase[id]
             resolve(true);
        })
    }
    all(): Promise<StructureType[]> {
        return new Promise<StructureType[]>((resolve, reject) => {
            if (!Array.isArray(RepositoryBase)) { reject("Error: 1, Test repository dose not work"); }
            resolve(RepositoryBase);
        })
    }
    getByID(id: number) {
        return new Promise<StructureType>((resolve, reject) => {
            if (!RepositoryBase[id]) { reject("Error: 1, Test repository dose not work"); }
            resolve(RepositoryBase[id]);
        })
    }
}

var RepositoryToken: string[] = [];
export class SettingRepositoriy implements RepositoryModifer<string>  {
    create(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            RepositoryToken.push(data);
           resolve(data);
      })
    }
    update(data: string, id: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            RepositoryToken[id] = data;
            resolve(data);
       })
    }
    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
             delete RepositoryToken[id]
             resolve(true);
        })
    }
    all(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            if (!Array.isArray(RepositoryToken)) { reject("Error: 1, Test repository dose not work"); }
            resolve(RepositoryToken);
        })
    }
    getByID(id: number) {
        return new Promise<string>((resolve, reject) => {
            if (!RepositoryToken[id]) { reject("Error: 1, Test repository dose not work"); }
            resolve(RepositoryToken[id]);
        })
    }
}
 