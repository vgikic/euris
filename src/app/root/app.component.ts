import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'euris-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'euris';
  constructor(public router: Router) {}
}
