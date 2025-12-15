import {Action} from "./Action.js";

export class SubmitAction extends Action {

    setFormData(formData) {
        this.formData = formData;
        return this;
    }

    getFormData() {
        return this.formData;
    }


    async updateRecord(formData)
    {
        await this.registry.db.add(this.registry.store, formData);
    }

    async createRecord(formData)
    {
        await this.registry.db.update(this.registry.store, formData);
    }

    execute()
    {
        const formData = this.getFormData();

        if (formData.id) {
            this.createRecord(formData);
        } else {
            delete formData.id;
            this.updateRecord(formData);
        }
    }

}