import { AppEvent, EnityType, EventType } from "../interfaces/AppEvent.interface";

export default class OrderEvent implements AppEvent {
    id: number;
    entityType: EnityType;
    entityID: number;
    eventType: EventType;
    data: any;
    date: Date;

}