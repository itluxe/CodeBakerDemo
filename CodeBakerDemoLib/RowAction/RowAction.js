import {Action} from "../Action.js";

export class RowAction  extends Action{

    constructor(registry, rowOptions) {
        super(registry);
        this.rowOptions = rowOptions;
    }
}