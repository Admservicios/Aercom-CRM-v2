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

            console.error("Error cargando datos.", error);

            D = {};

        }

    } else {

        D = {};

    }

    console.log("✔ Storage cargado");

}

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(D)
    );

}

function resetData() {

    localStorage.removeItem(STORAGE_KEY);

    D = {};

    console.warn("Storage reiniciado");

}
