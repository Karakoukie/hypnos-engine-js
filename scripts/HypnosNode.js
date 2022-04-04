"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypnosNode = void 0;
const HypnosResource_1 = require("./HypnosResource");
const HypnosTransform_1 = require("./HypnosTransform");
class HypnosNode extends HypnosResource_1.HypnosResource {
    constructor(name, transform = new HypnosTransform_1.HypnosTransform()) {
        super();
        this.name = name;
        this.transform = transform;
        this.events = [];
        this.children = [];
        this.parent = null;
    }
    getRoot() {
        if (this.parent != null) {
            return this.parent.getRoot();
        }
        return this;
    }
    addEvent(event) {
        this.events.push(event);
    }
    addChild(child, transform = new HypnosTransform_1.HypnosTransform()) {
        child.transform = transform;
        child.parent = this;
        this.children.push(child);
    }
    notify(gl, evt, nodeName = "") {
        if (nodeName != "" && nodeName != this.name)
            return;
        for (const event of this.events) {
            if (evt === event.name) {
                if (event.isSatisfied()) {
                    event.call(gl);
                }
            }
        }
        for (const child of this.children) {
            child.notify(gl, evt, nodeName);
        }
    }
    format() {
        var str = "<" + this.name + ">";
        str += "<events>";
        for (var event of this.events) {
            str += event.format();
        }
        str += "</events>";
        str += "<children>";
        for (var child of this.children) {
            str += child.format();
        }
        str += "</children>";
        return str + "</node>";
    }
}
exports.HypnosNode = HypnosNode;
