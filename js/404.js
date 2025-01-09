window.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    const language = getCookie('language');

    mainSection.innerHTML = `
        <h1>404 - Page Not Found</h1>
        <p>${language === 'de' ? 'Die Seite, die Sie suchen, konnte nicht gefunden werden.' : 'The page you are looking for could not be found.'}</p>
        <button id='back_to_shop' class='button' onclick="window.location.href='index.html'">${language === 'de' ? 'Zurück zur Startseite' : 'Back to Homepage'}</button>
    ` + mainSection.innerHTML;
});

