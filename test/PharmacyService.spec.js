var assert = require('assert');
const PharmacysService = require('../dist/services/Pharmacys.service').default
const AuxHttpClientTest = require('../dist/interfaces/AuxHttpClient.interface').AuxHttpClientTest
describe(' Проверка класса сервис PharmacysService', function () {
    const pc = new PharmacysService(new AuxHttpClientTest());
    describe('PharmacysService', function () {
        it('.smartHints(string) === hints', (done) => {
            pc.smartHints('асп').subscribe((hints)=>{
                assert.equal(hints.status, 0);
                done()
            })
        });
        it('.smartSearch(string) === products', (done) => {
            pc.smartSearch('аспирин').subscribe((products)=>{
                assert.equal(products.status, 0);
                done()
            })
        });
    });
});
