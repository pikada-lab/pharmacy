var assert = require('assert');
const ProductsService = require('../dist/services/Products.service').default
const AuxHttpClientTest = require('../dist/interfaces/AuxHttpClient.interface').AuxHttpClientTest
describe(' Проверка класса сервис ProductsService', function () {
    const pc = new ProductsService(new AuxHttpClientTest());
    describe('ProductsService', function () {
        it('.getProductByID(1) === product', (done) => {
            pc.getProductByID(1).subscribe((product)=>{
                assert.equal(product.status, 0);
                done()
            })
        });
        it('.getProductByID(2) === product', (done) => {
            pc.getProductByID(2).subscribe((product)=>{
                assert.equal(product.status, 4);
                done()
            })
        });
        it('.getProductsByID([1,2,3]) === product[]', (done) => {
            pc.getProductsByID([1,2,3]).subscribe((product)=>{
                assert.equal(product.response.length, 3);
                done()
            })
        });
        it('.getProductsByID([1,2,3]) === product[]', (done) => {
            pc.getProductsByID([4,5]).subscribe((product)=>{
                assert.equal(product.message, 'Bad request');
                done()
            })
        });
    });
});
