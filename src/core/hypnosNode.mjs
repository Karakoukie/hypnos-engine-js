import { HypnosId } from "./hypnosId.mjs";
import { HypnosTransform } from "./hypnosTransform.mjs";

export class HypnosNode {
    HypnosNode() {
        this.id = new HypnosId();
        this.transform = new HypnosTransform();
        this.eventListeners = [];
    }

    /**
     * @param {string} name 
     * @param {Function} callback 
     */
    addEventListener(name, callback) {
        if (name === null) {
            throw new Error("Name is empty");
        }

        if (callback === null) {
            throw new Error("Callback is empty");
        }

        this.eventListeners.push({ name: name, callback: callback });
    }

    notify(target, eventName, gl) {
        if (target !== null && target !== this.id) {
            return;
        }
        
        if (eventName === null) {
            throw new Error("Event name is empty");
        }

        if (gl === null) {
            throw new Error("GL is empty");
        }

        this.eventListeners.forEach(eventListener => {
            if (eventListener.name === eventName) {
                eventListener.callback.call(gl, data);
            }
        });
    }
}