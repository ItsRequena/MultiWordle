// Funcion para hacer efectos de agitar cuando falta letras por introducir
export function shakeWrapperBox(attempt) {
        const element = document.querySelector(`.wrapperBox-${attempt}`);
        if (!element) return;

        element.classList.add('shake');

        setTimeout(() => {
        element.classList.remove('shake');
        }, 500); 
    }