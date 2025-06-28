import './App.css'
import { useEffect, useState } from 'react'

const FollowMouse = () => {

    const [enable, setEnable] = useState(false)
    const [position, setPosition] = useState({ x: 0, y:0 }) 

    useEffect(() => {

        const handleMoove = (event) => {
            const { clientX, clientY } = event
            setPosition({x : clientX, y: clientY})
        }

        if(enable){
            window.addEventListener('pointermove', handleMoove)
        }

        return () => {
            window.removeEventListener('pointermove', handleMoove)
        }

    }, [enable])

    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #fff',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -25,
                top: -25,
                width: 50,
                height: 50,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}>

            </div>
            <button onClick={() => setEnable(!enable)}>
                {enable ? 'Desactivar' : 'Activar'} seguir puntero
            </button>
        </>
    )
}

export function App(){
    return (
    <main>
        <FollowMouse></FollowMouse>
    </main>
    )
}