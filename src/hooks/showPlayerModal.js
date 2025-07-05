let inSlide = false;

// Funcion para mostrar modal descendiente
export function showPlayerModal(playerInfo, time) {
        // Crear el modal
        if(inSlide) return
        
        inSlide = true;

        // Fondo oscuro detrás del modal
        const backdrop = document.createElement('div');
        backdrop.id = 'modalBackdrop';
        document.body.appendChild(backdrop);

        const modal = document.createElement('div');
        modal.id = 'slideModal';

        // Nombre Jugador
        const playerName = document.createElement('strong');
        playerName.textContent = playerInfo.name;
        modal.appendChild(playerName);

        // Equipo
        const playerTeam = document.createElement('p');
        playerTeam.textContent = playerInfo.team;
        modal.appendChild(playerTeam);

        // Nacionalidad
        const playerNationalTeam = document.createElement('p');
        playerNationalTeam.textContent = playerInfo.nationalTem;
        modal.appendChild(playerNationalTeam);

        // Fecha nacimiento
        if(playerInfo.img){
            const playerImage = document.createElement('img');
            playerImage.src = playerInfo.img;
            modal.appendChild(playerImage);
        }

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