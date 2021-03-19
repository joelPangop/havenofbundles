import { Directive } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {

  constructor() { }

  static validate(formGroup: FormGroup): {[key: string]: any} {
    console.log('password', formGroup.get('password').value);
    console.log('confirm password', formGroup.get('passwordConfirm').value);
    return formGroup.get('password').value === formGroup.get('passwordConfirm').value ? null : {passwordMismatch: true};
  }

  validate(c: FormGroup): {[key: string]: any} {
    return PasswordValidatorDirective.validate(c);
  }

}
