import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api = "http://localhost:5000/api/";
  api2 = "https://localhost:7002/api/";

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService
  ) { }

  get<T>(url: string, callback: (res: T) => void) {
    this._spinner.show();
    this._http.get<T>(`${this.api}${url}`).subscribe({
      next: (res: T) => {
        callback(res)
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._toastr.error(err.error.message);
        this._spinner.hide();
      }
    })
  }

  post<T>(url: string, model: any, callback: (res: T) => void) {
    this._spinner.show();
    //console.log(url + " " + model.name + " " + model.id + " " + model._id);
    this._http.post<T>(`${this.api}${url}`, model, {}).subscribe({
      next: (res: T) => {
        callback(res)
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._toastr.error(err.error.message);
        this._spinner.hide();
      }
    })
  }

  getUser() {
    return this._http.get(this.api2 + 'User/1');
  }

}
