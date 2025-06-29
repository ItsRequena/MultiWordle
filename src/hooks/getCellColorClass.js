// Funcion para dada la incial del color devolver el color
export function getCellColorClass(cell){
    if (cell === 'W') return 'white';  
    if (cell === 'G') return 'green';  
    if (cell === 'Y') return 'yellow';
    return '';
}
