async function handleSubmit(event) {
    event.preventDefault();

    // Sammle alle Formulardaten
    const formData = {
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
    Array.from(items).forEach((item, index) => {
        const itemName = item.querySelector('h3').textContent;
        formData[`Artikel_${index + 1}`] = itemName;
    });

    try {
        const response = await fetch('mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            // Erfolgreiche Bestellung
            document.getElementById('orderForm').reset();
            alert('Vielen Dank für Ihre Bestellung!');
        } else {
            // Fehler bei der Bestellung
            alert('Fehler beim Senden der Bestellung');
        }
    } catch (error) {
        console.error('Fehler beim Senden der Bestellung:', error);
        window.location.href = 'fehler.htm';
    }
}