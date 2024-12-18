async function handleSubmit(event) {
    event.preventDefault();

    //create an order id based on the time in milliseconds and the browser session id
    const orderId = '#' + (Date.now() + Math.random().toString(36).substring(7)).toString().slice(-5).toUpperCase();

    // Sammle alle Formulardaten
    const formData = {
        Bestellnummer: orderId,
        Name: document.getElementById('name').value,
        Vorname: document.getElementById('prename').value,
        Strasse: document.getElementById('street').value,
        Hausnummer: document.getElementById('housenumber').value,
        Postleitzahl: document.getElementById('zip').value,
        Ort: document.getElementById('city').value,
        Land: document.getElementById('country').value,
        'eMail-Adresse': document.getElementById('email').value,
        Anmerkungen: document.getElementById('comments').value
    };

    // Sammle Warenkorb-Items
    const cartElement = document.querySelector('.cart');
    const items = cartElement.getElementsByClassName('cart-item');
    let itemsArray = [];
    Array.from(items).forEach((item, index) => {
        const itemName = item.querySelector('.ItemTitle').textContent;
        const itemID = item.querySelector('.ItemID').textContent;
        const itemPrice = item.querySelector('.ItemPrice').textContent;
        itemsArray.push({ Name: itemName, ID: itemID, Preis: itemPrice });
    });

    sendMail(formData, itemsArray);
    
    alert('Ihre Mail wurde erfolgreich generiert und in die Zwischenablage kopiert. Nehmen Sie bitte Kontakt mit uns auf, um die Bestellung abzuschließen.');
}

function sendMail(formData, items) {
    const subject = `Bestellung ${formData.Bestellnummer}`;
    let body = Object.keys(formData).map(key => `${key}: ${formData[key]}`).join('\n');
    body += '\n\nBestellte Artikel:\n';
    items.forEach(item => {
        body += `${item.Name} (${item.ID}) - ${item.Preis}\n`;
    });

    body += '\n\nDie aufgeführten Preise sind nicht verbindlich. Wir werden uns mit Ihnen in Verbindung setzen, um die Bestellung abzuschließen und eine Rechnung zu erstellen.';

    navigator.clipboard.writeText(body);
    const mailtoLink = `mailto:info@luftfahrt-archiv-hafner.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

function selectPayment(button) {
    const paymentButtons = document.querySelectorAll('.payment_button');
    paymentButtons.forEach(button => button.classList.remove('selected_button'));
    button.classList.add('selected_button');
}

function selectDownload(button) {
    const downloadButtons = document.querySelectorAll('.download_button');
    downloadButtons.forEach(button => button.classList.remove('selected_button'));
    button.classList.add('selected_button');
}