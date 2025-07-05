import { useState, useContext } from 'react';
import './Menu.css'; // CSS externo para mantener ordenado
import { WordContext } from '../context/words';

export function Menu() {

  const {setGameType, resetGame} = useContext(WordContext)

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const openGame = async (game) => {

    switch(game){
      case 'normal':
        console.log(game)
        break;
      case 'paises':
        console.log(game)
        break;
      case 'jugadores':
        console.log(game)
        break;
    }

    setGameType(game);
    toggleMenu();
  }

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <h3 className='menu-title'>Wordle</h3>
        <div className='contentOptions'>
            <ul>
                <li><h4 className='blocked' href="#">Modos de Juego</h4></li>
                <li>
                    <a href="#" onClick={() => openGame('normal')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid2x2 size-4">
                            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                            <path d="M3 12h18"></path>
                            <path d="M12 3v18"></path>
                        </svg>
                        Normal
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => openGame('paises')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe size-4">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" x2="22" y1="12" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Paises
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => openGame('jugadores')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tshirt size-4">
                        <path d="M4 4L8 2l4 2 4-2 4 2v3a2 2 0 0 1-2 2h-1v11H7V9H6a2 2 0 0 1-2-2V4z" />
                        </svg>
                        Jugadores
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </>
  );
}
