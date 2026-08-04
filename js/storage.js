/**
 * ============================================================
 * AERCOM CRM v2
 * Storage Manager
 * Versión: 2.1.0
 * ============================================================
 */

const STORAGE_KEY = "aercom-data";

let D = {};

function loadData() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

        try {

            D = JSON.parse(saved);

        } catch (error) {

            console.error("Error leyendo LocalStorage.", error);

            D = JSON.parse(JSON.stringify(DEFAULT));

        }

    } else {

        D = JSON.parse(JSON.stringify(DEFAULT));

    }

    // Objetos obligatorios
    if (!D.facturacion_estados) D.facturacion_estados = {};
    if (!D.recordatorios) D.recordatorios = [];
    if (!D.pedidos) D.pedidos = [];
    if (!D.eventos) D.eventos = [];

    // Arrays obligatorios
    if (!Array.isArray(D.clientes)) D.clientes = [];
    if (!Array.isArray(D.equipos)) D.equipos = [];
    if (!Array.isArray(D.cotizaciones)) D.cotizaciones = [];
    if (!Array.isArray(D.recordatorios)) D.recordatorios = [];

    console.log("✔ Datos cargados");

}

function persist() {

    D.lastSaved = today();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(D)
    );

    console.log("✔ Datos guardados");

}

function resetStorage() {

    localStorage.removeItem(STORAGE_KEY);

    D = JSON.parse(JSON.stringify(DEFAULT));

    persist();

}
