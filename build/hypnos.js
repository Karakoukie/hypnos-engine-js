System.register("HypnosResource", [], function (exports_1, context_1) {
    "use strict";
    var HypnosResource;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HypnosResource = class HypnosResource {
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
            };
            exports_1("HypnosResource", HypnosResource);
        }
    };
});
System.register("HypnosEvent", ["HypnosResource"], function (exports_2, context_2) {
    "use strict";
    var HypnosResource_1, HypnosEvent;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (HypnosResource_1_1) {
                HypnosResource_1 = HypnosResource_1_1;
            }
        ],
        execute: function () {
            HypnosEvent = class HypnosEvent extends HypnosResource_1.HypnosResource {
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
            };
            exports_2("HypnosEvent", HypnosEvent);
        }
    };
});
System.register("HypnosTransform", ["HypnosResource"], function (exports_3, context_3) {
    "use strict";
    var HypnosResource_2, HypnosTransform;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (HypnosResource_2_1) {
                HypnosResource_2 = HypnosResource_2_1;
            }
        ],
        execute: function () {
            HypnosTransform = class HypnosTransform extends HypnosResource_2.HypnosResource {
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
            };
            exports_3("HypnosTransform", HypnosTransform);
        }
    };
});
System.register("HypnosNode", ["HypnosResource", "HypnosTransform"], function (exports_4, context_4) {
    "use strict";
    var HypnosResource_3, HypnosTransform_1, HypnosNode;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (HypnosResource_3_1) {
                HypnosResource_3 = HypnosResource_3_1;
            },
            function (HypnosTransform_1_1) {
                HypnosTransform_1 = HypnosTransform_1_1;
            }
        ],
        execute: function () {
            HypnosNode = class HypnosNode extends HypnosResource_3.HypnosResource {
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
            };
            exports_4("HypnosNode", HypnosNode);
        }
    };
});
