export class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
        this.storesToCreate = new Set();
    }

    // Register stores before opening DB
    addStore(storeName, options = { keyPath: "id", autoIncrement: true }) {
        this.storesToCreate.add({ storeName, options });
    }

    // Open or upgrade DB
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = event => {
                const db = event.target.result;

                this.storesToCreate.forEach(({ storeName, options }) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, options);
                    }
                });
            };

            request.onsuccess = event => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = event => reject(event.target.error);
        });
    }

    // Get transaction + store
    _store(storeName, mode = "readonly") {
        if (!this.db) {
            throw new Error("Database not open. Call open() before using the database.");
        }
        const tx = this.db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    }

    // CREATE
    add(storeName, data) {
        return new Promise((resolve, reject) => {
            const store = this._store(storeName, "readwrite");
            const req = store.add(data);

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    // READ ALL
    getAll(storeName) {
        return new Promise((resolve, reject) => {
            const store = this._store(storeName, "readonly");
            const req = store.getAll();

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    // READ ONE
    get(storeName, id) {
        return new Promise((resolve, reject) => {
            const store = this._store(storeName, "readonly");
            
            // Convert id to proper type if needed
            // For numeric IDs stored as strings, or vice versa
            let key = id;
            if (typeof id === 'string' && !isNaN(id)) {
                // If id is a numeric string, try as a number
                key = Number(id);
            }
            
            const req = store.get(key);
    
            req.onsuccess = () => {
                // Make sure we check if result exists
                if (req.result === undefined) {
                    resolve(null); // Return null for non-existent records
                } else {
                    resolve(req.result);
                }
            };
            req.onerror = () => reject(req.error);
        });
    }

    // UPDATE (replace object)
    update(storeName, data) {
        return new Promise((resolve, reject) => {
            if (!data || data.id === undefined) {
                return reject(new Error("Data object must have an id property"));
            }
            
            const store = this._store(storeName, "readwrite");
            
            // Convert id to proper type if needed
            // For numeric IDs stored as strings, or vice versa
            let key = data.id;
            if (typeof data.id === 'string' && !isNaN(data.id)) {
                // If id is a numeric string, try as a number
                key = Number(data.id);
                // Create a new object with the converted ID
                data = { ...data, id: key };
            }
            
            // First check if the record exists
            const getReq = store.get(key);
            
            getReq.onsuccess = () => {
                if (getReq.result === undefined) {
                    return reject(new Error(`Record with id ${data.id} not found in ${storeName}`));
                }
                
                // Record exists, proceed with update
                const updateReq = store.put(data);
                
                updateReq.onsuccess = () => resolve(updateReq.result);
                updateReq.onerror = () => reject(updateReq.error);
            };
            
            getReq.onerror = () => reject(getReq.error);
        });
    }

    // DELETE
    delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const store = this._store(storeName, "readwrite");
            const req = store.delete(id);

            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }
    
    // DELETE ALL - clear the entire store
    clearAll(storeName) {
        return new Promise((resolve, reject) => {
            const store = this._store(storeName, "readwrite");
            const req = store.clear();
            
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }
}
