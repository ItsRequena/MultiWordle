import { useEffect, useState, useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import './ContentBox.css'
import confetti from 'canvas-confetti'
import {getCellColorClass} from '../hooks/getCellColorClass.js'

const FILES = 6;
const LETTERS = 5;

export function ContentBody(){
    const {board, checkWord, finalWord, win} = useContext(WordContext)
    const [letters, setLetters] = useState(Array(LETTERS).fill([null,'']))
    const [attempt, setAttempt] = useState(0)

    const getLetterPositionToInsert = () => {
        for(let i=0; i<letters.length; i++){
            if(letters[i][0] == null){
                return i;
            }
        }
        return LETTERS;
    }

    const getColorCell = (i, j) => {
        let cell = '';
        if (i < attempt) {
            cell = board[i][j][1];
        }
        return getCellColorClass(cell)
    }

    const showSlideModal = (message, time) => {
        // Crear el modal
        const modal = document.createElement('div');
        modal.id = 'slideModal';
        modal.textContent = message;
        document.body.appendChild(modal);

        // Forzar reflow para que la transición se aplique
        void modal.offsetWidth;

        // Activar clase que desliza
        modal.classList.add('show');

        // Esperar 2 segundos y luego desvanecer
        setTimeout(() => {
        modal.classList.add('fadeOut');
        }, time);

        // Eliminar del DOM después de que termine la transición (1s después del fade)
        setTimeout(() => {
        modal.remove();
        }, time + 1000);
    }

    const shakeWrapperBox = () => {
        const element = document.querySelector(`.wrapperBox-${attempt}`);
        if (!element) return;

        element.classList.add('shake');

        // Eliminar la clase después de la animación para que se pueda reutilizar
        setTimeout(() => {
        element.classList.remove('shake');
        }, 500); // Duración de la animación (debe coincidir con el CSS)
    }

    useEffect(() => {
        if(win) return;
        const boxes = document.querySelectorAll(`.wrapperBox.wrapperBox-${attempt} .contentBox`);
        const position = getLetterPositionToInsert();
        if (boxes[position]) { 
            boxes[position].style.border = '2px solid rgb(144, 202, 249)';
        }

        for(let i=0; i<LETTERS; i++){
            if(i != position) boxes[i].style.border = '2px solid #444';
        }
    }, [letters])

    useEffect(() => {

        const handleKeyDown = (event) => {

            if(win) return;

            const positionToInsert = getLetterPositionToInsert()

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
                    shakeWrapperBox()
                    return;
                }

                const goal = checkWord(letters, attempt);
                if(goal){
                    confetti({
                        particleCount: 300,
                        spread: 100,
                        origin: { y: 0.5 }
                    });
                }

                if(!goal && attempt+1 == FILES){
                    showSlideModal(`${finalWord}`, 5000)
                }

                // Actualizar valores del nuevo intento
                setLetters(Array(LETTERS).fill([null,'']));
                setAttempt(attempt + 1);
            }   

            if (event.repeat || !/^[a-zA-Z]$/.test(event.key) || positionToInsert == LETTERS) 
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