import { createContext, useEffect, useState } from "react";

import { getRandomCountry } from "../services/getRandomCountry.js";
import {getRandomPlayer} from '../services/getRandomPlayer.js'
import {getRandomWord} from '../services/getRandomWord.js'
import {priorityColor} from '../hooks/priorityColor.js'

import {showSlideModal} from '../hooks/showSlideModal.js'
import {showPlayerModal} from '../hooks/showPlayerModal.js'
import {showCountryModal} from '../hooks/showCountryModal.js'

import confetti from 'canvas-confetti'

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

    const [playerInfo, setPlayerInfo] = useState({
        name: '',
        team: '',
        nationalTem: '',
        dateBorn: '',
        img: ''
    })
    const [countryInfo, setCountryInfo] = useState({
        name: '',
        code: ''
    })

    // Funcion encargada de comenzar el juego dependiendo del modo
    const startGame = async () => {

        switch(gameType){
            case 'normal':
                let word = getRandomWord();
                setFinalWord(word);
                LETTERS = 5;
                break;
            case 'paises':
                const country = getRandomCountry();
                setFinalWord(country.nombre);
                LETTERS = country.nombre.split('').length;
                setCountryInfo({
                    name: country.nombre,
                    code: country.codigo.toLowerCase()
                });
                break;
            case 'jugadores':
                let player = await getRandomPlayer();
                let playerName = player.strPlayer;
                if(playerName.includes(' ')){
                    let checkPlayerName = playerName.split(' ')[1];
                    if(checkPlayerName.includes('-') || checkPlayerName.length < 3) checkPlayerName = playerName.split(' ')[0]
                    playerName = checkPlayerName;
                }

                setFinalWord(playerName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
                setPlayerInfo({
                    name: player.strPlayer,
                    team: player.strTeam,
                    nationalTem: player.strNationality,
                    dateBorn: player.dateBorn,
                    img: player.strCutout ?? player.strThumb
                });

                LETTERS = playerName.split('').length;
                break;
        }
    }
    
    // Funcion para comprobar si ha terminado el juego
    const isOver = () => {
        return win || attempt == FILES;
    }

    // Funcion para comprobar el intento
    const checkNewTry = () => {
        const goal = checkWord(letters, attempt);
        if(goal){
            confetti({
                particleCount: 300,
                spread: 100,
                origin: { y: 0.5 }
            });

        }

        if(goal || attempt+1 == FILES){
            showModalGame(goal)
        }
    }

    // Funcion para mostrar modal segun modo de juego
    const showModalGame = (goal) => {
        switch(gameType){
            case 'normal':
                if(goal) showSlideModal(`Enhorabuena!`, 3000)
                else showSlideModal(`${finalWord}`, 3000)
                break;
            case 'jugadores':
                showPlayerModal(playerInfo, 3000)
                break;
            case 'paises':
                showCountryModal(countryInfo, 3000);
                break;
        }
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

    // Funcion privada para comparar palabra introducida y la palabra a acertar
    const checkWord = (wordArray, attempt) => {

        // Comprobar letras
        const newWordArray = checkLetterToLetter(wordArray);

        // Actualizar tablero
        const newBoard = [...board];
        newBoard[attempt] = newWordArray;
        setBoard(newBoard);

        // Aumentar las letras usadas
        updateNewLettersUsed(newWordArray);

        // Comprobar palabra
        const word = newWordArray.map(par => par[0]).join('');
        if(word == finalWord){
            setWin(true);
            return true;
        }

        return false;
    }

    // Funcion privada 
    const updateNewLettersUsed = (newWordArray) => {
        let copyUsedLetters = usedLetters
        let newLetters = [];
        let exist = false;
        let color = ''
        let index = 0
        let item = [];

        newWordArray.forEach(letter => {
            usedLetters.forEach(usedLetter => {
                // Comprobar si ya existe la letra pero tiene otro color
                if(usedLetter[0] == letter[0]){
                    exist = true;
                    if(usedLetter[1] != letter[1]){
                        color = priorityColor(usedLetter[1], letter[1]);
                        index = copyUsedLetters.indexOf(usedLetter);
                        copyUsedLetters[index] = [usedLetter[0],color]; 
                    }
                }
            });

            if(!exist){
                item = newLetters.find(item => item[0] == letter[0]);
                if(item == null){
                    newLetters.push(letter);
                }
                else{
                    color = priorityColor(item[1], letter[1]);
                    if(item != null && color != item[1]){
                        newLetters.push(letter);
                    }
                }
            }

            exist = false;
        });

        const newLettersToUpdate = [...new Set([...copyUsedLetters, ...newLetters])];
        setUsedLetters(newLettersToUpdate);
    }

    // Funcion privada para comparar palabra introducida con la palabra a acertar y devolver la palabra y sus aciertos
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
            gameType,
            setBoard,
            setGameType,
            setLetters,
            setAttempt,
            checkWord,
            resetGame,
            isOver,
            checkNewTry,
            LETTERS,
            FILES
        }}>
            {children}
        </WordContext.Provider>
    )

}