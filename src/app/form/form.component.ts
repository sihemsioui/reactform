import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  
  myForm: FormGroup; 

constructor( ) { }

ngOnInit() {
  this.myForm=new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.minLength(8),
      Validators.required,
      this.patternValidator(/\d/, { hasNumber: true }),
      this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      this.patternValidator(/[a-z]/, { hasSmallCase: true }),
      this.patternValidator(/[[!@#$%^&*()_+-=[{};':"|,.<>]/, { hasSpecialCharacters: true }),
    ])
  });

}

submitForm() {
  console.log(this.myForm.value)
}
 patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
  
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
  
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  
}

}
