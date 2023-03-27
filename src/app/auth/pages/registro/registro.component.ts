import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { emailPattern, nombreApellidoPattern, nopuedeSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern ) ] ],
    // email: ['', [ Validators.required, Validators.email ]] //esta validacion es la de html que no es muy allá
    email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ]],
    username: ['', [ Validators.required, this.vs.nopuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.vs.camposIguales('password', 'password2')]
  }) 

  constructor( private fb: FormBuilder,
               private vs: ValidatorService ) {

  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Jorge Ll',
      email: 'test1@test.com',
      username: 'Mmmaksmds'
    })
  }
  campoNoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
    
  }
}
