export class Column
{
    constructor(key, label) {
        this._key = key;
        this._label = label;
        this.rowData = null;
    }

    getKey() {
        return this._key;
    }

    setKey(value) {
        this._key = value;
        return this;
    }

    getLabel() {
        return this._label;
    }

    setLabel(value) {
        this._label = value;
        return this;
    }

    setRowData(rowData) {
        this.rowData = rowData;
        return this;
    }

    getRowData() {
        return this.rowData;
    }

    render(td)
    {
        td.innerText = this.rowData[this._key] ?? '';
        return null;
    }
}