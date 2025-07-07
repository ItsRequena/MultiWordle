import {youtubers} from '../mocks/youtubers.json'

// Funcion para generar una palabra de Wordle
export const getRandomYoutuber = () => {
    const randomIndex = Math.floor(Math.random() * youtubers.length)
    let newYoutuber = youtubers[randomIndex];
    newYoutuber = newYoutuber.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return newYoutuber.toUpperCase();
}
