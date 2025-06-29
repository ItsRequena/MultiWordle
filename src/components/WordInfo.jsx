import { useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import {Lines} from '../mocks/letters.json'
import './WordInfo.css'
import {getCellColorClass} from '../hooks/getCellColorClass.js'

export function WordInfo(){

    const {usedLetters} = useContext(WordContext)

    const getPaintLetter = (letter) => {
        let color = ''
        for(let i=0; i<usedLetters.length; i++){
            if(usedLetters[i][0] == letter){
                color = priorityColor(color,usedLetters[i][1]);
            }
        }

        return getCellColorClass(color);
    }

    const priorityColor = (color, letterColor) => {
        if(color == '') return letterColor
        if(color == 'G') return color
        if(color == 'Y' && letterColor == 'G') return letterColor
        if(color == 'W' && letterColor != '') return letterColor
        return letterColor
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
                                className={`letterBox ${getPaintLetter(letter.toUpperCase())}`}>
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