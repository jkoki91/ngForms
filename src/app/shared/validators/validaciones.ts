import { FormControl } from "@angular/forms";

// Este archivo al final no lo estamos usando porque estamos usando el servicio

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';//esto dice string(de letras) + espacio + otro string(de letras)
export const emailPattern         : string = '([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$)';//esto dice string(de letras) + espacio + otro string(de letras)


export const nopuedeSerStrider = ( control : FormControl ) => {
    const valor: string = control.value?.trim().toLowerCase();
    console.log( valor );

    if ( valor==='strider'){
      return {
        noStrider: true
      }
    }
    return null;
}