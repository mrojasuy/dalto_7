# Modo Daltónico - Guía de Instalación y Uso

## Instalación

1. Copiar la carpeta `ModoDaltonico` (que contiene `ModoDaltonico.php`, `pages/`, `files/` y `lang/`) dentro del directorio `plugins/` de su instalación de MantisBT.
2. Acceder a MantisBT como administrador.
3. Ir a **Administración → Complementos** (Admin → Manage Plugins).
4. Buscar "Modo Daltónico" en la lista de plugins disponibles y presionar **Instalar**.
5. Una vez instalado, el nombre del plugin aparecerá como enlace en la sección de Plugins instalados. Al hacer clic se abrirá la página de configuración global.

## Configuración

Desde la página de configuración se puede:

- **Activar / Desactivar** el plugin de forma global (por defecto está activado).
- **Seleccionar el tipo de contraste** por defecto:
  - **Protanopía** (no ve el rojo)
  - **Deuteranopía** (no ve el verde)
  - **Tritanopía** (no ve el azul)

Los cambios se guardan presionando el botón **Guardar**.

## Uso del botón flotante

- Al navegar por MantisBT aparece un **botón flotante** (icono de ojo) en la esquina inferior derecha de la pantalla.
- Al presionarlo se **activa** el Modo Daltónico y aparece:
  - Un **badge indicador** en la esquina superior derecha con el texto "Modo Daltónico ON".
  - Un **selector desplegable** junto al botón para cambiar entre Protanopía, Deuteranopía y Tritanopía.
- Al presionar nuevamente el botón, el modo se **desactiva**.
- La configuración (activo/inactivo y tipo de contraste seleccionado) se **persiste en el navegador** mediante localStorage, manteniéndose entre pestañas y sesiones.

## Compatibilidad

- **MantisBT**: 2.0 o superior.
- **Navegadores**: Google Chrome, Safari y Microsoft Edge en sus versiones más recientes.

---

# Colorblind Mode - Installation and Usage Guide

## Installation

1. Copy the `ModoDaltonico` folder (containing `ModoDaltonico.php`, `pages/`, `files/`, and `lang/`) into the `plugins/` directory of your MantisBT installation.
2. Log in to MantisBT as an administrator.
3. Go to **Administration → Manage Plugins**.
4. Find "Colorblind Mode" in the available plugins list and click **Install**.
5. Once installed, the plugin name will appear as a link in the Installed Plugins section. Clicking it opens the global configuration page.

## Configuration

From the configuration page you can:

- **Enable / Disable** the plugin globally (enabled by default).
- **Select the default contrast type**:
  - **Protanopia** (cannot see red)
  - **Deuteranopia** (cannot see green)
  - **Tritanopia** (cannot see blue)

Save changes by pressing the **Save** button.

## Using the floating button

- When navigating MantisBT, a **floating button** (eye icon) appears at the bottom-right corner of the screen.
- Pressing it **activates** Colorblind Mode and shows:
  - A **badge indicator** at the top-right corner reading "Colorblind Mode ON".
  - A **dropdown selector** next to the button to switch between Protanopia, Deuteranopia, and Tritanopia.
- Pressing the button again **deactivates** the mode.
- The configuration (active/inactive and selected contrast type) **persists in the browser** via localStorage, maintaining state across tabs and sessions.

## Compatibility

- **MantisBT**: 2.0 or higher.
- **Browsers**: Google Chrome, Safari, and Microsoft Edge (latest versions).
