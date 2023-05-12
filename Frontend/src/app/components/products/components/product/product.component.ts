import { Component, inject } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { PaginationResultModel } from 'src/app/common/models/pagination.result';
import { RequestModel } from 'src/app/common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SwalService } from 'src/app/common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: ProductModel = new ProductModel();
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  //filepath: string = "http://localhost:5000/uploads/";

  private _productService = inject(ProductService);
  private _swal = inject(SwalService);
  private _toastr = inject(ToastrService);

  constructor() { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._productService.getAll(this.request, res => {
      this.result = res;
      //console.log(this.result.datas);
      this.setPageNumber();
    });

  }

  delete(id: string) {
    this._swal.callSwal("Ürünü Sil", "Ürünü Silmek istiyor musunuz?", "warning", () => {
      let model = { _id: id }
      this._productService.delete(model, res => {
        this._toastr.warning(res.message);
        this.getAll(this.result.pageNumber);
      });
    });
  }

  setPageNumber() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  searchProduct() {
    if (this.request.search.length >= 3) {
      this.getAll(1);
      return;
    }
  }

  changeStatusProduct(id: string) {
    let model = { _id: id }
    this._productService.changeStatus(model, res => {
      this._toastr.info(res.message);
      this.getAll(this.result.pageNumber);
    });
  }

  filecheck(url: string): boolean {
    var request = new XMLHttpRequest();
    request.open('HEAD', url, false);
    request.send();
    if (request.status == 200) {return true;} 
    else if (request.status == 404) {return false;}
    else {return false;}
  }


}
