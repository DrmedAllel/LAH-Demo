const NUMBER_OF_IMAGES = 4;

window.addEventListener('load', function() {
    const flugzeugImg = document.getElementById('flugzeug_img');
    fadeOut(flugzeugImg, 0);
    const randomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
    console.log(randomNumber); // For testing purposes
    flugzeugImg.src = `images/landing_page/landing_page${randomNumber}.png`;
    fadeIn(flugzeugImg, 1000);
});


setInterval(async function() {
    const flugzeugImg = document.getElementById('flugzeug_img');
    let newRandomNumber;
    const currentNumber = parseInt(flugzeugImg.src.match(/\d+(?=\.png$)/)[0]);
    
    

    do {
        newRandomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
    } while (newRandomNumber === currentNumber);
    
    fadeOut(flugzeugImg, 1000);
    
    setTimeout(async () => {
        flugzeugImg.src = `images/landing_page/landing_page${newRandomNumber}.png`;
        await new Promise(resolve => setTimeout(resolve, 750));
        fadeIn(flugzeugImg, 500);
    }, 1000);
}, 10000);

function fadeOut(element, duration) {
    element.style.opacity = 1;
    const step = 10 / duration;
    
    const timer = setInterval(() => {
        if (element.style.opacity > 0) {
            element.style.opacity -= step;
        } else {
            element.style.opacity = 0;
            clearInterval(timer);
        }
    }, 10);
}

function fadeIn(element, duration) {
    element.style.opacity = 0;
    const step = 10 / duration;
    
    const timer = setInterval(() => {
        if (element.style.opacity < 1) {
            element.style.opacity = parseFloat(element.style.opacity) + step;
        } else {
            element.style.opacity = 1;
            clearInterval(timer);
        }
    }, 10);
}