window.onload = function () {
    //get all buttons from the class add-to-cart
    const buttons = document.getElementsByClassName('add-to-cart');

    //for each button check if there exists a cookie with the id of the button
    for (let button of buttons) {
        //get the id attribute of the button element
        const itemId = button.getAttribute('id');
        if (getCookie(itemId) !== null) {
            button.innerHTML = 'Im Warenkorb';
            button.classList.add('remove-from-cart');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const order_info = document.getElementById('order_info');
    if (order_info) {
        order_info.innerHTML = `
        <div class="order_info_row">
            <p>Alle Dateien werden als DVD oder zum Download angeboten</p><img src="../images/dvd.jpg" alt="DVD" class="order_info_img"><img src="../images//download.png" alt="Download" class="order_info_img">
        </div>
        <div class="order_info_row">
            <p>Buch-Reproduktion auf Anfrage: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p><img src="../images//buch.png" alt="Buch-Reproduktion" class="order_info_img">
        </div>
        <p>Bestellungen über die Website oder über Mail möglich: <a href="mailto:info@luftfahrt-archiv-hafner.de">info@luftfahrt-archiv-hafner.de</a></p>
            `;
    }
});