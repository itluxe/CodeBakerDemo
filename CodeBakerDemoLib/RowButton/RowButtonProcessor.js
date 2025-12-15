import {ButtonProcessor} from "../Button/ButtonProcessor.js";

export class RowButtonProcessor extends ButtonProcessor
{
    constructor(controller, rowOptions) {
        super(controller);
        this.rowOptions = rowOptions;
    }

    setRowOptions(rowOptions) {
        this.rowOptions = rowOptions;
        return this;
    }

    getRowOptions() {
        return this.rowOptions;
    }

    handle() {

    }
}