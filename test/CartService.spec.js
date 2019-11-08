// var assert = require('assert');
// const TestStructureBuilder = require('./structure.spec');
// const CartsService = require('../dist/services/Carts.service').CartsService;
// const AuxHttpClientTest = require('../dist/interfaces/AuxHttpClient.interface').AuxHttpClientTest;
// const CartRepositoriy = require('../dist/interfaces/Repository.interface').CartRepositoriy;
// describe(' Проверка класса сервис Cart', function () {
//     const pc = new CartsService(new AuxHttpClientTest(), new CartRepositoriy());
//     describe('CartsService', function () {
//         it('.save() === ', (done) => {
//             pc.save().subscribe((res)=>{
//                 assert.equal(res, true);
//                 done()
//             })
//         });
//         it('.getReadyDate() === ', (done) => {
//             pc.getProductByID().subscribe((date)=>{
//                 assert.equal(date, new Date('2020-01-04T00:00:00.000Z'));
//                 done()
//             })
//         });
//         it('.setAdress() === ', (done) => {
//             pc.setAdress('{street: "ул. Пржевальского", building: 14, appartment: 4, floor: 5, frontDoor: 1, intercom: "14B"}').subscribe((product)=>{
//                 assert.equal(product.response.length, {
//                     id: null,
//                     orderId: null,
//                     adress: {street: "ул. Пржевальского", building: 14, appartment: 4, floor: 5, frontDoor: 1, intercom: "14B"},
//                     plannedDate: new Date('2020-01-04T00:00:00.000Z'),
//                     cost: 250,
//                     comment: null,
//                     curier: null});
//                 done()
//             })
//         });
//         it('.valid() === ', (done) => {
//             pc.valid().subscribe((date)=>{
//                 assert.equal(date, true);
//                 done()
//             })
//         });
//         // it('.send() === ', (done) => {
//         //     pc.send().subscribe((orderID)=>{
//         //         assert.equal(orderID, 5587);
//         //         done()
//         //     })
//         // });
//     });
// });

// /*

// save(): ServiceRespone<boolean>; 
// getReadyDate(): ServiceRespone<ResponseApi<Date>>
// getDelivery(): ServiceRespone<Delivery>;
// setAdress(adress: Adress): ServiceRespone<ResponseApi<Delivery>>;

// add(product: Product, item: ProductStock, quantity: number): boolean;
// remove(item: CartProduct): boolean;
// findByProduct(item: Product): CartProduct[]; 
// getProducts(): CartProduct[];

// clear(): void;

// valid(): ServiceRespone<string>;
// send(): ServiceRespone<number>;

// getCountItems(): number;
// getAmount(): number;

// setUserContacts(user: OrderUserContacts): boolean;
// changePharmacyDetails(pharmacy: PharmacyDetails):  ServiceRespone<ProductDecided[]>;
// changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean;
// */