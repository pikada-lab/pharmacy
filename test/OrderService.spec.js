var assert = require('assert');
const OrdersService = require('../dist/services/Orders.service').default
const AuxHttpClientTest = require('../dist/interfaces/AuxHttpClient.interface').AuxHttpClientTest
describe(' Проверка класса сервис OrdersService', function () {
    const pc = new OrdersService(new AuxHttpClientTest()  );
    describe('OrdersService', function () {
        it('.getList() === orders', (done) => {
            pc.getList(1).subscribe((orders)=>{
                assert.equal(orders.status, 0);
                done()
            })
        });
        it('.getByID(2) === order', (done) => {
            pc.getByID(2).subscribe((order)=>{
                assert.equal(order.status, 4);
                done()
            })
        });
        it('.cancel() === true', (done) => {
            pc.cancel().subscribe((cancel)=>{
                assert.equal(cancel.response, true);
                done()
            })
        }); 
    });
});
