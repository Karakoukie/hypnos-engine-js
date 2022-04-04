import { HypnosEvent } from "./HypnosEvent";
import { HypnosResource } from "./HypnosResource";
import { HypnosTransform } from "./HypnosTransform";

export class HypnosNode extends HypnosResource {
    public name: string;
    public transform: HypnosTransform;

    private events: HypnosEvent[];
    private children: HypnosNode[];
    private parent: HypnosNode | null;

    constructor(name: string, transform = new HypnosTransform()) {
        super();

        this.name = name;
        this.transform = transform;
        this.events = [];
        this.children = [];
        this.parent = null;
    }

    getRoot(): HypnosNode {
        if (this.parent != null) {
            return this.parent.getRoot();
        }

        return this;
    }

    addEvent(event: HypnosEvent) {
        this.events.push(event);
    }

    addChild(child: HypnosNode, transform = new HypnosTransform()) {
        child.transform = transform;
        child.parent = this;
        this.children.push(child);
    }

    notify(gl: WebGL2RenderingContext, evt: string, nodeName = "") {
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