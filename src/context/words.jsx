import { createContext, useEffect, useState } from "react";
import {wordList} from '../mocks/words.json'

export const WordContext = createContext()

export function WordProvider({children}) {
    const [finalWord, setFinalWord] = useState('')
    const [usedLetters, setUsedLetters] = useState([])
    const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(5).fill([null,''])))
    const [win, setWin] = useState(false);

    const quitarAcentos = (word) => {
        if(word.includes('ñ')) return word;
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * wordList.length)
        setFinalWord(quitarAcentos(wordList[randomIndex]).toUpperCase())
    },[])

    const checkLetterToLetter = (wordArray) => {
        const newWordArray = JSON.parse(JSON.stringify(wordArray)); // copia profunda
        const finalWordArray = finalWord.split('');

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

    return (
        <WordContext.Provider value={{
            usedLetters,
            board,
            checkWord,
            finalWord,
            win
        }}>
            {children}
        </WordContext.Provider>
    )

}