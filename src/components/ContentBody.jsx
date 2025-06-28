import { useEffect, useState, useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import './ContentBox.css'
import confetti from 'canvas-confetti';

export function ContentBody(){
    const {board, checkWord} = useContext(WordContext)
    const [letters, setLetters] = useState(Array(5).fill([null,'']))
    const [attempt, setAttempt] = useState(0)
    
    // console.log('CONTENIDO EN CONTENTBODY')
    // console.log('Board:',board)
    // console.log('Attempt:',attempt)
    // console.log('Letters:',letters)
    // console.log('Longitud letters:',letters.length)

    const getLetterPositionToInsert = () => {
        for(let i=0; i<letters.length; i++){
            if(letters[i][0] == null){
                return i;
            }
        }
        return null;
    }

    const getCellColorClass = (i, j) => {
        if (i < attempt) {
            const cell = board[i][j][1];
            if (cell === 'W') return 'white';  
            if (cell === 'G') return 'green';  
            if (cell === 'Y') return 'yellow';
        }
        return '';
    }

    useEffect(() => {

        const handleKeyDown = (event) => {
            console.log('Tecla presionada:', event.key);
            const positionToInsert = getLetterPositionToInsert()

            if (event.key === 'Backspace') {
                console.log('Se presionó Backspace');

                if(positionToInsert == 0) return;

                const newLetters = [...letters];
                newLetters[positionToInsert-1][0] = null;
                setLetters(newLetters);
                return;
            }

            if (event.key === 'Enter') {
                console.log('Se presionó Enter');

                if(positionToInsert != null ){
                    return;
                }

                const goal = checkWord(letters, attempt);
                if(goal){
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }

                // Actualizar valores del nuevo intento
                setLetters(Array(5).fill([null,'']));
                setAttempt(attempt + 1);
            }   

            if (event.repeat || !/^[a-zA-Z]$/.test(event.key) || positionToInsert == null ) 
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
                Array.from({length: 6},(_,i) => (
                    <div key={i} className='wrapperBox'>
                        {
                            Array.from({length: 5},(_,j) => (
                                <div 
                                    key={`${i}-${j}`} 
                                    className={`contentBox ${getCellColorClass(i, j)}`}>
                                    <p >
                                        { i == attempt ? letters[j] : board[i][j][0]}
                                        {/* { i == attempt ? 'L' : 'B'} */}
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