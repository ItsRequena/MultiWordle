import { useEffect, useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import './ContentBox.css'
import confetti from 'canvas-confetti'
import {getCellColorClass} from '../hooks/getCellColorClass.js'
import {showSlideModal} from '../hooks/showSlideModal.js'
import {getLetterPositionToInsert} from '../hooks/getLetterPositionToInsert.js'
import {shakeWrapperBox} from '../hooks/shakeWrapperBox.js'

export function ContentBody(){
    const {board, checkWord, finalWord, win, letters, setLetters, attempt, setAttempt, LETTERS, FILES} = useContext(WordContext)

    // Funcion para obtener devolver el color a pintar de cada celda
    const getColorCell = (i, j) => {
        let cell = '';
        if (i < attempt) {
            cell = board[i][j][1];
        }
        return getCellColorClass(cell)
    }

    // Efecto para pintar el recuadro de la letra a insertar
    useEffect(() => {
        if(win || attempt == FILES) return;
        const boxes = document.querySelectorAll(`.wrapperBox.wrapperBox-${attempt} .contentBox`);
        const position = getLetterPositionToInsert(letters, LETTERS);
        if (boxes[position]) { 
            boxes[position].style.border = '2px solid rgb(144, 202, 249)';
        }

        for(let i=0; i<LETTERS; i++){
            if(i != position) boxes[i].style.border = '2px solid #444';
        }
    }, [letters])

    // Efecto para contemplar cualquier accion realizada con el teclado
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(win) return;

            const positionToInsert = getLetterPositionToInsert(letters, LETTERS)
            if (event.key === 'Backspace') {

                if(positionToInsert == 0) return;

                const newLetters = [...letters];
                newLetters[positionToInsert-1][0] = null;
                setLetters(newLetters);
                return;
            }

            if (event.key === 'Enter') {

                if(positionToInsert != LETTERS ){

                    showSlideModal('Palabra incompleta', 2000)
                    shakeWrapperBox(attempt)
                    return;
                }

                const goal = checkWord(letters, attempt);
                if(goal){
                    confetti({
                        particleCount: 300,
                        spread: 100,
                        origin: { y: 0.5 }
                    });

                    showSlideModal(`Enhorabuena!`, 5000)

                }

                if(!goal && attempt+1 == FILES){
                    showSlideModal(`${finalWord}`, 5000)
                }

                // Actualizar valores del nuevo intento
                setLetters(Array(LETTERS).fill([null,'']));
                setAttempt(attempt + 1);
            }   

            if (event.repeat || !/^[a-zA-ZñÑ]$/.test(event.key) || positionToInsert == LETTERS) 
            {
                return;
            }

            const newLetters = [...letters];
            newLetters[positionToInsert] = [event.key.toUpperCase(),''];
            setLetters(newLetters);
        }

        document.addEventListener('keydown', handleKeyDown)

        // Cleanup al desmontar
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [attempt, letters])


    return (
        <>
        <div className='contentBackground'>
            { 
                Array.from({length: FILES},(_,i) => (
                    <div key={i} className={`wrapperBox wrapperBox-${i}`}>
                        {
                            Array.from({length: LETTERS},(_,j) => (
                                <div 
                                    key={`${i}-${j}`} 
                                    className={`contentBox ${getColorCell(i, j)}`}>
                                    <p >
                                        { i == attempt ? letters[j] : board[i][j][0]}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
        </>
    )
}