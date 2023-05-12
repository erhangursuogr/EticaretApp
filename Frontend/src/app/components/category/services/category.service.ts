import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { MessageResponseModel } from 'src/app/common/models/message.response';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: GenericHttpService,
  ) { }

  getAll(callback: (res: CategoryModel[]) => void) {
    this._http.get<CategoryModel[]>('categories/getall', res => { callback(res) });
  }

  add(name: string, callback: (res: MessageResponseModel) => void) {
    let model = { name: name };
    this._http.post<MessageResponseModel>('categories/add', model, res => callback(res));
  }

  update(model: CategoryModel, callback: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>('categories/update', model, res => callback(res));
  }

  delete(model: CategoryModel, callback: (res: MessageResponseModel) => void) {
    //console.log("model servis" + model._id + " " + model.id + " " + model.name);
    this._http.post<MessageResponseModel>('categories/delete', model, res => callback(res));
  }

}
