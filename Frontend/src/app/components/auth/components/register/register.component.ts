import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { RegisterModel } from './models/register.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  registerModel: RegisterModel = new RegisterModel();

  register(form: NgForm) {
    if (form.valid) {
      this._authService.register(this.registerModel, res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user.email));
        this._toastrService.success("Kayıt Başarılı...", "Success");
        this._router.navigateByUrl("/");
        console.log(res);
      });
    } else { this._toastrService.error("Kayıt Başarısız...", "Error"); }
  }

}
