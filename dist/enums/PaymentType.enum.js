"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["CASH"] = 1] = "CASH";
    /**
     * Банковская карта (кредитная, дебетовая)
     */
    PaymentType[PaymentType["PAYMENT_CARD"] = 2] = "PAYMENT_CARD";
    /**
     * Безналичный перевод для аптечек
     */
    PaymentType[PaymentType["BANK_TRANSFER"] = 3] = "BANK_TRANSFER";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
//# sourceMappingURL=PaymentType.enum.js.map