import { Injectable, inject } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from '../models/login.response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../components/register/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(GenericHttpService);

  constructor(
    //private _http: GenericHttpService
  ) { }

  login(model: LoginModel, callback: (res: LoginResponseModel) => void) {
    this._http.post<LoginResponseModel>("auth/login", model, res=> callback(res));
    //this._http.post<LoginResponseModel>("user/loginuser", model, res => callback(res));
  }

  register(model: RegisterModel, callback: (res: LoginResponseModel) => void) {
    this._http.post<LoginResponseModel>("auth/register", model, res => callback(res));
    //this._http.post<LoginResponseModel>("user/adduser", model, res => callback(res));
  }

}
