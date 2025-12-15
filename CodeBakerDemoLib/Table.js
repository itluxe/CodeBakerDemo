import {ActionsColumn} from "./ActionsColumn.js";

export class Table {

    constructor(containerId) {
        this.containerId = containerId;
        this.columns = null;
        this.data = null;
        this.buttons = null;
        this.rowButtons = null;
        this.idToRow = {};
    }

    setColumns(columns)
    {
        this.columns = columns;
        return this;
    }

    getColumns()
    {
        return this.columns;
    }

    setButtons(buttons)
    {
        this.buttons = buttons;
        return this;
    }

    getButtons()
    {
        return this.buttons;
    }

    setRowButtons(buttons)
    {
        this.rowButtons = buttons;
        return this;
    }

    getRowButtons()
    {
        return this.rowButtons;
    }

    setData(data)
    {
        this.data = data;
        data.forEach(row => {
            this.idToRow[row.id] = row;
        })
        return this;
    }
    
    getData()
    {
        return this.data;
    }

    getRowData(id)
    {
        return this.idToRow[id];
    }

    refresh()
    {
        this.render();
    }

    done()
    {
        if (this.rowButtons.getLength() > 0) {
            this.columns.add(
                new ActionsColumn('actions', 'Actions')
                    .setRowButtons(this.rowButtons)
            );
        }

        return this;
    }
    
    render()
    {
        if (!this.columns || !this.data) {
            console.error("Columns and data must be set before rendering.");
            return;
        }

        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');

        this.buttons.forEach(button => {
            buttonsContainer.appendChild(button.render());
        })
    
        // Create table element
        let table = document.createElement('table');
        table.classList.add('code-baker-demo-table');

    
        // Create table head
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        this.columns.forEach(col => {
            let th = document.createElement('th');
            th.innerText = col.getLabel();
            headerRow.appendChild(th);
        });
        // debugger;
    
        // If buttons are set, add an extra column for them
        // if (this.rowButtons && this.rowButtons.getLength() > 0) {
        //     let th = document.createElement('th');
        //     th.innerText = "Actions2";
        //     th.style.border = "1px solid #ccc";
        //     th.style.padding = "8px";
        //     headerRow.appendChild(th);
        // }
    
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Create table body
        let tbody = document.createElement('tbody');
    
        this.data.forEach(row => {
            let tr = document.createElement('tr');
            this.columns.forEach(col => {

                const td = document.createElement('td');
                td.classList.add(col.getKey());

                 col.setRowData(row);

                const colRendered = col.render(td)

                if (colRendered) {
                    td.appendChild(colRendered);
                }
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    
        table.appendChild(tbody);
    
        // Render table into container
        const container = document.getElementById(this.containerId);
        if (container) {
            container.classList.add('code-baker-demo-table-container');
            container.innerHTML = ''; // clear previous contents
            container.appendChild(buttonsContainer);
            container.appendChild(table);
        } else {
            console.error(`Container with id "${this.containerId}" not found.`);
        }
    }
}