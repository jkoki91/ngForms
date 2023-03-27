import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { emailPattern, nombreApellidoPattern, nopuedeSerStrider } from 'src/app/shared/validators/validaciones'; // de cuando lo cogiamos del otro archivo que no era un servicio
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern ) ] ],
    // email: ['', [ Validators.required, Validators.email ]] //esta validacion es la de html que no es muy allá
    email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.emailValidator ] ],
    username: ['', [ Validators.required, this.vs.nopuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.vs.camposIguales('password', 'password2')]
  }) 

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.['required'] ) {
      return 'Email es obligatorio.';
    } else if( errors?.['pattern']) {
      return 'El valor debe tener formato de email.'
    } else if( errors?.['emailTomado']) {
      return 'El email ya se ha utilizado.'
    }
    return '';

  }  

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService ) {

  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Jorge Ll',
      email: 'test1@test.com',
      username: 'Mmmaksmds',
      password: '123456',
      password2: '123456'
    })
  }
  campoNoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  // emailRequired(){  //ESTOS METODOS SON MUY REPETITIVOS
  //   return this.miFormulario.get('email')?.errors?.['required'] 
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //           && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
    
  }
}
