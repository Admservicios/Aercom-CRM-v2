// ======================================
// UTILIDADES
// ======================================

const Utils = {

    uuid() {

        return crypto.randomUUID();

    },

    today() {

        return new Date().toISOString().split("T")[0];

    },

    formatDate(date) {

        if (!date) return "";

        return new Date(date).toLocaleDateString("es-AR");

    },

    capitalize(text) {

        if (!text) return "";

        return text.charAt(0).toUpperCase() + text.slice(1);

    }

};
