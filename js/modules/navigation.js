/**
 * ============================================================
 * AERCOM CRM v2
 * Navigation Module
 * Extraído del index.html
 * ============================================================
 */

function showModule(name){

    document.querySelectorAll('.module')
        .forEach(m => m.classList.remove('active'));

    document.querySelectorAll('.nav-item')
        .forEach(n => n.classList.remove('active'));

    document
        .getElementById('module-' + name)
        .classList.add('active');

    document
        .getElementById('nav-' + name)
        .classList.add('active');

    curModule = name;

    resetFilters();

    renderModule();

    if(name === 'pipeline'){
        refreshPipeRespOpts();
    }

}

function renderModule(){

    switch(curModule){

        case 'dashboard':
            renderDashboard();
            break;

        case 'pipeline':
            renderPipeline();
            break;

        case 'pedidos':
            renderPedidos();
            break;

        case 'equipos':
            renderEquipos();
            break;

        case 'facturacion':
            renderFacturacion();
            break;

        case 'recordatorios':
            renderRecordatorios();
            break;

        case 'clientes':
            renderClientes();
            break;

        case 'calendario':
            renderCalendario();
            break;

        case 'excel':
            updateExcelCounts();
            break;

    }

}
