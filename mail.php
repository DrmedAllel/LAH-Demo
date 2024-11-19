<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

file_put_contents('log.txt', "Script gestartet\n", FILE_APPEND);

// Empfänger für Test
$empfaenger = "business@mclaudiuslaur.de";

// Empfänger für Betrieb
// $empfaenger = "info@luftfahrt-archiv-hafner.de";

$sender = "Bestellformular";
$sendermail = "keineantwortmoeglich@luftfahrt-archiv-hafner.de";

$betreff = "Sie haben eine neue Bestellung erhalten";

$name = $_POST["Name"];
$vorname = $_POST["Vorname"];
$strasse = $_POST["Strasse"];
$hausnummer = $_POST["Hausnummer"];
$postleitzahl = $_POST["Postleitzahl"];
$ort = $_POST["Ort"];
$land = $_POST["Land"];
$emailadresse = $_POST["eMail-Adresse"];
$anmerkungen = $_POST["Anmerkungen"];

// Sammle alle Artikel
$artikel = [];
foreach ($_POST as $key => $value) {
    if (strpos($key, 'Artikel_') === 0) {
        $artikel[] = $value;
    }
}

$artikelText = "";
foreach ($artikel as $index => $artikelName) {
    $artikelText .= "- " . $artikelName . "\n";
}

$endtext = "
Sie haben eine Bestellung von " . $vorname . " " . $name . " erhalten.

Anschrift des Bestellers

Vorname: " . $vorname . "
Name: " . $name . "

Strasse: " . $strasse . "
Hausnummer: " . $hausnummer . "
PLZ: " . $postleitzahl . "
Ort: " . $ort . "
Land: " . $land . "

Emailadresse: " . $emailadresse . "


Bestellte(r) Artikel:
" . $artikelText . "

Weitere Hinweise vom Besteller:
" . $anmerkungen . "
";

file_put_contents('log.txt', "Endtext erstellt\n", FILE_APPEND);

// Prüfung ob Pflichtfelder korrekt gefüllt sind
if (filter_var($emailadresse, FILTER_VALIDATE_EMAIL) && $name) {
    if (mail($empfaenger, $betreff, $endtext, "From: $sender <$sendermail>")) {
        file_put_contents('log.txt', "Mail erfolgreich gesendet\n", FILE_APPEND);
        header("Location: danke.htm");
    } else {
        file_put_contents('log.txt', "Fehler beim Senden der Mail\n", FILE_APPEND);
        header("Location: fehler.htm");
    }
} else {
    file_put_contents('log.txt', "Ungültige Eingabedaten\n", FILE_APPEND);
    header("Location: fehler.htm");
}
