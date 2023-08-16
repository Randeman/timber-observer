import { FormGroup, ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
  password: string,
  rePassword: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const passControl = group.get(password);
    const rePassControl = group.get(rePassword);
       
    return passControl?.value === rePassControl?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}