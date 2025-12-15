import {Form} from "./Form.js";
import {Collection} from "./Collection.js";
import {FormBuilder} from "./FormBuilder.js";

export class FormConfigurator {

    constructor(pageController, formController, registry)
    {
        this.pageController = pageController;
        this.formController = formController;
        this.registry = registry;
    }

    getPageController()
    {
        return this.pageController;
    }

    getFormController()
    {
        return this.formController;
    }

    getBuilder()
    {
        const builder = new FormBuilder(
        );

        this.configureFields(builder)
        this.configureButtons(builder)

        return builder;
    }

    configureFields(builder) {
        
    }

    configureButtons(builder) {

    }
}