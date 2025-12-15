import {Table} from "./Table.js";
import {Collection} from "./Collection.js";

export class TableBuilder {
    constructor(containerId) {
        this._containerId = containerId;
        this._columns = new Collection();
        this._buttons = new Collection();
        this._rowButtons = new Collection();
    }

    getContainerId() {
        return this._containerId;
    }

    addColumn(column) {
        this._columns.add(column);
        return this;
    }

    addButton(button) {
        this._buttons.add(button);
        return this;
    }

    addRowButton(rowButton) {
        this._rowButtons.add(rowButton);
        return this;
    }

    setContainerId(containerId) {
        this._containerId = containerId;
        return this;
    }

    setColumns(columns) {
        this._columns = columns;
        return this;
    }

    setButtons(buttons) {
        this._buttons = buttons;
        return this;
    }

    setRowButtons(rowButtons) {
        this._rowButtons = rowButtons;
        return this;
    }

    createTable()
    {
       return new Table(this.getContainerId())
            .setColumns(this._columns)
            .setButtons(this._buttons)
            .setRowButtons(this._rowButtons)
            .done()
           ;
    }

    // clone() {
    //     const copy = new TableBuilder(this._containerId);
    //     copy.setColumns(this._columns.clone());
    //     copy.setButtons(this._buttons.clone());
    //     copy.setRowButtons(this._rowButtons.clone());
    //     return copy;
    // }
}