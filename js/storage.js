// ======================================
// STORAGE
// ======================================

const Storage = {

    load() {

        const data = localStorage.getItem(APP.storageKey);

        if (!data) return null;

        return JSON.parse(data);

    },

    save(data) {

        localStorage.setItem(APP.storageKey, JSON.stringify(data));

    },

    remove() {

        localStorage.removeItem(APP.storageKey);

    },

    backup(data) {

        localStorage.setItem(APP.backupKey, JSON.stringify(data));

    },

    restore() {

        const data = localStorage.getItem(APP.backupKey);

        if (!data) return null;

        return JSON.parse(data);

    }

};
