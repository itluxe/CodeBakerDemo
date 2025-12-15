
export class Button
{
    constructor(label)
    {
        this.label = label;
        this.processor = null;
    }

    render()
    {
        // Create the button
        const button = document.createElement('button');
        button.textContent = this.label;

        button.onclick = () => this.onClick();

        return button;
    }

    onClick()
    {
        this
            .getProcessor()
            .handle();
    }

    setProcessor(processor) {
        this.processor = processor;
        return this;
    }

    getProcessor() {
        return this.processor;
    }
}