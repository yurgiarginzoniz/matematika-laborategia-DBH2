# ESTADO DEL PROYECTO — v0.7.0

## Arquitectura fijada

- [x] YAML es la fuente de verdad.
- [x] Un único `jarduera.html` representa todas las actividades.
- [x] `bankua.html` se alimenta de la misma base de datos de actividades.
- [x] `jarraipena.html` está desacoplado de las actividades.
- [x] El seguimiento se guarda en `localStorage`.
- [x] El ZIP funciona offline sin servidor.
- [x] GitHub Pages puede publicar exactamente la misma web.
- [x] GitHub Actions regenera `data/actividades.js` automáticamente desde YAML.
- [x] La licencia CC BY-NC-SA 4.0 está visible en la web y en `LICENSE.md`.

## Regla anti-regresión

Las próximas versiones deben modificar YAML o las plantillas comunes, no crear HTML específicos por actividad.


## Regla de carpeta raíz

- [x] La carpeta raíz se llama siempre `matematikako-laborategia/`.
- [x] El nombre de la carpeta NO cambia entre versiones.
- [x] La versión se registra en `VERSION` y `CHANGELOG.md`.
