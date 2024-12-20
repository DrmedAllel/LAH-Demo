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
    displaySpinner();
    //get language cookie
    const language = getCookie('language');
    let main = document.querySelector('main');
    main.innerHTML = main.innerHTML + `
                                        <h1 id='thank_you_header'>${language === 'de' ? 'Vielen Dank für Ihre Bestellung!' : 'Thank you for your order!'}</h1>
                                        <p>${language === 'de' ? 'Wir bearbeiten Ihre Bestellung und senden Ihnen eine Rechnung per E-Mail. Bitte haben Sie etwas Geduld.' : 'We are processing your order and will send you an invoice by email. Please be patient.'}</p>
                                        <div id='order_container'></div>
                                    `;

    loadOrders('#order_container');
});


async function loadOrders(identifier) {
    const language = getCookie('language');
    const elementToPaste = document.querySelector(identifier);
    const ListOfOrders = getItemsWithHashFromLocalStorage();

    for (let order in ListOfOrders) {
        let orderData = JSON.parse(ListOfOrders[order]);
        orderData = JSON.parse(orderData.value);

        const orderHTML = createOrderHTML(orderData, language);
        elementToPaste.innerHTML += orderHTML;
        appendMap(orderData);
    }
}

function createOrderHTML(orderData, language) {
    const products = orderData.products.split('\n');
    const productsHTML = products.map(product => `<p>${product}</p>`).join('');
    
    const map_id = getMapId(orderData.orderNumber);
    return `
        <div class="order">
            <div class="order_header">
                <svg fill="#000000" width="80px" height="80px" viewBox="0 0 24 24" id="check-mark-circle" xmlns="http://www.w3.org/2000/svg" class="icon line"><path id="primary" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21ZM8,11.5l3,3,5-5" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></svg>
                <div class="order_header_text">
                    <p class="order_id">${language === 'de' ? 'Bestellnummer: ' : 'Order-ID: '}${orderData.orderNumber}</p>
                    <p class="thank_you">${language === 'de' ? 'Danke ' : 'Thank you '} ${orderData.first_name}!</p>
                </div>
            </div>
            <div class="map_container">
                <div class="map" id="${map_id}"></div>
                <div class="map_container_text">
                    <p class="">${language === 'de' ? 'Wir haben Deine Bestellung erhalten!' : 'We received your order!'}</p>
                    <p class="">${language === 'de' ? 'Wir melden uns in Kürze bei dir mit der Rechnung.' : 'We will contact you shortly with the invoice.'}</p>
                </div>
            </div>
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
}

let googleMapsLoaded = false;
let googleMapsLoadPromise = null;

function initializeGoogleMapsAPI() {
    if (googleMapsLoadPromise) return googleMapsLoadPromise;

    googleMapsLoadPromise = new Promise((resolve, reject) => {
        const key = 'ueigniurnvuesng';
        const YOUR_API_KEY = decrypt('NCwTBj0QMRgXLDYUIwwAKgNdDQhQHUQdOS09HT4EOj9RNQAYQEIv', key);


        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&callback=googleMapsCallback`;
        script.async = true;
        script.defer = true;
        
        window.googleMapsCallback = () => {
            googleMapsLoaded = true;
            resolve();
        };
        
        script.onerror = reject;
        document.head.appendChild(script);
    });

    return googleMapsLoadPromise;
}

async function getLatLong(address) {
    if (!googleMapsLoaded) {
        await initializeGoogleMapsAPI();
    }

    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve(results[0].geometry.location);
            } else {
                reject(new Error(`Geocoding fehlgeschlagen: ${status}`));
            }
        });
    });
}

function getMapId(orderNumber) {
    const map_id = orderNumber.split('').reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
    }, 0).toString(36).replace(/\d/g, '');
    return map_id;
}

async function appendMap(orderData) {
    try {
        if (!googleMapsLoaded) {
            await initializeGoogleMapsAPI();
        }
        const adress = orderData.adress + ', ' + orderData.zip + ' ' + orderData.city + ', ' + orderData.country;
        const adress_lat_long = await getLatLong(adress);
        const map_id = getMapId(orderData.orderNumber);
        const mapElement = document.getElementById(map_id);

        if (!mapElement) {
            throw new Error(`Map Element ${map_id} nicht gefunden`);
        }

        const map = new google.maps.Map(mapElement, {
            center: adress_lat_long,
            zoom: 15,
            mapId: map_id,
            disableDefaultUI: true,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            rotateControl: false,
            scaleControl: false,
            panControl: false,
            gestureHandling: 'none',
            scrollwheel: false,
            draggable: false,
            clickableIcons: false
        });

        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
        
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: adress_lat_long,
            map: map
        });

        const language = getCookie('language');

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="marker">
                    <p>${language === 'de' ? 'Lieferadress:' : 'Delivery address:'}</p>
                    <p>${adress}</p>
                </div>
            `
        });
        infoWindow.open(map, marker);

    } catch (error) {
        console.error('Fehler beim Laden der Karte:', error);
        const mapElement = document.getElementById(map_id);
        if (mapElement) {
            mapElement.innerHTML = 'Karte konnte nicht geladen werden';
        }
    }
    hideSpinner();
}


