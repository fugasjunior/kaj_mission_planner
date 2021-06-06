# Mission Planner
Semestrální práce z KAJ

## Popis aplikace
Mission Planner je aplikace pro interaktivní plánování vojenských operací a vizualizaci vojenských sil v oblasti.
Aplikace umožňuje do online mapy celého světa kreslit libovolné čáry a vkládat ikony z předdefinovaného setu
NATO znaků.

Výsledný plán je uložen v prohlížeči a může být následně vyexportován do JSON souboru a opětovně nahrán.

## Návod k použití
### Kreslení čar
1. Pomocí ovládacího panelu zvolte násroj "line", případně vyberte barvu a nastavte požadovanou šířku čáry
2. Ctrl + kliknutím do mapy zvolíte první bod čáry
3. Ctrl + kliknutím na jiné místo v mapě zvolíte druhý bod a čára se vykreslí
4. Pokud chcete kreslit další propojené čáry, během celého procesu držte klávesu Shift

### Vkládání markerů
1. Vyberte nástroj "marker"
2. Zvolte typ markeru
    - typ "point" vloží obyčejný marker
    - ostatní typy určují typ jednotky, která má být použita (infantry, armor či fixedwing)
3. Pokud chcete vložit NATO symbol pro jednotku, vyberte, zda se jedná o přátelskou či nepřátelskou stranu
4. V případě potřeby změňte velikost markeru
5. Ctrl + kliknutím do mapy vložíte nastavený marker do mapy

### Ostatní ovládací prvky
- tlačítkem "Export" uložíte současný plán do souboru JSON
- tlačítkem "Load" můžete nahrát existující soubor JSON s plánem
- tlačítkem "Clear" vymažete lokální stav aplikace

## Návod na lokální spuštění aplikace
Předpoklady: nainstalovaný NPM
1.  naklonování / stažení projektu na lokální uložiště
2. `npm install` v kořenu projektu
3. `npm run start` v kořenu projektu
4. aplikace bude dostupná na adrese http://localhost:8080/


## Použité funkcionality
Kde najít jednotlivá kritéria hodnocení:
- **Sémantické značky** - HTML5 značky `main`, `section`
- **Grafika - SVG / Canvas** - SVG jsou použita pro NATO symboly jednotek, jsou dynamicky generována v skriptu
  `NatoMarker.js` a vložena do marker layeru mapy. Canvas přímo použit není, nicméně je použitá Geometry vrstva
  Seznam Mapy, která zastává podobnou funkcionalitu a jsou do ní vykreslovány vytvořené čáry.
- **Média - Audio/Video** - při prvním spuštění aplikace je přehrán zvuk "inicializace systému" skrz Javascript.
- **Formulářové prvky** - využití buttons, range sliderů
- **Pokročilé selektory** - pseudotřídy (např. `:hover`, `:disabled`) i pseudoelementy (`:before`), viz `styles.scss`
- **Vendor prefixy** - dodány automaticky během buildu pomocí PostCSS Autoprefixer pluginu
- **CSS3 transformace 2D/3D** - posun textu loading overlaye na střed pomocí `translate(50%, 50%)`
- **CSS3 transitions/animations** - transition pro `opacity`, `background-color`, `top`, ...
- **OOP přístup** - využití importů, ES6 classes
- **Použití JS frameworku či knihovny** - pokud se to tak dá brát, byl využit Webpack s CSS preprocesorem
- **Použití pokročilých JS API** 
  - Local storage - pro uložení markerů a čar v mapě
  - Session storage - pro uložení stavu, zda už byla aplikace zobrazena, aby se znovu nezobrazil loading overlay
  - Geolocation API - pro načtení úvodní pozice mapy (v případě neúspěchu je středem zvolena Praha)
  - File API - načtení JSON souboru pro obnovení stavu aplikace 
- **Ovládání médií** - spuštění zvuku a úprava jeho hlasitosti při prvním načtení stránky  
- **JS práce se SVG** - v JS jsou tvořeny NATO symboly

