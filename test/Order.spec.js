var assert = require('assert');
const TestStructureBuilder = require('./structure.spec');
const Product = require('../dist/entities/ProductBase').default;
const ProductConsignment = require('../dist/entities/ProductConsignment').default;
const UserCartProduct = require('../dist/entities/UserCartProduct').default;
const OrderProduced = require('../dist/entities/OrderProduced').default
describe(' Проверка класса товар на складе поставщика', function () {
    const product = new Product({
        id: 12,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        description: 'Описание товара Тетарабуина',
        isGNVLS: false,
        isPrescription: true,
        supplierProducts: [{id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}, {id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}],
        consignments: [{id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z'}]
    });
    const productStock = new ProductConsignment({id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z'});
    const cartProduct1 = new UserCartProduct( product, productStock,  18);
    const pc = new OrderProduced({
        id: 998,
        products: [TestStructureBuilder.productOrdered1, TestStructureBuilder.productOrdered2],
        customer: TestStructureBuilder.userContacts,
        pharmacy: TestStructureBuilder.pharmacy,
        type: 1,
      
        delivery: TestStructureBuilder.deliveryOrder,
        payment: TestStructureBuilder.payment,
        comment: 'Комментарий к заказу',
      
        events: [TestStructureBuilder.event1, TestStructureBuilder.event2]
    });
    describe('OrderProduced', function () {
        it('.checkCancelPossibility() === false', () => {
            assert.equal(pc.checkCancelPossibility(), false);
        });
        it('.getAmount() === 51210', () => {
            assert.equal(pc.getAmount(), 51210);
        });
        
        it('.getDelivery() === object', () => {
            assert.equal(pc.getDelivery() !== undefined, true);
        });
        
        it('.getDeliveryPrice() === 0', () => {
            assert.equal(pc.getDeliveryPrice(), 0);
        });
        it('.getCurrentStatus() === object', () => {
            assert.equal(pc.getCurrentStatus(), 3);
        });
        it('.getId() === 998', () => {
            assert.equal(pc.getId(), 998);
        });
        it('.getProducts().length === object', () => {
            assert.equal(pc.getProducts().length, 2);
        });
        it('.getOrderEvents().length === 2', () => {
            assert.equal(pc.getOrderEvents().length, 2);
        });
        
        it('.pushEvent({status: 1}) => .getCurrentStatus() == 1 ', () => {
            pc.pushEvent(TestStructureBuilder.event3);
            assert.equal(pc.getCurrentStatus(), 1);
        });
        it('.checkCancelPossibility() === true', () => { 
            assert.equal(pc.checkCancelPossibility(), true);
        });
        it('.getDeliveryStatus() === 1', () => { 
            assert.equal(pc.getDeliveryStatus(), 1);
        });
        it('.pushEvent({status: 5, entity: 3}) => .getDeliveryStatus() == 5 ', () => {
            pc.pushEvent(TestStructureBuilder.event5);
            assert.equal(pc.getDeliveryStatus(), 5);
        });
        it('.pushEvent({status: 4, id: 1}) => .getCurrentStatus() == 1 ', () => {
            pc.pushEvent(TestStructureBuilder.event2);
            assert.equal(pc.getCurrentStatus(), 1);
        });
        // it('.getModel() === {***}', () => {
        //     assert.deepEqual(pc.getModel(), {
        //         id: 998,
        //         products: [TestStructureBuilder.productOrdered1, TestStructureBuilder.productOrdered2],
        //         customer: TestStructureBuilder.userContacts,
        //         pharmacy: TestStructureBuilder.pharmacy,
        //         type: 1,
            
        //         delivery: TestStructureBuilder.delivery,
        //         payment: TestStructureBuilder.payment,
        //         comment: 'Комментарий к заказу',
            
        //         events: [TestStructureBuilder.event1, TestStructureBuilder.event2]
        //     });
        // });
    });
});
