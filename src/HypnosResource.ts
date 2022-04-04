export class HypnosResource {
    public id: string;

    constructor() {
        this.id = this.generateId();
    }

    private generateId(): string {
        var chars = "abcdefghijklmnopkrstuvwxyz1234567890";

        var str = "";

        for (let index = 0; index < 15; index++) {
            str += chars.charAt(index);
        }

        return str;
    }
}