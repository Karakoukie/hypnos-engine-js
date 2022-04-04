"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypnosTransform = void 0;
const HypnosResource_1 = require("./HypnosResource");
class HypnosTransform extends HypnosResource_1.HypnosResource {
    constructor(position = {
        x: 0,
        y: 0,
        z: 0
    }, rotation = {
        x: 0,
        y: 0,
        z: 0,
        w: 0
    }, scale = {
        x: 1,
        y: 1,
        z: 1
    }) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
exports.HypnosTransform = HypnosTransform;
