export interface AppEvent {
    id: number;

    entityType: EnityType; // 1
    entityID: number; // 25

    eventType: EventType; // 2

    data: any; // 4

    date: Date;

}

export enum EventType {
    CHANGE_STATUS = 1,
    DELETED,
    CANGE_DATA
}

export enum EnityType {
    ORDER_PRODUCED = 1,
    ORDERED_PRODUCT,
    DELIVERY
}