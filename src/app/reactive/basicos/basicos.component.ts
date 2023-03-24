import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre'     : new FormControl('RTX401'),
  //   'precio'     : new FormControl(12),
  //   'existencias': new FormControl(3)
  // })

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ] ],
    precio: [ , [ Validators.required, Validators.min(0) ] ],
    existencias: [ , [ Validators.required, Validators.min(0) ] ],
  }) 

  constructor( private fb: FormBuilder ) {

  }

  ngOnInit(): void {
    // this.miFormulario.setValue({ //ESTO NO SE USA PORQUE OBLIGA A MANDAR TODOS LOS CAMPOS
    //   nombre: 'RTX2123',
    //   precio: 1600,
    //   existencias: 32
    // })
    this.miFormulario.reset({
      nombre: 'RTX2123',
      precio: 1600,
      existencias: 32
    })
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar() {

    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched()
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();

  }
}
