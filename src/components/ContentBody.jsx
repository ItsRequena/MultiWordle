import { useEffect, useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import './ContentBox.css'
import {getCellColorClass} from '../hooks/getCellColorClass.js'
import {showSlideModal} from '../hooks/showSlideModal.js'
import {getLetterPositionToInsert} from '../hooks/getLetterPositionToInsert.js'
import {shakeWrapperBox} from '../hooks/shakeWrapperBox.js'

export function ContentBody(){
    const {board, win, letters, setLetters, attempt, setAttempt, checkNewTry, LETTERS, FILES} = useContext(WordContext)

    // Funcion para obtener devolver el color a pintar de cada celda
    const getColorCell = (i, j) => {
        let cell = '';
        if (i < attempt && board[i][j] != null) {
            cell = board[i][j][1];
        }
        return getCellColorClass(cell)
    }

    // Efecto para pintar el recuadro de la letra a insertar
    useEffect(() => {
        //Limpieza de los marcos de las letras
        if(attempt == 0){
            for(let i=0; i<FILES; i++){
                const boxes = document.querySelectorAll(`.wrapperBox.wrapperBox-${i} .contentBox`);
                for(let j=0; j<LETTERS; j++){
                    boxes[j].style.border = '2px solid #444';
                }
            }
        }

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
            console.log(positionToInsert)
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

                // Comprobar intento
                checkNewTry();

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
                                        { i == attempt ? letters[j] : (board[i][j] != null ? board[i][j][0] : '')}
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