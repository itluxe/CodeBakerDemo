import {Collection} from "./Collection.js";
import {Form} from "./Form.js";

export class FormBuilder {
    constructor() {
        this.fields = new Collection();
        this.buttons = new Collection();
    }

    addField(field)
    {
        this.fields.add(field);
        return this;
    }

    addButton(button)
    {
        this.buttons.add(button);
        return this;
    }

    createForm() {
        return new Form(this.fields, this.buttons);
    }
}