import { useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import {Lines} from '../mocks/letters.json'
import './WordInfo.css'
import {getCellColorClass} from '../hooks/getCellColorClass.js'
import {priorityColor} from '../hooks/priorityColor.js'
import {getLetterPositionToInsert} from '../hooks/getLetterPositionToInsert.js'
import {shakeWrapperBox} from '../hooks/shakeWrapperBox.js'
import {showSlideModal} from '../hooks/showSlideModal.js'

export function WordInfo(){

    const {usedLetters, checkWord, finalWord, win, letters, setLetters, attempt, setAttempt, LETTERS, FILES} = useContext(WordContext)

    const getPaintLetter = (letter) => {
        let color = ''
        for(let i=0; i<usedLetters.length; i++){
            if(usedLetters[i][0] == letter){
                color = priorityColor(color,usedLetters[i][1]);
            }
        }

        return getCellColorClass(color);
    }

    const pressLeter = (letter) => {

        if(win) return;

        const positionToInsert = getLetterPositionToInsert(letters, LETTERS)
        if (letter === '✕') {

            if(positionToInsert == 0) return;

            const newLetters = [...letters];
            newLetters[positionToInsert-1][0] = null;
            setLetters(newLetters);
            return;
        }

        if (letter === '✓') {

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
            }

            if(!goal && attempt+1 == FILES){
                showSlideModal(`${finalWord}`, 5000)
            }

            // Actualizar valores del nuevo intento
            setLetters(Array(LETTERS).fill([null,'']));
            setAttempt(attempt + 1);
        }   

        if (positionToInsert == LETTERS) 
        {
            return;
        }

        const newLetters = [...letters];
        newLetters[positionToInsert] = [letter.toUpperCase(),''];
        setLetters(newLetters);
    }

    return(
        <>
        <div className='contentBackground'>
            {
                Lines.map(line => (
                    <div key={line}
                    className='wrapperBox'>
                    {
                        line.map(letter => (
                            <div 
                                key={letter} 
                                className={`letterBox ${getPaintLetter(letter.toUpperCase())}`}
                                onClick={() => {pressLeter(letter.toUpperCase())}}>
                                <p>{letter.toUpperCase()}</p>
                            </div>
                        ))
                        
                    }
                    <br></br>
                    </div>
                ))
            }
        </div>
        </>
    )
}