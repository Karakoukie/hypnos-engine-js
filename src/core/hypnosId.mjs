export class HypnosId {
    static ids = [];
    
    HypnosId() {
        this.value = this.random(16);
    }

    degenerate() {
        HypnosId.ids.splice(HypnosId.ids.indexOf(this));
    }

    static random(length) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        let str = '';
        
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        if (HypnosId.ids.includes(str)) {
            return this.random(length);
        }

        HypnosId.ids.push(str);
    
        return str;
    }
}