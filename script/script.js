const anserBlock = document.querySelector('.answer');

const getUserCountry = async function () {
    let userPosition = await getUserPosition();
    let {latitude: lt, longitude: ln} = userPosition.coords;
    let responsePosition = await fetch(`https://geocode.xyz/${lt},${ln}?geoit=json`);
    let dataPosition = await responsePosition.json();
    let responseCounry = await fetch(`https://restcountries.com/v3.1/name/${dataPosition.country.toLowerCase()}`);
    let dataCountry = await responseCounry.json();
    console.log(dataCountry);
    anserBlock.innerHTML =  dataCountry[0].altSpellings[0];
}

const getUserPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getUserCountry();