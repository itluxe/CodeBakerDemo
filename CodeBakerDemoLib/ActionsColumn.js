import {Column} from "./Column.js";
export class ActionsColumn extends Column
{
    setRowButtons(buttons)
    {
        this.rowButtons = buttons;
        return this;
    }

    render(td)
    {
        const rowData = this.getRowData();

        if (this.rowButtons && this.rowButtons.getLength() > 0) {
            let div = document.createElement('div');

            this.rowButtons.forEach(button => {

                const newButton = button(rowData);

                const storedCallback = newButton.onClickCallback;

                // newButton.onClick(() => {
                //     storedCallback(id);
                // });

                div.appendChild(newButton.render());
            });
            return div;
        }

        return null;
    }
}