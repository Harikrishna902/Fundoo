import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(CC: AbstractControl) {
        let password = CC.get(' password').value;
        if(CC.get('confirm').touched || CC.get('confirm').dirty) {
            let verifyPassword = CC.get('confirm').value;

            if(password != verifyPassword) {
                CC.get('confirm').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }
}
   