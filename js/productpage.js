
async function loadButtons () {
    //get all buttons from the class add-to-cart
    const buttons = document.getElementsByClassName('add-to-cart');

    //get the language cookie
    const language = getCookie('language');

    //for each button check if there exists a cookie with the id of the button
    for (let button of buttons) {
        //get the id attribute of the button element
        const itemId = button.getAttribute('id');
        if (getLocalStorageItem(itemId) !== null) {
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
        order_info.innerHTML = `
            <div class="order_info_row">
                <p>${language === 'de' ? 'Alle Dateien werden als' : 'All files are offered as'} <img src="../images/dvd.jpg" alt="DVD" class="order_info_img"> DVD ${language === 'de' ? 'oder zum' : 'or for'} <img src="../images/download.png" alt="Download" class="order_info_img"> ${language === 'de' ? 'Download angeboten.' : 'download.'}</p>
            </div>
            <div class="order_info_row">
                <p><img src="../images/buch.png" alt="${language === 'de' ? 'Buch-Reproduktion' : 'Book reproduction'}" class="order_info_img"> ${language === 'de' ? 'Buch-Reproduktion auf Anfrage:' : 'Book reproduction on request:'} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
            </div>
            <p>${language === 'de' ? 'Bestellungen über die Website oder über Mail möglich:' : 'Orders possible via the website or by mail:'} <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
        `;
    }

    const mainSection = document.querySelector('main');
    const cartDiv = document.createElement('div');
    cartDiv.className = 'shopping_cart';
    cartDiv.innerHTML = `
        <a href="../warenkorb.html" title="Warenkorb">
            <img src="../images/shopping-cart.png" alt="Shopping Cart" class="shopping_cart_icon cart_link">
        </a>
    `;
    mainSection.appendChild(cartDiv);
});


window.onload = function () {
    //get all .item elements
    const items = document.getElementsByClassName('item');
    const language = getCookie('language');

    //for each item add this button to the end of the div <button class="add-to-cart" id="LAH-508" onclick="editCartItem('LAH-508', 'Siebel Fh 104', '29.00', this)">In den Warenkorb</button>
    for (let item of items) {
        const ItemTitle = item.getElementsByClassName('item_title')[0].innerText;
        const ItemPrice = item.getElementsByClassName('price')[0].innerText;
        let ItemID = item.getElementsByClassName('item-number')[0].innerText;
        ItemID = ItemID.split(': ')[1];
        
        // Check if the item_image element exists
        const itemImageElement = item.getElementsByClassName('image_item')[0];
        const ItemImage = itemImageElement ? itemImageElement.src : '';

        const button = document.createElement('button');
        button.className = 'add-to-cart';
        button.id = ItemID;
        button.setAttribute('onclick', `editCartItem('${ItemID}', '${ItemTitle}', '${ItemPrice}', 'download', '${ItemImage}', this)`);
        button.innerHTML = language === 'de' ? 'In den Warenkorb' : 'Add to Cart';
        item.appendChild(button);
    }

    loadButtons();
}