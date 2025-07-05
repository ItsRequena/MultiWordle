import {getCountryImage} from '../services/getCountryImage.js'

let inSlide = false;

// Funcion para mostrar modal descendiente
export function showCountryModal(country, time) {
        // Crear el modal
        if(inSlide) return
        
        inSlide = true;

        // Fondo oscuro detrás del modal
        const backdrop = document.createElement('div');
        backdrop.id = 'modalBackdrop';
        document.body.appendChild(backdrop);

        const modal = document.createElement('div');
        modal.id = 'slideModal';

        // Nombre Pais
        const countryName = document.createElement('strong');
        countryName.textContent = country;
        modal.appendChild(countryName);

        // Imagen
        const countryImage = document.createElement('img');
        var img = getCountryImage(country)
        countryImage.src = img;
        modal.appendChild(countryImage);

        document.body.appendChild(modal);
        void modal.offsetWidth; // Fuerza reflow
        modal.classList.add('show');

        // Esperar 2 segundos y luego desvanecer
        setTimeout(() => {
            modal.classList.add('fadeOut');
            backdrop.style.opacity = '0';
            inSlide = false;
        }, time);

        // Eliminar del DOM después de que termine la transición (1s después del fade)
        setTimeout(() => {
            modal.remove();
            backdrop.remove();
        }, time + 1000);
    }