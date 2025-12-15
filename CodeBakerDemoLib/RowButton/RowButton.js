import {Button} from "../Button/Button.js";
export class RowButton extends Button
{
    constructor(label, options)
    {
        super(label);
        this.options = options;
    }
}