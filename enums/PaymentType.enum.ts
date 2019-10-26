export enum PaymentType {
    CASH = 1,
    /**
     * Банковская карта (кредитная, дебетовая)
     */
    PAYMENT_CARD,
    /**
     * Безналичный перевод для аптечек
     */
    BANK_TRANSFER
}