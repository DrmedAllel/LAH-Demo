document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
          <h1><a href="/index.html" title="Startseite">Luftfahrt-Archiv Hafner</a></h1>
          <p>1990-2024</p>
          <nav>
            <div class="dropdown">
            <h2 class="title">Flugzeuge</h2>
            <ul class="submenu">
              <a href="/Flugzeuge/arado.html">Arado</a>
              <a href="/Flugzeuge/ago.html">AGO</a>
              <a href="/Flugzeuge/blohm_voss.html">Blohm & Voss</a>
              <a href="/Flugzeuge/bücker.html">Bücker</a>
              <a href="/Flugzeuge/dfs.html">DFS</a>
              <a href="/Flugzeuge/dornier.html">Dornier</a>
              <a href="/Flugzeuge/erla.html">Erla</a>
              <a href="/Flugzeuge/fieseler.html">Fieseler</a>
              <a href="/Flugzeuge/focke-achgelis.html">Focke-Achgelis</a>
              <a href="/Flugzeuge/focke_wulf.html">Focke Wulf</a>
              <a href="/Flugzeuge/gotha.html">Gotha</a>
              <a href="/Flugzeuge/heinkel.html">Heinkel</a>
              <a href="/Flugzeuge/henschel.html">Henschel</a>
              <a href="/Flugzeuge/junkers.html">Junkers</a>
              <a href="/Flugzeuge/klemm.html">Klemm</a>
              <a href="/Flugzeuge/messerschmitt.html">Messerschmitt</a>
              <a href="/Flugzeuge/segelflugzeuge.html">Segelflugzeuge</a>
              <a href="/Flugzeuge/siebel.html">Siebel</a>
            </ul>
            </div>

            <div class="dropdown">
            <h2 class="title">Motoren & Luftschrauben</h2>
            <ul class="submenu">
              <a href="/Motoren/argus.html">Argus</a>
              <a href="/Motoren/bmw.html">BMW</a>
              <a href="/Motoren/daimler_benz.html">Daimler Benz</a>
              <a href="/Motoren/gnome_rhone.html">Gnome Rhone</a>
              <a href="/Motoren/hirth.html">Hirth</a>
              <a href="/Motoren/jumo.html">JUMO</a>
              <a href="/Motoren/oberursel.html">Oberursel</a>
              <a href="/Motoren/salmson.html">Salmson</a>
              <a href="/Motoren/siemens_bramo.html">Siemens - BRAMO</a>
              <a href="/Motoren/vdm.html">VDM</a>
              <a href="/Motoren/vergaser_einspritzanlagen.html">Vergaser und Einspritzanlagen</a>
              <a href="/Motoren/walter_motoren.html">Walter Motoren</a>
              <a href="/Motoren/walter_hwk.html">Walter HWK</a>
              <a href="/Motoren/zuendapp.html">Zuendapp</a>
            </ul>
            </div>

            <div class="dropdown">
            <a class="title" href="/flugzeug_bewaffnung.html">Flugzeug-Bewaffnung</a>
            </div>

            <div class="dropdown">
            <a class="title" href="/flugzeug_ausruestung.html">Flugzeug-Ausrüstung</a>
            </div>

            <div class="dropdown">
            <a class="title cart_link" href="/warenkorb.html">Warenkorb</a>
            </div>

          </nav>
            `;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
    <p>Luftfahrt-Archiv Hafner, Udo Hafner, 1990-2024</p>
    <a href="agb.html">AGB</a> 
    <a href="links.html">Links</a> 
    <a href="about.html">Wir über uns</a>
    <a href="impressum.html">Impressum</a>
        `;
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
  document.cookie = name + '=; Max-Age=-99999999; path=/;';
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
      if (c.trim().startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
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
      <p>Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten. Durch die weitere Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.</p>
      <button onclick="acceptCookies()">Zustimmen</button>
      `;
      document.body.appendChild(cookieBanner);
      
      // Trigger the animation after a small delay to ensure the transition works
      setTimeout(() => {
          cookieBanner.style.transform = 'translateY(0)';
      }, 700);

      //with the next click on the page add the acceptCookies cookie
      document.addEventListener('click', function() {
          setCookie('acceptCookies', 'true', 365);
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



