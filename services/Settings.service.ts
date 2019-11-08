import AuxHttpClient, { ResponseApi, map, AuxHttpResponse, switchMap, empty } from "../interfaces/AuxHttpClient.interface";
import SettingService, { URL_API } from "./SettingService.interface";
import PharmacyDetails from "../class/PharmacyDetails";
import ConfigurationDetails from "../class/ConfigurationDetails";
import { RepositoryModifer } from "../interfaces/Repository.interface";

export default class SetttingsService implements SettingService {
    private currentPharmacy: PharmacyDetails;
    private settings: ConfigurationDetails;
    private timerID: number;
    private startAD: (image: string) => void;

    constructor(protected http: AuxHttpClient, protected tokenRepository: RepositoryModifer<string>) { }

    /**
     *  Выполняется 1 раз при подтверждении авторизации в терминале. 
     *  Он регистрируется и возвращает вечный ( на 5 лет) токен JWT с маской прав для работы без авторизации
     *  Структура токена хранит номер терминала и тип токена.
     * @property type - "terminale" | "web" - указывает что мы регистрируем
     */
    registration(type: string ): ServiceRespone<any> {
        return this.http.post<{ access: string }>(`${URL_API}/v1/settings/authorization`, JSON.stringify({type: type })).pipe(
            switchMap(
                (response) => {
                    console.log(1, response);
                    if (response.status !== 0) return empty();
                    this.tokenRepository.create(response.response.access).then(_ => { });
                    return this.update();
                }
            )
        );
    }

    update(): AuxHttpResponse<ConfigurationDetails> {
        return this.http.get<ConfigurationDetails>(`${URL_API}/v1/settings`).pipe(map((response: ResponseApi<ConfigurationDetails>) => {
            console.log(2, response);
            if (response.status !== 0) return;
            this.settings = response.response;
            this.currentPharmacy = this.settings.pharmacy;
            this.touch();
            return response;
        }))
    }
    getHeaderImage(): string {
        return this.settings.headerImage;
    }
    touch(): void {
        this.adTimer()
    }
    showAD(startAD: (image: string) => void): void {
        this.startAD = startAD;
    }

    private adTimer() {
        if (this.timerID) {
            clearTimeout(this.timerID)
        }
        this.timerID = setTimeout(() => this.startAD ? this.startAD(this.settings.fullScreenImage) : undefined, this.settings.userInteractionTimeot)
    }
    getPharmacies(): AuxHttpResponse<PharmacyDetails[]> {
        return this.http.get(`${URL_API}/v1/settings/pharmacies`).pipe(
            map(response => {
                if (response.status === 0) {
                }
                return response;
            })
        )
    }
    getCurrentPharmacy(): PharmacyDetails {
        return this.currentPharmacy;
    }
    changePharmacy(pharmacy: PharmacyDetails): ServiceRespone<any> {
        return this.http.put<boolean>(`${URL_API}/v1/settings/`, JSON.stringify({ pharmacy: pharmacy })).pipe(map(_ => { this.update(); return true; }));
    }

}