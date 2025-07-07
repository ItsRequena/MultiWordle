// Funcion para comprobar prioridad de colores
export function priorityColor(color, letterColor) {
    if(color == '') return letterColor
    if(color == 'G') return color
    if(color == 'Y' && letterColor == 'G') return letterColor
    if(color == 'Y' && letterColor == 'W') return color
    if(color == 'W' && letterColor == 'Y') return letterColor
    if(color == 'W' && letterColor != '') return letterColor
    return letterColor
}