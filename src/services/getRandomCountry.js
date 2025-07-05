import {countryList} from '../mocks/countries.json'

export function getRandomCountry(){
    const randomIndex = Math.floor(Math.random() * countryList.length)
    let newCountry = countryList[randomIndex];
    if(newCountry.includes('ñ')) return newCountry;
    newCountry = newCountry.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return newCountry.toUpperCase();
}