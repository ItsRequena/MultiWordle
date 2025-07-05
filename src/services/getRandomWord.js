import {wordList} from '../mocks/words.json'

// Funcion para generar una palabra de Wordle
export const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    let newWord = wordList[randomIndex];
    if(newWord.includes('ñ')) return newWord;
    newWord = newWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return newWord.toUpperCase();
}
