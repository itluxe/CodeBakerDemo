import {ButtonProcessor} from "./Button/ButtonProcessor.js";

export class SubmitFormButtonProcessor extends ButtonProcessor{

    constructor(pageController, formController) {
        super(pageController);
        this.formController = formController;
    }

    getPageController() {
        return this.controller;
    }

    getFormController() {
        return this.formController;
    }

    handle()
    {
        const form = this
            .getFormController()
            .getForm();

        const formData = form
            .getData();

        this
            .getAction()
            .setFormData(formData)
            .execute();


        form.resetAndHide();

        this.getPageController().refresh();
    }
}