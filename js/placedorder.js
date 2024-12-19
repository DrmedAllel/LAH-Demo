function getItemsWithHashFromLocalStorage() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('#')) {
            items[key] = localStorage.getItem(key);
        }
    }
    return items;
}

document.addEventListener('DOMContentLoaded', function() {
    //get language cookie
    const language = getCookie('language');
    let main = document.querySelector('main');
    main.innerHTML = main.innerHTML + `
                                        <h1 id='thank_you_header'>${language === 'de' ? 'Vielen Dank für Ihre Bestellung!' : 'Thank you for your order!'}</h1>
                                        <p>${language === 'de' ? 'Wir bearbeiten Ihre Bestellung und senden Ihnen eine Rechnung per E-Mail. Bitte haben Sie etwas Geduld.' : 'We are processing your order and will send you an invoice by email. Please be patient.'}</p>
                                        <p>${language === 'de' ? 'Wenn Sie Fragen haben, kontaktieren Sie uns bitte: ' : 'If you have any questions, please contact us: '} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
                                        <h2>${language === 'de' ? 'Übersicht Ihrer Bestellungen' : 'Overview of your orders'}</h2>
                                        <div id="order_container"></div>
                                        <p class="note">${language === 'de' ? 'Ihr Bestellung wird nach 7 Tagen aus der Historie gelöscht.' : 'Your order will be deleted from the history after 7 days.'}</p>
                                    `;

    loadOrders('#order_container');
});


function loadOrders(identifier) {
    const language = getCookie('language');

    let elementToPaste = document.querySelector(identifier);

    let ListOfOrders = getItemsWithHashFromLocalStorage();
    for (let order in ListOfOrders) {
        let orderData = JSON.parse(ListOfOrders[order]);
        orderData = JSON.parse(orderData.value);
        console.log(orderData);

        let products = [];
        let products_string = orderData.products;
        products = products_string.split('\n');
        let productsHTML = '';
        for (let product of products) {
            productsHTML = productsHTML + `<p>${product}</p>`;
        }
        let orderHTML = `
            <div class="order">
                <h3 class="order_id">${language === 'de' ? 'Bestellnummer: ' : 'Order-ID: '}${orderData.orderNumber}</h3>
                <p>Email: ${orderData.email}</p>
                <p>${language === 'de' ? 'Datum: ' : 'Date: '} ${orderData.orderdate} ${language === 'de' ? 'Uhr' : 'o\'clock'}</p>
                <p>${language === 'de' ? 'Zahlungsmethode: ' : 'Payment method: '} ${orderData.payment}</p>
                <p>${language === 'de' ? 'Download-Methode: ' : 'Download method: '} ${orderData.download}</p>
                <p>${language === 'de' ? 'Bestellung: ' : 'Order: '}</p>
                <div class="products">
                    ${productsHTML}
                </div>
            </div>
            `;
            elementToPaste.innerHTML = elementToPaste.innerHTML + orderHTML;
    }
}