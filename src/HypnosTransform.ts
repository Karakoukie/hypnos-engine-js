import { HypnosResource } from "./HypnosResource";

export class HypnosTransform extends HypnosResource {
    public position: { x: number, y: number, z: number};
    public rotation: { x: number, y: number, z: number, w: number };
    public scale: { x: number, y: number, z: number};
    
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