import { useContext } from 'react'
import { WordContext } from "../context/words.jsx"
import './ResetGame.css'

export function ResetGame(){
    const {resetGame, isOver} = useContext(WordContext)

    return(
        <>
        {
        isOver() && 
        <div className="flip-container">
            <div className="flip-card">
                <div className="flip-card-front" onClick={() => resetGame()}>Reiniciar</div>
                <div className="flip-card-back" onClick={() => resetGame()}>Reiniciar</div>
            </div>
        </div>
        }
        </>
    )
}