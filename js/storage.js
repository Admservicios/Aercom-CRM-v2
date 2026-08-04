/**
 * ======================================================
 * Storage Manager
 * ======================================================
 */

function loadStorage() {

    if (!localStorage.getItem(CONFIG.storageKey)) {

        const database = {
            clientes: [],
            equipos: [],
            facturas: [],
            cotizaciones: [],
            mantenimientos: [],
            calendario: []
        };

        localStorage.setItem(
            CONFIG.storageKey,
            JSON.stringify(database)
        );

        console.log("✔ Base de datos creada");
    }

    console.log("✔ Storage cargado");
}

function getDatabase() {
    return JSON.parse(localStorage.getItem(CONFIG.storageKey));
}

function saveDatabase(database) {
    localStorage.setItem(
        CONFIG.storageKey,
        JSON.stringify(database)
    );
}
