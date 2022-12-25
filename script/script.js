const anserBlock = document.querySelector('.answer');
const img = document.querySelector('img');

const getUserCountry = async function () {
    try {
        let userPosition = await getUserPosition();
        let { latitude: lt, longitude: ln } = userPosition.coords;
        let responsePosition = await fetch(`https://geocode.xyz/${lt},${ln}?geoit=json`);
        let dataPosition = await responsePosition.json();
        let responseCounry = await fetch(`https://restcountries.com/v3.1/name/${dataPosition.country.toLowerCase()}`);
        let dataCountry = await responseCounry.json();
        img.setAttribute('src', dataCountry[0].flags.svg)
        anserBlock.innerHTML = dataCountry[0].altSpellings[0];
    } catch(e) {
        anserBlock.innerHTML = 'Что-то пошло не так';
    }
}

const getUserPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getUserCountry();