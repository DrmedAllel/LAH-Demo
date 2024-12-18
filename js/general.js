document.addEventListener('DOMContentLoaded', function() {
  // add navigation to the header
  const header = document.querySelector('header');
  if (header) {
      const language = getCookie('language');
      header.innerHTML = `
          <h1><a href="/LAH-Demo/index.html" title="${language === 'de' ? 'Startseite' : 'Homepage'}">Luftfahrt-Archiv Hafner</a></h1>
          <p>${language === 'de' ? 'gegr. 1990' : 'est. 1990'}</p>
          <nav>
            <div class="dropdown">
              <h2 class="title">${language === 'de' ? 'Flugzeuge' : 'Aircraft'}</h2>
              <ul class="submenu">
                <a href="/LAH-Demo/Flugzeuge/arado.html">Arado</a>
                <a href="/LAH-Demo/Flugzeuge/ago.html">AGO</a>
                <a href="/LAH-Demo/Flugzeuge/blohm_voss.html">Blohm & Voss</a>
                <a href="/LAH-Demo/Flugzeuge/bücker.html">Bücker</a>
                <a href="/LAH-Demo/Flugzeuge/dfs.html">DFS</a>
                <a href="/LAH-Demo/Flugzeuge/dornier.html">Dornier</a>
                <a href="/LAH-Demo/Flugzeuge/erla.html">Erla</a>
                <a href="/LAH-Demo/Flugzeuge/fieseler.html">Fieseler</a>
                <a href="/LAH-Demo/Flugzeuge/focke-achgelis.html">Focke-Achgelis</a>
                <a href="/LAH-Demo/Flugzeuge/focke_wulf.html">Focke Wulf</a>
                <a href="/LAH-Demo/Flugzeuge/gotha.html">Gotha</a>
                <a href="/LAH-Demo/Flugzeuge/heinkel.html">Heinkel</a>
                <a href="/LAH-Demo/Flugzeuge/henschel.html">Henschel</a>
                <a href="/LAH-Demo/Flugzeuge/junkers.html">Junkers</a>
                <a href="/LAH-Demo/Flugzeuge/klemm.html">Klemm</a>
                <a href="/LAH-Demo/Flugzeuge/messerschmitt.html">Messerschmitt</a>
                <a href="/LAH-Demo/Flugzeuge/segelflugzeuge.html">${language === 'de' ? 'Segelflugzeuge' : 'Gliders'}</a>
                <a href="/LAH-Demo/Flugzeuge/siebel.html">Siebel</a>
              </ul>
            </div>

            <div class="dropdown">
              <h2 class="title">${language === 'de' ? 'Motoren & Luftschrauben' : 'Engines & Propellers'}</h2>
              <ul class="submenu">
                <a href="/LAH-Demo/Motoren_Luftschrauben/argus.html">Argus</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/bmw.html">BMW</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/daimler_benz.html">Daimler Benz</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/gnome_rhone.html">Gnome Rhone</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/hirth.html">Hirth</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/jumo.html">JUMO</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/oberursel.html">Oberursel</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/salmson.html">Salmson</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/siemens_bramo.html">Siemens - BRAMO</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/vdm.html">VDM</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/vergaser_einspritzanlagen.html">${language === 'de' ? 'Vergaser und Einspritzanlagen' : 'Carburetors and Injection Systems'}</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/walter.html">Walter ${language === 'de' ? 'Motoren' : 'Engines'}</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/walter_hwk.html">Walter HWK</a>
                <a href="/LAH-Demo/Motoren_Luftschrauben/zuendapp.html">Zündapp</a>
              </ul>
            </div>

            <div class="dropdown">
              <a class="title" href="/LAH-Demo/Zusatz/flugzeug_bewaffnung.html">${language === 'de' ? 'Flugzeug-Bewaffnung' : 'Aircraft Armament'}</a>
            </div>

            <div class="dropdown">
              <a class="title" href="/LAH-Demo/Zusatz/flugzeug_ausruestung.html">${language === 'de' ? 'Flugzeug-Ausrüstung' : 'Aircraft Equipment'}</a>
            </div>

            <div class="dropdown">
              <a class="title cart_link" href="/LAH-Demo/warenkorb.html">${language === 'de' ? 'Warenkorb' : 'Cart'}</a>
            </div>
          </nav>
      `;
  }
});


document.addEventListener('DOMContentLoaded', function() {
    // add footer to the page
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
    <p>Luftfahrt-Archiv Hafner, Udo Hafner, gegr. 1990</p>
    <a href="/LAH-Demo/agb.html">AGB</a> 
    <a href="/LAH-Demo/links.html">Links</a> 
    <a href="/LAH-Demo/about.html">Wir über uns</a>
    <a href="/LAH-Demo/impressum.html">Impressum</a>
        `;
    }
});

document.addEventListener('DOMContentLoaded', function() {
  // add the language selection to the page
  const main = document.querySelector('main');
  if (main) {
      if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/warenkorb.html')|| window.location.pathname.endsWith('/about.html') || window.location.pathname.endsWith('/agb.html') || window.location.pathname.endsWith('/impressum.html')) {
        main.innerHTML = `
        <div id="language_selection">
          <img src="images/language_selection/germany.png" alt="Germany Flag" id="germany_flag" class="flag flag_active" title="Seite auf Deutsch">
          <img src="images/language_selection/uk.png" alt="UK Flag" id="uk_flag" class="flag" title="Page in English">
        </div>
        ` + main.innerHTML;
      } else {
        main.innerHTML = `
        <div id="language_selection">
          <img src="../images/language_selection/germany.png" alt="Germany Flag" id="germany_flag" class="flag flag_active" title="Seite auf Deutsch">
          <img src="../images/language_selection/uk.png" alt="UK Flag" id="uk_flag" class="flag" title="Page in English">
        </div>
        ` + main.innerHTML;
      }
  }
});
    


//functions to manage cookies

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
      let cookie = c.trim();
      if (cookie.startsWith(nameEQ)) return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

function getAllCookies() {
  return document.cookie.split(';');
}


//Accept cookies on first visit
document.addEventListener('DOMContentLoaded', function() {
  if (getCookie('acceptCookies') === null) {
      const cookieBanner = document.createElement('div');
      cookieBanner.classList.add('cookie-banner');
      cookieBanner.style.transform = 'translateY(100%)';
      cookieBanner.style.transition = 'transform 1s ease-in-out';
      cookieBanner.innerHTML = `
      <p>We use cookies and local browser storage to ensure you get the best experience on our website. By continuing to use this site, you consent to the use of cookies.</p>
      <button onclick="acceptCookies()">Accept</button>
      `;
      document.body.appendChild(cookieBanner);
      
      // Trigger the animation after a small delay to ensure the transition works
      setTimeout(() => {
          cookieBanner.style.transform = 'translateY(0)';
      }, 700);

      //with the next click on the page add the acceptCookies cookie
      document.addEventListener('click', function() {
          setCookie('acceptCookies', 'true', 365);
          setCookie('language', 'en', 365);
          const banner = document.querySelector('.cookie-banner');
          if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => {
              banner.remove();
            }, 1000);
          }
      });
  }
});

//When clicked on one of the flags, set the language cookie and reload the page
document.addEventListener('click', function(event) {
  if (event.target.id === 'germany_flag') {
      setCookie('language', 'de', 365);
      location.reload();
  } else if (event.target.id === 'uk_flag') {
      setCookie('language', 'en', 365);
      location.reload();
  }
});


//local storage functions

function setLocalStorageItem(key, value, expireDays) {
  const item = {
    value: value,
    expiry: expireDays ? new Date().getTime() + expireDays * 24 * 60 * 60 * 1000 : null
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageItem(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (item.expiry && new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function getLocalStorageItems() {
  const items = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    items[key] = getLocalStorageItem(key);
  }
  return items;
}


function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function clearLocalStorage() {
  localStorage.clear();
}

function displaySpinner() {
  //get element with the id spinner
  const spinner = document.getElementById('spinner');
  //remove class spinner_invisible from the spinner element
  spinner.classList.remove('spinner_invisible');
  //add class spinner_visible to the spinner element
  spinner.classList.add('spinner_visible');
}

function hideSpinner() {
  //get element with the id spinner
  const spinner = document.getElementById('spinner');
  //remove class spinner_visible from the spinner element
  spinner.classList.remove('spinner_visible');
  //add class spinner_invisible to the spinner element
  spinner.classList.add('spinner_invisible');
}


