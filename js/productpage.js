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