import { useState } from 'react';
import './Menu.css'; // CSS externo para mantener ordenado

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
                    <a href="#">
                        Normal
                    </a>
                </li>
                <li>
                    <a href="#">
                        {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
                            <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                        </svg> */}
                        Paises
                    </a>
                </li>
                <li>
                    <a href="#">
                        {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
                            <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                            <path d="M6 12h12M12 6v12" stroke="black" strokeWidth="2" />
                        </svg> */}
                        Jugadores
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </>
  );
}
