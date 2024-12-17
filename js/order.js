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

    console.log(formData)
    
    alert('Bestellung erfolgreich abgeschickt!');
}
