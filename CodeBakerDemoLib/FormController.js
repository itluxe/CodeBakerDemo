export class FormController {
    constructor(registry, pageController)
    {
        this.registry = registry;
        this.pageController = pageController;
        this.form = null;
    }

    getForm()
    {
        return this.form;
    }

    create()
    {
        this.form.show();
    }

    async edit(id)
    {
        this.form.show(
            this.pageController.table.getRowData(id)
        );
    }

    async updateRecord(formData)
    {
        await this.registry.db.add(this.registry.store, formData);
    }

    async createRecord(formData)
    {
        await this.registry.db.update(this.registry.store, formData);
    }

    async submit()
    {
        const formData = this.form.getData();

        if (formData.id) {
            await this.createRecord(formData);
        } else {
            delete formData.id;
            await this.updateRecord(formData);
        }

        this.form.resetAndHide();

        await this.pageController.refresh();
    }
}