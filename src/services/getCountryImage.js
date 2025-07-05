export async function getCountryImage(country){
    const res = await fetch($`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    console.log('data',data)
    console.log('data-falgs',data.flags)
    const countryImg = data.flags.png;
    return countryImg;
}