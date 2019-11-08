"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType;
(function (EventType) {
    EventType[EventType["CHANGE_STATUS"] = 1] = "CHANGE_STATUS";
    EventType[EventType["DELETED"] = 2] = "DELETED";
    EventType[EventType["CANGE_DATA"] = 3] = "CANGE_DATA";
})(EventType = exports.EventType || (exports.EventType = {}));
var EnityType;
(function (EnityType) {
    EnityType[EnityType["ORDER_PRODUCED"] = 1] = "ORDER_PRODUCED";
    EnityType[EnityType["ORDERED_PRODUCT"] = 2] = "ORDERED_PRODUCT";
    EnityType[EnityType["DELIVERY"] = 3] = "DELIVERY";
})(EnityType = exports.EnityType || (exports.EnityType = {}));
//# sourceMappingURL=AppEvent.interface.js.map