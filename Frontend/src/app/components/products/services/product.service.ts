import { Injectable, inject } from '@angular/core';
import { MessageResponseModel } from 'src/app/common/models/message.response';
import { RequestModel } from 'src/app/common/models/request.model';
import { PaginationResultModel } from 'src/app/common/models/pagination.result';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _httpGeneric = inject(GenericHttpService);

  constructor() { }

  getAll(model: RequestModel, callBack: (res: PaginationResultModel<ProductModel[]>) => void) {
    this._httpGeneric.post<PaginationResultModel<ProductModel[]>>('products/', model, res => callBack(res));
  }

  getAllForHomePage(model: RequestModel, callBack: (res: ProductModel[]) => void) {
    this._httpGeneric.post<ProductModel[]>('products/getAllForHomePage', model, res => callBack(res));
  }

  add(model: FormData, callBack: (res: MessageResponseModel) => void) {
    this._httpGeneric.post<MessageResponseModel>('products/add', model, res => callBack(res));
  }

  update(model: FormData, callBack: (res: MessageResponseModel) => void) {
    this._httpGeneric.post<MessageResponseModel>('products/update', model, res => callBack(res));
  }

  delete(model: any, callBack: (res: MessageResponseModel) => void) {
    this._httpGeneric.post<MessageResponseModel>('products/delete', model, res => callBack(res));
  }

  changeStatus(model: any, callBack: (res: MessageResponseModel) => void) {
    this._httpGeneric.post<MessageResponseModel>('products/changeStatus', model, res => callBack(res));
  }

  getById(model: any, callBack: (res: ProductModel) => void) {
    this._httpGeneric.post<ProductModel>('products/getById', model, res => callBack(res));
  }

  removeImageByProductIdAndIndex(model: any, callBack: (res: MessageResponseModel) => void) {
    this._httpGeneric.post<MessageResponseModel>('products/removeImageByProductIdAndIndex', model, res => callBack(res));
  }

}