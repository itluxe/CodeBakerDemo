import {HiddenField} from "./Fields/HiddenField.js";

export class Form {
    constructor(fields, buttons)
    {
        this.fields = fields;
        this.buttons = buttons;
        this.isRendered = false;
        this.formContainer = null;
        this.onClickCallback = () => {};
        this.isDone = false;
    }

    render() {

        if (this.isRendered) {
            return this.formContainer;
        }

        this.formContainer = document.createElement('div');
        this.formContainer.classList.add('code-baker-demo-form-container');

        const closeButton = document.createElement('a');
        closeButton.classList.add('close');
        closeButton.href = '#';
        closeButton.onclick = () => this.hide();
        closeButton.innerHTML = 'x';

        const title = document.createElement('h2');
        title.innerText = 'Form';

        const inner = document.createElement('div');
        inner.classList.add('inner');

        this.formContainer.appendChild(closeButton);
        this.formContainer.appendChild(inner);
        inner.appendChild(title);

        const fieldsContainer = document.createElement('div');
        fieldsContainer.classList.add('fields');

        this.fields.forEach(field => {
            fieldsContainer.appendChild(field.renderField());
        })

        inner.appendChild(fieldsContainer);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        this.buttons.forEach(button => {
            buttons.appendChild(button.render());
        })

        // const submit = document.createElement('button');
        //
        // submit.type = 'submit';
        // submit.classList.add('submit');
        // submit.innerText = 'Submit';
        // submit.onclick = () => this.onClickCallback();

        // buttons.appendChild(submit);

        inner.appendChild(buttons);

        document.body.appendChild(this.formContainer);


        this.isRendered = true;

        return this.formContainer;
    }

    onClick(callback)
    {
        this.onClickCallback = callback;
    }

    getData()
    {
        let data = {};

        this.fields.forEach(field => {
            data[field.key] = field.getValue()
        });


        return data;
    }

    setData(data)
    {
        this.fields.forEach(field => {
            field.setValue(data[field.key] ?? null);
        });
    }

    reset()
    {
        this.fields.forEach(field => {
            field.reset();
        });
    }

    resetAndHide()
    {
        this.reset();
        this.hide();
    }

    hide()
    {
        this.formContainer.classList.remove('show');
    }

    done()
    {
        this.fields.prepend(
            new HiddenField('id', 'ID')
        )

        this.isDone = true;
    }

    show(data = null)
    {
        if (!this.isDone) {
            this.done();
        }

        this.render();

        this.reset();

        if (data) {
            this.setData(data);
        }

        this.formContainer.classList.add('show');
    }

}