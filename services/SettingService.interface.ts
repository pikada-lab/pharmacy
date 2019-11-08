import PharmacyDetails from "../class/PharmacyDetails";
import { AuxHttpResponse } from "../interfaces/AuxHttpClient.interface";
import ConfigurationDetails from "../class/ConfigurationDetails";

export const URL_API = `https://allo-apteka.ru/api`;
export default interface SettingService {
    /**
     *  Возвращает истину, если авторизация прошла успешно.
     */
    registration(type: string): ServiceRespone<boolean>;
    getHeaderImage(): string;
    touch(): void;
    showAD(callback: (image: string) => void): void;
    getPharmacies(): AuxHttpResponse<PharmacyDetails[]>;
    getCurrentPharmacy(): PharmacyDetails;
    changePharmacy(parmacy: PharmacyDetails): void;
    update(): AuxHttpResponse<ConfigurationDetails>;
}