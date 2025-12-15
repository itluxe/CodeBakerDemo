export class Collection
{
    constructor() {
        this.items = [];
    }

    add(item)
    {
        this.items.push(item);
        return this;
    }

    prepend(item)
    {
        this.items.unshift(item);
    }

    get(key)
    {
        if (typeof key === 'number') {
            return this.items[key] || null;
        }
        return this.items.find(item => item.id === key || item.key === key) || null;
    }

    remove(key)
    {
        if (typeof key === 'number') {
            if (key >= 0 && key < this.items.length) {
                this.items.splice(key, 1);
            }
        } else {
            const index = this.items.findIndex(item => item.id === key || item.key === key);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        }
        return this;
    }

    setItems(items)
    {
        if (Array.isArray(items)) {
            this.items = items;
        }
        return this;
    }

    getItems()
    {
        return this.items;
    }

    forEach(callback) {
        for (const item of this.items) {
            callback(item);
        }
    }

    getLength() {
        return this.items.length;
    }

    // clone()
    // {
    //     return new Collection()
    //         .setItems(
    //             this.items.slice()
    //         );
    // }
}