let inSlide = false;

// Funcion para mostrar modal descendiente
export function showSlideModal(message, time) {
        // Crear el modal
        if(inSlide) return
        
        inSlide = true;
        const modal = document.createElement('div');
        modal.id = 'slideModal';
        modal.textContent = message;
        document.body.appendChild(modal);

        // Forzar reflow para que la transición se aplique
        void modal.offsetWidth;

        // Activar clase que desliza
        modal.classList.add('show');

        // Esperar 2 segundos y luego desvanecer
        setTimeout(() => {
            modal.classList.add('fadeOut');
            inSlide = false;
        }, time);

        // Eliminar del DOM después de que termine la transición (1s después del fade)
        setTimeout(() => {
            modal.remove();
        }, time + 1000);
    }