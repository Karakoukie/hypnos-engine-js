import { Node3D, PointLight, ShaderProperty } from './hypnos.js';

/**
 * Starter and runner of any 3D applications.
 * 1. Create a canvas with webgl context.
 * 2. Load a root node.
 * 3. Start the rendering loop.
 */
export class HypnosApplication {

    /**
     * @type HTMLCanvasElement
     */
    canvas;

    /**
     * @type HypnosNode
     */
    node;

    /**
     * @type boolean
     */
    started = false;

    /**
     * @type WebGL2RenderingContext
     */
    gl;

    /**
     * 
     * @param {number} width
     * @param {number} height
     */
    constructor(width = 800, height = 600) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl = this.canvas.getContext("webgl2");

        this.canvas.addEventListener("close", (ev) => {
            console.log('close the 3d canvas');

            if (this.node != null) {
                this.node.call("dispose", this.gl);
            }
        });

        window.addEventListener("resize", () => { this.resize(this.canvas.clientWidth, this.canvas.clientHeight); });
    }

    /**
     * Start the application by rendering the loaded node3d at each frame.
     */
    start() {
        function animationFrame(app) {
            window.requestAnimationFrame(animationFrame);

            if (app.node != null) {
                app.node.call("update", app.gl);
            }
        }

        if (!this.started) {
            this.started = true;
            animationFrame(this);
        }
    }

    /**
     * Load a new node3d to render.
     * @param {Node3D} node
     */
    load(node) {
        if (!node) {
            throw Error("Node is null");
        }

        if (this.node != null) {
            this.node.call("dispose", this.gl);
        }

        node.call("start", this.gl);

        this.node = node;

        this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    /**
     * 
     * @param {number} width
     * @param {number} height
     */
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        if (this.node) {
            this.node.call("resize", this.gl, { width: width, height: height });
        }
    }

    /**
     * @returns HTMLCanvasElement
     */
    getCanvas() {
        return this.canvas;
    }
}