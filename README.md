# Matematikako Laborategia — DBH 2

**Matematikako Laborategia matematikaren bidez pentsatzen ikasteko gunea da.**

DBH 2ko hautazko irakasgai honetan helburua ez da ohiko matematika-eskolako edukiak beste modu batean errepikatzea. Ikasleek erronkak, ikerketak, matematika-jolasak eta proiektuak erabiltzen dituzte problemak ulertzeko, estrategiak sortzeko, patroiak aurkitzeko, aieruak egiteko, argumentatzeko, irudikapenak aldatzeko eta beren ideiak besteekin kontrastatzeko.

Laborategiak hiru dimentsio uztartu nahi ditu: **hobeto pentsatzea**, **identitate matematiko positiboa eraikitzea** eta **matematikaz gozatzea**. Horregatik, erantzun zuzena aurkitzea ez da jarduera baten amaiera nahitaez. Nola iritsi garen, beste estrategia bat posible den, zergatik funtzionatzen duen edo zer gertatzen den baldintzak aldatzen baditugu ere ikerketaren parte dira.

Ikasgelan, ahal denean, ausazko hirukoteetan lan egiten da. Irakaslearen lana ez da metodoa aurreratzea, baizik eta pentsamendua aktibatzeko galderak egitea, blokeoak aprobetxatzea eta jardueretan modu naturalean agertzen diren **pentsatzeko tresnak** izendatzen eta berrerabiltzen laguntzea.

## Webgunearen edukia

Webguneak jarduera-bankua, jarduera bakoitzaren fitxak, irakaslearentzako gida eta ikasturteko jarraipena biltzen ditu.

Jarduera bakoitzak lau geruza izan ditzake:

1. **Fitxa teknikoa** — programaziorako eta bilaketarako metadatuak.
2. **Jardueraren aurkezpena** — jarduera lehen aldiz erabiliko duen irakaslearentzako azalpen pedagogiko zabala.
3. **Irakaslearen fitxa** — jarduera gelan egiteko gida operatiboa, denboralizazioa, galderak, soluzioak, blokeoak eta hedapenak barne.
4. **Ikaslearen fitxa** — behar denean inprimatzeko materiala.

Ikasturteko esperientziaren **jarraipena** jardueretatik bereizita gordetzen da, jarduera bera urte edo une desberdinetan egin ahal izateko.

## Edukiaren iturria: YAML

`yaml/` karpetako fitxategiak dira jardueren **edukiaren iturri nagusia**. Jarduera berria gehitu edo lehendik dagoena aldatu ondoren, webguneak erabiltzen duen datu-fitxategia berreraiki behar da:

```bash
python3 tools/build.py
```

Horrek `data/actividades.js` sortzen du.

GitHub-en argitaratzean, GitHub Actions-ek urrats hori automatikoki egiten du. Lokalean YAML fitxategiak aldatu badira, komandoa eskuz exekutatu behar da.

## Lokalean erabiltzea

Banatutako bertsioa zuzenean erabil daiteke zerbitzaririk instalatu gabe: `index.html` ireki nabigatzailean.

Nahi izanez gero, garapenerako zerbitzari lokal sinple bat erabil daiteke:

```bash
python3 -m http.server 8000
```

eta ondoren `http://localhost:8000` ireki.

## Proiektuaren egitura

```text
.
├── index.html
├── jarduera.html
├── bankua.html
├── jarraipena.html
├── gida.html
├── lizentzia.html
├── yaml/
├── data/
│   └── actividades.js
├── assets/
├── js/
├── css/
├── tools/
│   └── build.py
└── .github/workflows/
```

## Jarduera berriak gehitzea

1. Sortu jardueraren YAML fitxategia `yaml/` karpetan.
2. Mantendu lehendik dauden jardueren egitura.
3. Gehitu behar diren irudi edo diagramak `assets/` karpetan.
4. Exekutatu `python3 tools/build.py` lokalean, edo egin commit/push GitHub-era.
5. Egiaztatu jarduera bankuan, jarduera-orrian eta inprimatzeko bistetan.

## Lizentzia

Materiala **Creative Commons BY-NC-SA 4.0** lizentziapean argitaratzen da: aitortza egin behar da, erabilera komertzialik ez da onartzen eta egokitzapenak lizentzia berarekin partekatu behar dira.

Proiektua OpenAI ChatGPT-ren laguntzarekin garatu da.
