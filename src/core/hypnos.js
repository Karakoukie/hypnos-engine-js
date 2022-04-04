class HypnosResource {
    /**
     * @param {string} id 
     */
    constructor(id = this.generateId()) {
        /**
         * @type {number}
         */
        this.id = id;
    }

    /**
     * @param {string} text 
     */
    parse(text) {

    }

    /**
     * @returns string
     */
    format() {
        throw new Error("Not implemented");
    }

    /**
     * @returns {string}
     */
    generateId() {
        var chars = "abcdefghijklmnopkrstuvwxyz1234567890";

        var str = "";

        for (let index = 0; index < 15; index++) {
            str += chars.charAt(index);
        }

        return str;
    }
}

class HypnosEvent extends HypnosResource {
    /**
     * @param {string} name 
     * @param {boolean} invert 
     */
    constructor(name, invert = false) {
        super();
        /**
         * @type string
         */
        this.name = name;

        /**
         * @type boolean
         */
        this.invert = invert;

        /**
         * @type HypnosEvent[]
         */
        this.eventListeners = [];

        /**
         * @type boolean
         */
        this.satisfied = false;
        
        /**
         * @type {HypnosNode}
         */
        this.#node = null;
    }

    /**
     * @param {HypnosEvent} event 
     */
    addEventListener(event) {
        this.eventListeners.push(event);
    }

    /**
     * @returns {boolean}
     */
    isSatisfied() {
        for (const event of this.eventListeners) {
            if (!event.isSatisfied()) return false;
        }

        return true;
    }

    /**
     * @param {WebGL2RenderingContext} gl 
     */
    call(gl) {
        throw new Error("Not implemented");
    }

    /**
     * @returns {string}
     */
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

class HypnosTransform extends HypnosResource {
    constructor(
        position = {
            x: 0,
            y: 0,
            z: 0
        },
        rotation = {
            x: 0,
            y: 0,
            z: 0,
            w: 0
        },
        scale = {
            x: 1,
            y: 1,
            z: 1
        }
    ) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}

class HypnosNode extends HypnosResource {
    /**
     * @param {string} name 
     * @param {HypnosTransform} transform 
     */
    constructor(name, transform = new HypnosTransform()) {
        super();
        /**
         * @type string
         */
        this.name = name;

        /**
         * @type HypnosTransform
         */
        this.tranform = transform;

        /**
         * @type HypnosEvent[]
         */
        this.events = [];

        /**
         * @type HypnosNode[]
         */
        this.children = [];

        /**
         * @type HypnosNode
         */
        this.parent = null;
    }

    /**
     * @returns {HypnosNode}
     */
    getRoot() {
        if (this.parent != null) {
            return this.parent.getRoot();
        }

        return this;
    }

    /**
     * @param {HypnosEvent} event 
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * @param {HypnosEvent} child 
     * @param {HypnosTransform} transform 
     */
    addChild(child, transform = new HypnosTransform()) {
        child.transform = transform;
        child.parent = this;
        this.children.push(child);
    }

    /**
     * @param {WebGL2RenderingContext} gl 
     * @param {string} evt 
     * @param {string} nodeName 
     */
    notify(gl, evt, nodeName = "") {
        if (nodeName != "" && nodeName != this.name) return;

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

class HypnosMesh extends HypnosResource {
    constructor(vertices = []) {
        super();
        this.vertices = vertices;
    }

    format() {
        var str = "<mesh>";

        str += "<vertices>" + this.vertices.toString() + "</vertices>";

        return str + "</mesh>";
    }
}

class HypnosRendererEvent extends HypnosEvent {
    constructor(mesh) {
        super("render");
        this.mesh = mesh;
    }

    call(gl) {
        alert("gl.draw(mesh) on " + this.name);
    }

    format() {
        var str = "<" + this.name + ">";
        str += this.mesh.format();
        return str + "</" + this.name + ">";
    }
}

class HypnosCameraEvent extends HypnosEvent {
    constructor() {
        super("camera");
    }

    call(gl) {
        
    }

    format() {
        var str = "<" + this.name + ">";
        return str + "</" + this.name + ">";
    }
}

class Application3d {
    /**
     * @param {HypnosNode} node 
     */
    load(node) {
        node.notify(null, "render");
    }
}

var jupiter = new HypnosNode("Jupiter Renderer");
jupiter.addEvent(new HypnosRendererEvent(new HypnosMesh([1, 2, 3, 4])));

var univers = new HypnosNode("Univers");
univers.addChild(jupiter);

new Application3d().load(univers);
document.body.innerText = univers.format();