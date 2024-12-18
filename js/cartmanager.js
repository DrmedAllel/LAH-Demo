function addToCart(itemId, itemName, itemPrice, itemType, button) {
    const cartItem = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        type: itemType
    };

    // Convert the cart item to a JSON string
    const cartItemString = JSON.stringify(cartItem);

    // Set the cookie with the cart item
    setLocalStorageItem(itemId, cartItemString, 1);

    console.log(`Item added to cart: ${itemName} (${itemId}) - $${itemPrice}`);


    const language = getCookie('language');

    //Change the button text to remove from cart
    if (language === 'de') {
        button.innerHTML = 'Im Warenkorb';
    } else {
        button.innerHTML = 'In Cart';
    }
    
    //add the class remove-from-cart to the button
    button.classList.add('remove-from-cart');

    //get the cart_link element
    const cartLinks = document.getElementsByClassName('cart_link');

    for (let cartLink of cartLinks) {
        // Add a wiggle animation class
        cartLink.classList.add('wiggle');
        // Remove the class after 2 seconds
        setTimeout(() => {
            cartLink.classList.remove('wiggle');
        }, 500);
    }
}


function removeFromCart(itemId, button) {
    //delete the cookie
    removeLocalStorageItem(itemId);

    if (button) {
        //remove the class remove-from-cart from the button
        button.classList.remove('remove-from-cart');

        const language = getCookie('language');

        //Change the button text to add to cart
        if (language === 'de') {
            button.innerHTML = 'In den Warenkorb';
        } else {
            button.innerHTML = 'Add to Cart';
        }
    } else {
        console.error('Button is undefined');
    }

    console.log(`Item removed from cart: ${itemId}`);
}

function editCartItem(itemId, itemName, itemPrice, itemType, button) {
    // Check if the item is in the cart
    if (localStorage.getItem(itemId)) {
        removeFromCart(itemId, button);
    } else {
        addToCart(itemId, itemName, itemPrice, itemType, button);
    }

    loadCart();
}

window.onload = function() {
    loadCart();
}

function loadCart() {
    console.log('Loading cart...');
    // Get all items from localStorage beginning with LAH- and add them to a list
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('LAH-')) {
            try {
                const jsonString = localStorage.getItem(key);
                const item = JSON.parse(jsonString);
                if (item && item.id && item.name && item.price) {
                    cartItems.push(item);
                } else {
                    console.error('Invalid item structure:', item);
                }
            } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
                console.error('Key:', key);
            }
        }
    }

    // Get all cart elements
    const carts = document.getElementsByClassName('cart');

    // Loop through each cart element
    Array.from(carts).forEach(cart => {
        // Remove all children of the cart element
        while (cart.firstChild) {
            cart.removeChild(cart.firstChild);
        }
    });

    Array.from(carts).forEach(cart => {
        // Add each item to the cart
        for (let item of cartItems) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="ItemRow">
                <h3 class="ItemTitle">${item.name}</h3>
                <p class="ItemID">ID: ${item.id}</p>
            </div>
            <div class="ItemRow">
                <select class="item-options">
                    <option value="download" selected>Download</option>
                    <option value="dvd">DVD</option>
                    <option value="book">Book</option>
                </select>

                <p class="ItemPrice">${item.price} €</p>
            </div>
            <button class="add-to-cart" onclick="editCartItem('${item.id}', '${item.name}', '${item.price}', this);">×</button>
            `;
            cart.appendChild(cartItem);
        }
    });
}


function editCartItem(itemId, itemName, itemPrice, itemType, button) {
    // Check if the item is in the cart
    if (localStorage.getItem(itemId)) {
        removeFromCart(itemId, button);
    } else {
        addToCart(itemId, itemName, itemPrice, itemType, button);
    }

    loadCart();
}

window.onload = function() {
    loadCart();
}

function loadCart() {
    //Ge the Language Cookie
    const language = getCookie('language');

    console.log('Loading cart...');
    // Get all items from localStorage beginning with LAH- and add them to a list
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('LAH-')) {
            try {
                getLocalStorageItem(key);
                cartItems.push(JSON.parse(getLocalStorageItem(key)));
            } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
                console.error('Key:', key);
            }
        }
    }

    // Get all cart elements
    const carts = document.getElementsByClassName('cart');

    // Loop through each cart element
    Array.from(carts).forEach(cart => {
        // Remove all children of the cart element
        while (cart.firstChild) {
            cart.removeChild(cart.firstChild);
        }
    });

    Array.from(carts).forEach(cart => {
        // Add each item to the cart
        for (let item of cartItems) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="ItemRow">
                <h3 class="ItemTitle">${item.name}</h3>
                <select class="item-options">
                    <option value="download">Download</option>
                    <option value="dvd">DVD</option>
                    <option value="book">Book</option>
                </select>
            </div>
            <div class="ItemRow">
                <p class="ItemID">ID: ${item.id}</p>
                <p class="ItemPrice">${item.price}</p>
            </div>
            <button class="add-to-cart" onclick="editCartItem('${item.id}', '${item.name}', '${item.price}', '${item.option}', this);">×</button>
            `;
            cart.appendChild(cartItem);
            let selectedOption = item.type;
            const itemOptions = cartItem.querySelector('.item-options');
            itemOptions.value = selectedOption;

            const itemPriceElement = cartItem.querySelector('.ItemPrice');
            if (selectedOption === 'book') {
                if (language === 'de') {
                    itemPriceElement.innerHTML = 'Preis als Buch nur auf Anfrage.';
                } else {
                    itemPriceElement.innerHTML = 'Price as a book only on request.';
                }
            } else {
                itemPriceElement.innerHTML = `${item.price}`;
            }
        }
    });
}


window.addEventListener('scroll', function() {
    const shoppingCart = document.querySelector('.shopping_cart');
    if (shoppingCart) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent >= 15) {
            shoppingCart.style.display = 'flex';
        } else {
            shoppingCart.style.display = 'none';
        }
    }
});

document.addEventListener('change', function(event) {
    // get Language Cookie
    const language = getCookie('language');

    if (event.target.classList.contains('item-options')) {
        const selectedOption = event.target.value;
        const itemPriceElement = event.target.closest('.cart-item').querySelector('.ItemPrice');
        const itemId = event.target.closest('.cart-item').querySelector('.ItemID').textContent.split(': ')[1];

        if (selectedOption === 'book') {
            if (language === 'de') {
                itemPriceElement.innerHTML = 'Preis als Buch nur auf Anfrage.';
            } else {
                itemPriceElement.innerHTML = 'Price as a book only on request.';
            }
        } else {
            const itemId = event.target.closest('.cart-item').querySelector('.ItemID').textContent.split(': ')[1];
            const cartItem = JSON.parse(getLocalStorageItem(itemId));
            itemPriceElement.innerHTML = `${cartItem.price}`;
        }

        let Item = getLocalStorageItem(itemId);
        Item = JSON.parse(Item);
        Item.type = selectedOption;
        Item = JSON.stringify(Item);
        setLocalStorageItem(itemId, Item, 1);
    }
});


