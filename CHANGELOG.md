# CHANGELOG

## 0.1.4 — Jarduera-bankua zabaltzea
- Bost jarduera berri: Txokolate-tableta, Nim, 100 ateak, Domino-taula mutilatua eta Möbiusen zinta.
- Jarduera berriek aurkezpen pedagogiko zabala, irakaslearen gida, konpetentziak, galderak, soluzioak eta hedapenak dituzte.
- `README.md` osorik euskaratu da eta DBH 2ko Matematikako Laborategiaren izaera pedagogikoa azaldu da.
- 0.1.3ko baliabideen querystring bidezko bertsionatzea kendu da.
- Bertsioa copyright/lizentzia oinean erakusteko prestatuta dago.


## 0.1.3 — Cache-busting eta bertsio ikusgarria
- CSS, jarduera-datu eta JavaScript fitxategiek bertsio-parametroa daramate nabigatzaileak bertsio zaharra ez erabiltzeko.
- Webaren bertsioa footerrean erakusten da, kargatutako bertsioa egiaztatzeko.
- 0.1.2ko `Laburpen-fitxa` taula eta eduki editorial guztiak mantentzen dira.


## 0.1.2 — Lehen bost jardueren maila editoriala
- Fitxa teknikoan `Laburpen-fitxa` izenburua eta taula trinkoa gehitu dira.
- 9 puntuak, Eskuak ematea, Bi sokak eta Zenbat piano jardueren aurkezpen pedagogikoak sakon berridatzi dira.
- Ikasleen ibilbide tipikoak, bateratze-galderak, blokeoak eta irakaslearen azalpen operatiboak zabaldu dira.
- Esku-emateen bi justifikazioak, bi soken luzera/denbora bereizketa, 9 puntuen muga ikusezina eta pianoen Fermi-modelizazioaren kalitate-irizpideak esplizitatu dira.
- YAML fitxategiak dira edukiaren iturri nagusia; `data/actividades.js` berreraiki da.


## 0.1.1 — 6 pospoloak erreferentziazko fitxa
- Aurkezpen pedagogiko osoa berreskuratu da.
- Hiru soluzioen diagramak eta blokeoen azalpen operatiboak gehitu dira.
- YAML eta rendererrak eduki aberastua onartzen dute.


## 0.1.0 — Primera versión pública para GitHub

- Primera versión preparada para publicación en GitHub Pages.
- Carpeta raíz estable: `matematikako-laborategia/`.
- YAML como fuente de verdad de las actividades.
- Un único `jarduera.html` dinámico para todas las actividades.
- Banco de actividades dinámico.
- Seguimiento centralizado en `Kurtsoaren jarraipena` y guardado en `localStorage`.
- Exportación/restauración de copia de seguridad del seguimiento.
- Licencia CC BY-NC-SA 4.0 visible en la web y en `LICENSE.md`.
- GitHub Actions incluido para generar `data/actividades.js` y desplegar GitHub Pages.
- El mismo proyecto sigue funcionando offline abriendo `index.html`.

## v0.7.0
- Refactorización arquitectónica completa.
- Un único HTML dinámico para todas las actividades.
- YAML consolidado como fuente de verdad.
- Banco de actividades dinámico.
- Seguimiento movido a `Kurtsoaren jarraipena`.
- Eliminados los formularios de seguimiento por actividad.
- Seguimiento centralizado en `localStorage`.
- Añadida licencia CC BY-NC-SA 4.0 visible en la web.
- Añadidos `LICENSE.md`, `lizentzia.html` y pie de licencia.
- Añadido workflow de GitHub Pages con build automático desde YAML.
- El ZIP sigue funcionando offline mediante `data/actividades.js`.
