import { Injectable, inject } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { BasketModel } from '../models/basket.model';
import { MessageResponseModel } from 'src/app/common/models/message.response';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _http = inject(GenericHttpService);
  count: number = 0;

  constructor() { }

  add(model: BasketModel, callback: (res: MessageResponseModel) => void) {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    model.userId = user._id;
    this._http.post<MessageResponseModel>("basket/add", model, res => {      
      this.getCount();
      callback(res);
     });
  }

  remove(model: any, callback: (res: MessageResponseModel) => void) {    
    this._http.post<MessageResponseModel>("basket/removeById", model, res => { 
      this.getCount();
      callback(res); });
  }

  getAll(callback: (res: BasketModel[]) => void) {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = { userId: user._id };
    this._http.post<BasketModel[]>("basket/", model, res => { callback(res) });
  }

  getCount() {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = { userId: user._id };
    this._http.post<any>("basket/getCount", model, res => { this.count = res.count });
  }

}
