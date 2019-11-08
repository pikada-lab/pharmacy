"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuxHttpClient_interface_1 = require("../interfaces/AuxHttpClient.interface");
const SettingService_interface_1 = require("./SettingService.interface");
class SetttingsService {
    constructor(http, tokenRepository) {
        this.http = http;
        this.tokenRepository = tokenRepository;
    }
    /**
     *  Выполняется 1 раз при подтверждении авторизации в терминале.
     *  Он регистрируется и возвращает вечный ( на 5 лет) токен JWT с маской прав для работы без авторизации
     *  Структура токена хранит номер терминала и тип токена.
     * @property type - "terminale" | "web" - указывает что мы регистрируем
     */
    registration(type) {
        return this.http.post(`${SettingService_interface_1.URL_API}/v1/settings/authorization`, JSON.stringify({ type: type })).pipe(AuxHttpClient_interface_1.switchMap((response) => {
            console.log(1, response);
            if (response.status !== 0)
                return AuxHttpClient_interface_1.empty();
            this.tokenRepository.create(response.response.access).then(_ => { });
            return this.update();
        }));
    }
    update() {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/settings`).pipe(AuxHttpClient_interface_1.map((response) => {
            console.log(2, response);
            if (response.status !== 0)
                return;
            this.settings = response.response;
            this.currentPharmacy = this.settings.pharmacy;
            this.touch();
            return response;
        }));
    }
    getHeaderImage() {
        return this.settings.headerImage;
    }
    touch() {
        this.adTimer();
    }
    showAD(startAD) {
        this.startAD = startAD;
    }
    adTimer() {
        if (this.timerID) {
            clearTimeout(this.timerID);
        }
        this.timerID = setTimeout(() => this.startAD ? this.startAD(this.settings.fullScreenImage) : undefined, this.settings.userInteractionTimeot);
    }
    getPharmacies() {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/settings/pharmacies`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
            }
            return response;
        }));
    }
    getCurrentPharmacy() {
        return this.currentPharmacy;
    }
    changePharmacy(pharmacy) {
        return this.http.put(`${SettingService_interface_1.URL_API}/v1/settings/`, JSON.stringify({ pharmacy: pharmacy })).pipe(AuxHttpClient_interface_1.map(_ => { this.update(); return true; }));
    }
}
exports.default = SetttingsService;
//# sourceMappingURL=Settings.service.js.map