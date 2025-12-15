export class ButtonProcessor
{
    constructor(controller) {
        this.controller = controller;
    }
    getController() {
        return this.controller;
    }
    setController(controller) {
        this.controller = controller;
        return this;
    }
    setAction(action) {
        this.action = action;
        return this;
    }
    getAction() {
        return this.action;
    }
    handle() {

    }
}