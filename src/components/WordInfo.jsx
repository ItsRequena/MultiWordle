import {Lines} from '../mocks/letters.json'
import './WordInfo.css'

export function WordInfo(){

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
                                className='contentBox'>
                                <p className='letterInBox'>{letter}</p>
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