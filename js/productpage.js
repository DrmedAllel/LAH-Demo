
async function loadButtons () {
    //get all buttons from the class add-to-cart
    const buttons = document.getElementsByClassName('add-to-cart');

    //get the language cookie
    const language = getCookie('language');

    //for each button check if there exists a cookie with the id of the button
    for (let button of buttons) {
        //get the id attribute of the button element
        const itemId = button.getAttribute('id');
        if (getCookie(itemId) !== null) {
            if (language === 'de') {
                button.innerHTML = 'Im Warenkorb';
            } else {
                button.innerHTML = 'In Cart';
            }
            button.classList.add('remove-from-cart');
        } 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const order_info = document.getElementById('order_info');
    if (order_info) {
        const language = getCookie('language');
        if (language === 'de') {
            order_info.innerHTML = `
            <div class="order_info_row">
                <p>Alle Dateien werden als <img src="../images/dvd.jpg" alt="DVD" class="order_info_img"> DVD oder zum <img src="../images//download.png" alt="Download" class="order_info_img"> Download angeboten.</p>
            </div>
            <div class="order_info_row">
                <p><img src="../images//buch.png" alt="Buch-Reproduktion" class="order_info_img"> Buch-Reproduktion auf Anfrage: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
            </div>
            <p>Bestellungen über die Website oder über Mail möglich: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
                `;
        } else {
            order_info.innerHTML = `
            <div class="order_info_row">
                <p>All files are offered as <img src="../images/dvd.jpg" alt="DVD" class="order_info_img"> DVD or for <img src="../images//download.png" alt="Download" class="order_info_img"> download.</p>
            </div>
            <div class="order_info_row">
                <p><img src="../images//buch.png" alt="Book reproduction" class="order_info_img"> Book reproduction on request: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
            </div>
            <p>Orders possible via the website or by mail: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
                `;
        }
    }
});


window.onload = function () {
    //get all .item elements
    const items = document.getElementsByClassName('item');
    const language = getCookie('language');

    //for each item add this button to the end of the div <button class="add-to-cart" id="LAH-508" onclick="editCartItem('LAH-508', 'Siebel Fh 104', '29.00', this)">In den Warenkorb</button>
    for (let item of items) {
        const ItemTitle = item.getElementsByClassName('item_title')[0].innerText;
        const ItemPrice = item.getElementsByClassName('price')[0].innerText;
        const ItemID = item.getElementsByClassName('item-number')[0].innerText


        const button = document.createElement('button');
        button.className = 'add-to-cart';
        button.id = ItemID;
        button.setAttribute('onclick', `editCartItem('${ItemID}', '${ItemTitle}', '${ItemPrice}', this)`);
        button.innerHTML = language === 'de' ? 'In den Warenkorb' : 'Add to Cart';
        item.appendChild(button);
    }

    loadButtons();
}