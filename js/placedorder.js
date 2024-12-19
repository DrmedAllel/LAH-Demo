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
                                        <h1>${language === 'de' ? 'Vielen Dank für Ihre Bestellung' : 'Thank you for your order'}</h1>
                                        <h2>${language === 'de' ? 'Übersicht Ihrer Bestellungen' : 'Overview of your orders'}</h2>
                                        <div id="order_container"></div>
                                    `;

    loadOrders('#order_container');
});


function loadOrders(identifier) {
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
                <h3 class="order_id">${orderData.orderNumber}</h3>
                <p>${orderData.orderdate}</p>
                <p>${orderData.payment}</p>
                <p>${orderData.download}</p>
                <p>${orderData.email}</p>
                <div class="products">
                    ${productsHTML}
                </div>
            </div>
            `;
            elementToPaste.innerHTML = elementToPaste.innerHTML + orderHTML;
    }
}