import {countryList} from '../mocks/countries.json'

export function getRandomCountry(){
    const randomIndex = Math.floor(Math.random() * countryList.length)
    let country = countryList[randomIndex];
    country.nombre = country.nombre.toUpperCase();
    if(country.nombre.includes('ñ')) return country;
    country.nombre = country.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return country;
}