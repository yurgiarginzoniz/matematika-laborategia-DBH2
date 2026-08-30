# Matematikako Laborategia

Web estática para gestionar materiales del Matematikako Laborategia.

## Arquitectura

- `yaml/*.yaml` — fuente de verdad de las actividades.
- `tools/build.py` — convierte los YAML en `data/actividades.js`.
- `data/actividades.js` — paquete de datos que permite que el ZIP funcione con doble clic, sin servidor.
- `jarduera.html` — única plantilla para todas las actividades.
- `bankua.html` — banco dinámico.
- `jarraipena.html` — seguimiento desacoplado de las actividades y guardado en `localStorage`.
- `assets/` — imágenes y diagramas.

## Editar una actividad

1. Modifica su YAML.
2. Ejecuta:
   `python3 tools/build.py`
3. Recarga la web.

En GitHub Pages, el workflow incluido ejecuta el build automáticamente al publicar.

## Uso offline

Descomprime la carpeta y abre `index.html`. No hace falta instalar nada para usar la web.

## Licencia

CC BY-NC-SA 4.0. Consulta `LICENSE.md` y `lizentzia.html`.


## Primera publicación en GitHub

1. Crea un repositorio público llamado, por ejemplo, `matematikako-laborategia`.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub: `Settings → Pages → Source → GitHub Actions`.
4. Haz `push` a la rama `main`.
5. El workflow `.github/workflows/pages.yml` genera `data/actividades.js` desde los YAML y publica la web automáticamente.

La carpeta raíz del proyecto debe mantenerse siempre con el nombre `matematikako-laborategia`.

## Antes de publicar

Sustituye `[EGILEAREN IZENA / NOMBRE DEL AUTOR]` por el nombre que quieras mostrar en:
- `site.json`
- `js/app.js`
- `LICENSE.md`
- `lizentzia.html`

