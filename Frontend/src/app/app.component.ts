import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  template: `
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" type = "ball-spin-fade" 
  [fullScreen] = "true"><p style="color: white" > Lütfen Bekleyiniz... </p></ngx-spinner>
  <router-outlet></router-outlet>
  ` ,
  standalone: true,
  imports: [RouterModule, NgxSpinnerModule]
})
export class AppComponent {
  title = 'Angular E-Ticaret';
}
