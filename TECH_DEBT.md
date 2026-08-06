# Deuda técnica — Aercom CRM v2

Registro de bugs preexistentes, código muerto y duplicaciones detectados durante la modularización. No se corrigen automáticamente — quedan documentados para decidir su abordaje en un sprint dedicado. Ver `CHANGELOG.md` para el historial completo por PR.

---

## Bugs vigentes

### `applyPipeFilter()` — el buscador por N° de cotización nunca funciona (Sprint 8)
`js/modules/cotizaciones.js`. La función busca `card.querySelector('.k-title')` para comparar contra el texto ingresado, pero `buildCard()` nunca genera un elemento con clase `k-title` (el ID se renderiza en `.k-id`). Resultado: buscar por N° de cotización (ej. "COT-2026-001") siempre da "Sin resultados"; buscar por cliente o descripción sí funciona (usa `.k-client`/`.k-desc`, que sí existen). Confirmado con evidencia en navegador real.

### Filas `.row-err`/`.row-warn` ilegibles en modo oscuro (Sprint 6)
`css/style.css:505-506`. Fondo claro hardcodeado sin override para `.dark-theme`; texto claro sobre fondo claro en la tabla de Equipos.

### `_renderCalSemana()` — el click en un evento abre "Nuevo evento" en vez del detalle (Sprint 10)
`js/modules/calendario.js`. A diferencia de `_renderCalMes()` (cuyo `.cal-event` sí llama `event.stopPropagation()` antes de `calShowEventDetail(...)`), en `_renderCalSemana()` el `onclick` del evento es solo `onclick="calShowEventDetail(...)"`, sin `stopPropagation()`. El click burbujea al `.cal-sem-allday` padre, cuyo propio `onclick="openCalEventModal(...)"` se ejecuta después y sobrescribe el modal recién abierto. Efecto: en vista semana, `calShowEventDetail` sí corre (el título se calcula bien) pero el modal que el usuario ve termina siendo "Nueva reunión / evento", no el detalle. Confirmado en navegador real.

### `updateExcelCounts()` no muestra nada — apunta a IDs que no existen en el HTML (Sprint 14)
`js/modules/excel.js`. La función busca `document.getElementById('excel-count-clientes')`, `'excel-count-equipos'` y `'excel-count-cotizaciones'`, pero ninguno de esos IDs existe en `index.html` (confirmado por búsqueda: cero coincidencias). Los `if(ec)`/`if(ee)`/`if(eq)` evitan el crash, así que la función corre sin error en cada render de la pantalla "Excel / Drive" — pero nunca actualiza nada visible. Es un no-op silencioso, no un crash.

### `xlsImport()` llama a `_origPersist()` en vez de `persist()` (Sprint 14)
`js/modules/excel.js`. Todos los demás flujos de guardado del proyecto llaman a `persist()` — el decorador que además de guardar en localStorage empuja un snapshot a `_history` (undo/redo) y dispara `_scheduleDriveSave()`. `xlsImport()` llama directamente a `_origPersist()` (la versión base de `js/storage.js`), por lo que una importación masiva desde Excel: (a) no queda disponible para deshacer con Ctrl+Z, y (b) no dispara la sincronización automática con Google Drive. Los datos sí quedan guardados en localStorage correctamente — no es pérdida de datos, es una inconsistencia de comportamiento frente al resto de la app.

---

## Código muerto vigente

- `quoteFromEquip(eid)` — `js/modules/equipos.js` (Sprint 6). Sin ningún punto de llamada en el proyecto.
- `delFactConfirm(cid)` — `js/modules/facturacion.js` (Sprint 7). Sin ningún punto de llamada en el proyecto.
- CSS "AERCOM POLISH" dentro del `<style>` del Reporte de Vencimientos (Sprint 13) — `js/modules/reportes.js`. El documento HTML standalone que genera `generarReporteVencimientos()` incluye ~80 líneas de reglas (`.k-col`, `.nav-item`, `.stat-card`, `#modal-overlay`, scrollbar, etc.) que no tienen ningún elemento correspondiente en ese documento — son estilos de la app principal, copiados junto con el resto del `<style>` pero inertes ahí.

## Duplicaciones funcionales vigentes (no unificadas)

- `deleteEquip(id)` (modal) vs `delEquipConfirm(eid)` (tabla) — `js/modules/equipos.js` (Sprint 6). Mismo efecto, distinta forma de armar el mensaje de confirmación.
- `deleteQuote(id)` (modal) vs `delQuoteConfirm(qid)` (tarjeta) — `js/modules/cotizaciones.js` (Sprint 8). Mismo patrón que el anterior.
- `delFactConfirm(cid)` (Facturación, código muerto) vs `delClientConfirm(id)` (Clientes) — ambas eliminan un cliente completo, con textos/refrescos distintos.

## Otras observaciones vigentes

- `_gdriveLoadData()`/`_gdriveSaveData()` (`js/modules/drive.js`) usan el literal `'aercom-data'` en vez de la constante `STORAGE_KEY` de `js/storage.js` (mismo valor, sin impacto funcional) — inconsistencia de estilo, no un bug.
- Sincronización de Google Drive sin validación de contenido: un `aercom-data.json` editado a mano y subido a la carpeta de Drive se carga tal cual en `_gdriveLoadData()`, sin chequeo de forma ni de origen.

---

## Resueltos

### `closeModal()` sin argumento no cierra el modal genérico — PR-007.2
`js/modal.js` definía `closeModal(id)`, pisando a la versión real sin argumento por orden de carga. Renombrada a `_closeModalById(id)`.

### Grilla de Calendario corrompida por comillas sin escapar en `onclick` — PR-007.1
`JSON.stringify(ev.title)` rompía el atributo `onclick`. Corregido escapando `"` → `&quot;`.

### XSS por `innerHTML` sin escapar (sistémico) — PR-014.1
74 interpolaciones de datos de usuario sin `_esc()` en 9 módulos.

### `calShowEventDetail()`/`calShowDay()` — `SyntaxError` por comillas en `detail` — PR-014.2
Resuelto como efecto colateral de eliminar la interpolación de datos en atributos JS (ver siguiente entrada).

### Inyección de JS arbitrario vía IDs libres embebidos en `onclick` — PR-014.2
34 atributos `onclick`/`ondblclick` en 7 módulos reemplazados por `data-*` + `this.dataset.*`.

### `<textarea id="rem-notas">` sin escapar — PR-014.3
Permitía cerrar el tag con `</textarea>` e inyectar HTML/JS.

### `<option>` sin escapar (11 ubicaciones en total, en dos tandas) — PR-014.4 y PR-014.5
`${c.nombre}` (6 ubicaciones, PR-014.4) y `${e.id}`/`${c.responsable}`/`${c.id}` (5 ubicaciones adicionales encontradas en la auditoría de cierre, PR-014.5). Confirmado explotable y corregido: el navegador cierra `</option>` como tag real, dejando el resto del payload como HTML hermano dentro del `<select>`.
