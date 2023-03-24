import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required ],
    notificaciones: [true, Validators.required ],
    condiciones: [false, Validators.requiredTrue ]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor( private fb: FormBuilder ) {

  }

  ngOnInit(): void {
    // this.miFormulario.setValue( this.persona ); // con esto había que añadir el campo condiciones en persona
    // this.miFormulario.reset( this.persona );
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });

    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => { //esto es para observar solo los cambios de condiciones
    //   console.log(newValue);
    // })

    this.miFormulario.valueChanges.subscribe( ({condidiones, ...rest}) => {
      // delete form.condiciones; //esto es cuando no habíamos desestructurado el objeto
      this.persona = rest;
    })
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };
    delete formValue.condiciones;

    this.persona = formValue;
    
  }
}
