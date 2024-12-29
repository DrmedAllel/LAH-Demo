document.addEventListener('DOMContentLoaded', function() {
    const mainSection = document.querySelector('main');
    const language = getCookie('language');

    if (language === 'de') {
        mainSection.innerHTML = mainSection.innerHTML + `
            <p class="haftungshinweis">Wir bieten auf unserer Website Links zu anderen Seiten im Internet an.</br></br>
            Für alle diese Links gilt: "Ich betone ausdrücklich, daß ich keinerlei Einfluß auf die Gestaltung und die Inhalte der gelinkten Seiten habe. Deshalb distanziere ich mich hiermit ausdrücklich von allen Inhalten aller gelinkten Seiten auf meiner gesamten Homepage inklusive aller Unterseiten. Diese Erklärung gilt für alle auf meiner Homepage angebrachten Links die nicht zu Daten auf http://www.luftfahrt-archiv-hafner.de führen.
            </p>
        `;
    }
});