import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsHelpersService {

  constructor() { }

  public markControlsAsDirty(fg: FormGroup) {
    for (let prop in fg.controls) {
      fg.controls[prop].markAsDirty();
      if (fg.controls[prop] instanceof FormArray) {
        for (let group of (fg.controls[prop] as FormArray).controls) {
          this.markControlsAsDirty(group as FormGroup);
        }
      }
    }
  }

}
