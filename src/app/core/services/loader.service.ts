import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public spinnerCount = 0;

  constructor() { }
}
