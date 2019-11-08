var assert = require('assert');
const SettingsService = require('../dist/services/Settings.service').default
const AuxHttpClientTest = require('../dist/interfaces/AuxHttpClient.interface').AuxHttpClientTest
const SettingRepositoriy = require('../dist/interfaces/Repository.interface').SettingRepositoriy;
describe(' Проверка класса сервис SetttingsService', function () {
    const pc = new SettingsService(new AuxHttpClientTest(), new SettingRepositoriy() );
    describe('PharmacysService', function () {
        
        it('.registration() === JWT.TOKEN.IS', (done) => {
            pc.registration("terminal").subscribe(async _=>{
                let repo = new SettingRepositoriy();
                let token = await repo.getByID(0);
                assert.equal(token, "JWT.TOKEN.IS");
                done()
            }) 
        });

        it('.getHeaderImage() === string', ( ) => {
            assert.equal(pc.getHeaderImage(), "img1.jpg");
        }); 
        it('.showAD() === string', (done) => {
            pc.touch();
            pc.showAD((image) => {
                assert.equal(image, "img2.jpg");
                done();
            }) 
           
        }); 
        it('.getCurrentPharmacy().id === 1', ( ) => { 
                assert.equal(pc.getCurrentPharmacy().id, 1);  
        }); 
    });
});
