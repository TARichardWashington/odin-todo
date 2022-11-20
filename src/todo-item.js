export default class todo {
    constructor(title, status) {
        this._title = title;
        this._status = status;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    toggleStatus() {
        if(this._status === true) {
            this._status = false;
        } else {
            this._status = true;
        }
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

}