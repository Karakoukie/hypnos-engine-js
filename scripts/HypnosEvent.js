"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypnosEvent = void 0;
const HypnosResource_1 = require("./HypnosResource");
class HypnosEvent extends HypnosResource_1.HypnosResource {
    constructor(name, invert = false) {
        super();
        this.name = name;
        this.invert = invert;
        this.eventListeners = [];
        this.satisfied = false;
    }
    addEventListener(event) {
        this.eventListeners.push(event);
    }
    isSatisfied() {
        for (const event of this.eventListeners) {
            if (!event.isSatisfied())
                return false;
        }
        return true;
    }
    call(gl) {
        throw new Error("Not implemented");
    }
    format() {
        var str = "<" + this.name + ">";
        str += "<events>";
        for (var event of this.eventListeners) {
            str += event.format();
        }
        str += "</events>";
        return str + "</" + this.name + ">";
    }
}
exports.HypnosEvent = HypnosEvent;
