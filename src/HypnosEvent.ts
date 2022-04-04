import { HypnosResource } from "./HypnosResource";

export class HypnosEvent extends HypnosResource {
    public name: string;
    public invert: boolean;

    protected satisfied: boolean;
    
    private eventListeners: HypnosEvent[];
    
    constructor(name: string, invert = false) {
        super();
        this.name = name;
        this.invert = invert;
        this.eventListeners = [];
        this.satisfied = false;
    }

    addEventListener(event: HypnosEvent) {
        this.eventListeners.push(event);
    }

    isSatisfied() {
        for (const event of this.eventListeners) {
            if (!event.isSatisfied()) return false;
        }

        return true;
    }

    call(gl: WebGL2RenderingContext) {
        throw new Error("Not implemented");
    }

    format(): string {
        var str = "<" + this.name + ">";

        str += "<events>";
        for (var event of this.eventListeners) {
            str += event.format();
        }
        str += "</events>";

        return str + "</" + this.name + ">";
    }
}