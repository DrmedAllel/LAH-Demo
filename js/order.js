function sendEmail() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxUWucC-HIA43zbuhzzM3LVAi_FYCLOcgreBFc60ix0Eutk9UEEE19PEIp9K3qmAyKX-Q/exec";
    fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            to: "privat@claudiuslaur.de, claudius.caspar.laur@gmail.com",
            subject: "Test-E-Mail",
            message: "Das ist eine Test-E-Mail."
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log("Erfolgreich gesendet:", result);
    })
    .catch(error => {
        console.error("Fehler beim Senden der E-Mail:", error);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    sendEmail();
}

function selectPayment(button) {
    const paymentButtons = document.querySelectorAll('.payment_button');
    paymentButtons.forEach(button => button.classList.remove('selected_button'));
    button.classList.add('selected_button');
}

function selectDownload(button) {
    const downloadButtons = document.querySelectorAll('.download_button');
    downloadButtons.forEach(button => button.classList.remove('selected_button'));
    button.classList.add('selected_button');
}