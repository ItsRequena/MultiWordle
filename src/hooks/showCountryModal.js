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
        countryName.textContent = country.name;
        modal.appendChild(countryName);

        // Espacio
        const space = document.createElement('br');
        modal.appendChild(space);

        // Imagen
        const countryImage = document.createElement('img');
        countryImage.src = `https://flagcdn.com/w320/${country.code}.png`;
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