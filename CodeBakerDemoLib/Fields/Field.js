export class Field {
    constructor(key, label, placeholder) {
        this.key = key;
        this.label = label;
        this.placeholder = placeholder;
        this.element = null;
    }

    getElement() {
        return this.element;
    }

    getValue() {
        return this.element.value;
    }

    setValue(value) {
        if (value !== null && this.element) {
            this.element.value = value;
        }
        return this;
    }

    reset() {
        this.setValue('');
        return this;
    }

    render() {
        // Create the input
        const input = document.createElement('input');

        // Set type (text, number, password, etc.)
        input.type = 'text';

        // Optionally set a placeholder
        input.placeholder = this.placeholder ?? '';

        return input;
    }

    renderField()
    {
        const container = document.createElement('div');
        container.classList.add('field');

        const label = document.createElement('label');

        label.innerText = this.label + ':';
        container.appendChild(label);
        const fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('field-wrapper');

        this.element = this.render();

        fieldWrapper.appendChild(this.element);

        container.appendChild(fieldWrapper)

        return container;
    }
}