# Leaflet - maps made easy

# Erste integration

"Was wollen wir machen"

- Eine Webseite bauen auf der eine Karte dargestellt wird

1. Wir öffnen https://www.google.com/maps
2. Suchen nach "Admiralitätstraße 59"

"Das wollen wir nachbauen."

"Was brauchen wir?"

Eine IDE und ein Browser

Live präsentieren (links code + rechts browser)

1. Ein Repository für die Anwendung

   1. Das habe ich als Template vorbereitet

2. Eine leere HTML Seite

   1. Diese ist Teil des Templates

3. Einbindung der Bibliothek
4. Im HEAD das Leaflet CSS vom CDN einbinden

5. div mit id=map im body
6. "Dies soll das Element sein, in dem die Karte dargestellt wird"

7. "Da wir die Karte Fullscreen sehen wollen müssen wir das div etwas stylen"
8. im style.css width: 100vw und height: 100vh hinzufügen 2. kurz backgroundcolor green setzen

9. Das LeafletJS vom CDN einbinden

10. Wir fügen etwas JS hinzu, damit wir die Karte sehen und das der Kartenauschnitt an der richtigen Stelle steht.
    1. Wir gehen zurück zu Maps und kopieren uns die Position
    2. Erstellen eine Konstante für die Koordinaten
    3. Initialisieren die Karte
       1. bezug zum div-element
       2. view setzen (mit zoom-stufe)
    4. TileLayer erstellen und der Map hinzufügen
