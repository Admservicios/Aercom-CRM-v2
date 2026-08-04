/**
 * ============================================================
 * AERCOM CRM v2
 * Modal Manager
 * ============================================================
 */

function initializeModals() {

    debugLog("Sistema de modales iniciado");

}

/**
 * Abrir modal
 */
function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("hidden");

}

/**
 * Cerrar modal
 */
function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("hidden");

}
