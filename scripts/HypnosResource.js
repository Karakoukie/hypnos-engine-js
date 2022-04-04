"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypnosResource = void 0;
class HypnosResource {
    constructor() {
        this.id = this.generateId();
    }
    generateId() {
        var chars = "abcdefghijklmnopkrstuvwxyz1234567890";
        var str = "";
        for (let index = 0; index < 15; index++) {
            str += chars.charAt(index);
        }
        return str;
    }
}
exports.HypnosResource = HypnosResource;
