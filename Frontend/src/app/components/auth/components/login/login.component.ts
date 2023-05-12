import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
    private httpClient: HttpClient,
    
  ) { }

  submitLoginForm(form: NgForm) {
    if(form.valid) {
      let model = new LoginModel();
      model.email = form.value.email;
      model.password = form.value.password;
      this._authService.login(model, res => {
        this._toastrService.success("Giriş Başarılı...", "Success");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this._router.navigateByUrl("/");
      });
    } else {
      this._toastrService.error("Giriş Başarısız...", "Error");
    }
  }

  userGetir(){
    this.httpClient.get("https://localhost:7002/api/user/1").subscribe({
      next: (res: any) => {
        console.log("url : " + "https://localhost:7002/api/user/1");        
        console.log(res);
        this._router.navigateByUrl("/");
      },
      error: (err: any) => {
        console.log("err : " + err.error);
      }
    });

  }

}
