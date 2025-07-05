    // Funcion para obtener la posicion actual para insertar
    export function getLetterPositionToInsert (letters, LETTERS) {
        console.log(letters)
        for(let i=0; i<letters.length; i++){
            if(letters[i][0] == null){
                return i;
            }
        }
        return LETTERS;
    }