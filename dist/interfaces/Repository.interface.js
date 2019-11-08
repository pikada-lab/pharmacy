"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var RepositoryBase = [];
class CartRepositoriy {
    create(data) {
        return new Promise((resolve, reject) => {
            RepositoryBase.push(data);
            resolve(data);
        });
    }
    update(data, id) {
        return new Promise((resolve, reject) => {
            RepositoryBase[id] = data;
            resolve(data);
        });
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            delete RepositoryBase[id];
            resolve(true);
        });
    }
    all() {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(RepositoryBase)) {
                reject("Error: 1, Test repository dose not work");
            }
            resolve(RepositoryBase);
        });
    }
    getByID(id) {
        return new Promise((resolve, reject) => {
            if (!RepositoryBase[id]) {
                reject("Error: 1, Test repository dose not work");
            }
            resolve(RepositoryBase[id]);
        });
    }
}
exports.CartRepositoriy = CartRepositoriy;
var RepositoryToken = [];
class SettingRepositoriy {
    create(data) {
        return new Promise((resolve, reject) => {
            RepositoryToken.push(data);
            resolve(data);
        });
    }
    update(data, id) {
        return new Promise((resolve, reject) => {
            RepositoryToken[id] = data;
            resolve(data);
        });
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            delete RepositoryToken[id];
            resolve(true);
        });
    }
    all() {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(RepositoryToken)) {
                reject("Error: 1, Test repository dose not work");
            }
            resolve(RepositoryToken);
        });
    }
    getByID(id) {
        return new Promise((resolve, reject) => {
            if (!RepositoryToken[id]) {
                reject("Error: 1, Test repository dose not work");
            }
            resolve(RepositoryToken[id]);
        });
    }
}
exports.SettingRepositoriy = SettingRepositoriy;
//# sourceMappingURL=Repository.interface.js.map