var assert = require('assert');
const TestStructureBuilder = require('./structure.spec');
const Product = require('../dist/entities/ProductBase').default;
const ProductConsignment = require('../dist/entities/ProductConsignment').default;
const ProductSupplierItem = require('../dist/entities/ProductSupplierItem').default;
const UserCartProduct = require('../dist/entities/UserCartProduct').default;
describe(' Проверка класса товар в корзине', function () {
    const product = new Product({
        id: 12,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        description: 'Описание товара Тетарабуина',
        isGNVLS: false,
        isPrescription: true,
        supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
        consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
    });
    const productStockConsignment = new ProductConsignment({ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' });
    const productStockSupplier = new ProductSupplierItem({ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' });
    const pc = new UserCartProduct(product, productStockConsignment, 18 );
    describe('UserCartProduct', function () {
        it('.setQuantity() === 4', () => {
            assert.equal(pc.setQuantity(4), 4);
        });
        it('.getQuantity() === 4', () => {
            assert.equal(pc.getQuantity(), 4);
        });

        it('.getAmount() === 7680', () => {
            assert.equal(pc.getAmount(), 7680);
        });
        it('.getModel() === {***}', () => {
            assert.deepEqual(pc.getModel(), {
                id: null,
                consigmentID: 100200346412,
                supplierPricelistID: null,
                supplierProductID: null,
                title: "Tetarubuin",
                type: 1,
                image: "product-154474.jpg",
                price: 1920,
                productID: 12,
                quantity: 4
            });
        });
    });
});
