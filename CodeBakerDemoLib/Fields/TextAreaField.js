import { Field } from './Field.js';
export class TextAreaField extends Field {

    render() {
        // Create the input
        const input = document.createElement('textarea');

        // Set type (text, number, password, etc.)

        // Optionally set a placeholder
        input.placeholder = this.placeholder ?? '';

        return input;
    }

}