/**
 * ======================================================
 * AERCOM CRM v2
 * Configuración Global
 * ======================================================
 */

const CONFIG = {
    appName: "AERCOM CRM",
    version: "2.0.0",
    company: "Aercom S.A.",

    storageKey: "aercomCRM",

    debug: true
};

function loadConfig() {
    if (CONFIG.debug) {
        console.log("✔ Configuración cargada");
        console.table(CONFIG);
    }
}
