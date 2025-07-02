import { createContext, useEffect, useState } from "react";
import {wordList} from '../mocks/words.json'
import {getRandomPlayerFromPopularTeams} from '../services/getPlayer.js'

let FILES = 6;
let LETTERS = 5;

export const WordContext = createContext()

export function WordProvider({children}) {

    const [gameType, setGameType] = useState('normal')
    const [finalWord, setFinalWord] = useState('')
    const [usedLetters, setUsedLetters] = useState([])
    const [board, setBoard] = useState(Array.from({ length: FILES }, () => Array(LETTERS).fill([null,''])))
    const [win, setWin] = useState(false);
    const [letters, setLetters] = useState(Array(LETTERS).fill([null,'']))
    const [attempt, setAttempt] = useState(0)

    // Funcion encargada de comenzar el juego dependiendo del modo
    const startGame = async () => {
        console.log('gameype',gameType);
        switch(gameType){
        case 'jugadores':
            let player = await getRandomPlayerFromPopularTeams();
            setFinalWord(player.strPlayer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
            LETTERS = player.strPlayer.split('').length;
            console.log('LONGITUD: ', player.strPlayer.split('').length)
            FILES = 10;
            break;
        case 'normal':
            console.log('aqui');
            let word = generateWord();
            console.log(word);
            setFinalWord(word);
            LETTERS = 5;
            break;
        }
    }
    
    // Funcion para comprobar si ha terminado el juego
    const isOver = () => {
        return win || attempt == FILES;
    }

    // Funcion para resetear la partida
    const resetGame = async () => {
        await startGame();
        setLetters(Array(LETTERS).fill([null,'']));
        setAttempt(0);
        setBoard(Array.from({ length: FILES }, () => Array(LETTERS).fill([null,''])));
        setWin(false);
        setUsedLetters([]);
    }

    // Funcion para generar una palabra de Wordle
    const generateWord = () => {
        const randomIndex = Math.floor(Math.random() * wordList.length)
        let newWord = wordList[randomIndex];
        if(newWord.includes('ñ')) return newWord;
        newWord = newWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return newWord.toUpperCase();
    }

    // Funcion para comparar palabra introducida con la palabra a acertar y devolver la palabra y sus aciertos
    const checkLetterToLetter = (wordArray) => {
        const newWordArray = JSON.parse(JSON.stringify(wordArray)); // copia profunda
        const finalWordArray = finalWord.split('');

        console.log('wordArray', wordArray);
        console.log('newWordArray', newWordArray);
        console.log('finalWordArray', finalWordArray);

        // 1. Contar cuántas veces aparece cada letra en finalWord
        const letterCount = {};
        for (let char of finalWordArray) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }

        // 2. Marcar coincidencias exactas ('G')
        for (let i = 0; i < wordArray.length; i++) {
            const letter = wordArray[i][0];
            if (finalWordArray[i] === letter) {
                newWordArray[i][1] = 'G';
                letterCount[letter]--; // se usó una instancia
            }
        }

        // 3. Marcar coincidencias parciales ('Y') y ausentes ('W')
        for (let i = 0; i < wordArray.length; i++) {
            const letter = wordArray[i][0];
            if (newWordArray[i][1]) continue; // ya marcada como 'G'

            if (letterCount[letter] > 0) {
                newWordArray[i][1] = 'Y';
                letterCount[letter]--;
            } else {
                newWordArray[i][1] = 'W';
            }
        }

        return newWordArray;
    }

    // Funcion para comparar palabra introducida y la palabra a acertar
    const checkWord = (wordArray, attempt) => {

        // Comprobar letras
        const newWordArray = checkLetterToLetter(wordArray);

        // Actualizar tablero
        const newBoard = [...board];
        newBoard[attempt] = newWordArray;
        setBoard(newBoard);

        // Aumentar las letras usadas
        const newLetters = [...new Set([...usedLetters, ...newWordArray])];
        setUsedLetters(newLetters);

        // Comprobar palabra
        const word = newWordArray.map(par => par[0]).join('');
        if(word == finalWord){
            setWin(true);
            return true;
        }

        return false;
    }

    useEffect(() => {
        resetGame();
    },[gameType])

    return (
        <WordContext.Provider value={{
            usedLetters,
            board,
            finalWord,
            win,
            letters,
            attempt,
            setBoard,
            setGameType,
            setLetters,
            setAttempt,
            checkWord,
            resetGame,
            isOver,
            LETTERS,
            FILES
        }}>
            {children}
        </WordContext.Provider>
    )

}