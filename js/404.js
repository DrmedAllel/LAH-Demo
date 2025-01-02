window.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    const language = getCookie('language');

    mainSection.innerHTML = `
        <h1>404 - Page Not Found</h1>
        <p>${language === 'de' ? 'Die Seite, die Sie suchen, konnte nicht gefunden werden.' : 'The page you are looking for could not be found.'}</p>
    ` + mainSection.innerHTML;
});

