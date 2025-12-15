import { Field } from './Field.js';
export class HiddenField extends Field {

    render() {
        // Create the input
        const input = document.createElement('input');

        input.type = 'hidden';

        // Set type (text, number, password, etc.)

        // Optionally set a placeholder
        input.placeholder = this.placeholder ?? '';

        return input;
    }

    renderField()
    {
        return this.element = this.render();
    }

}