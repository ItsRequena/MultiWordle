import { useState, useContext } from 'react';
import './Menu.css'; // CSS externo para mantener ordenado
import { WordContext } from '../context/words';

export function Menu() {

  const {setGameType, resetGame} = useContext(WordContext)

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => { setIsOpen(!isOpen);}

  const openGame = async (game) => {
    setGameType(game);
    toggleMenu();
  }

  const openGithub = (game) => {
    window.open("https://github.com/ItsRequena");
  }

  return (
    <>
      <div
        className="menu-toggle"
        onClick={toggleMenu}
        style={{ cursor: 'pointer' }}
      >
        {isOpen ? '✖' : '☰'}
      </div>

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
            <ul>
                <li><h4 className='blocked' href="#">Creado por</h4></li>
                <li>
                    <a href="#" onClick={() => openGithub()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.371 0 0 5.373 0 12c0 5.301 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577
                        0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
                        1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.333-5.466-5.931
                        0-1.31.469-2.381 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404
                        1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.873.119 3.176.77.84
                        1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293
                        0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>

                        ItsRequena
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </>
  );
}
