import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from 'src/app/components/category/models/category.model';
import { CategoryService } from 'src/app/components/category/services/category.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];

  private _categories = inject(CategoryService);
  private _product = inject(ProductService);
  private _toastr = inject(ToastrService);
  private _router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categories.getAll(res => {
      this.categories = res;
    }
    );
  }

  add(form: NgForm) {
    if (form.value["categorySelect"].length == 0) {
      this._toastr.error("Kategori seçimi yapmadınız!");
      return;
    }
    if (form.valid) {
      let product = form.value;
      let categories: string[] = product["categorySelect"];
      let name = product["name"];
      let price = product["price"];
      let stock = product["stock"];
      price = price.toString().replace(",", ".");

      let formData = new FormData();
      formData.append("name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      
      for (const category of categories) {
        formData.append("categories", category);
      }
      for (const image of this.images) {
        formData.append("images", image, image.name);
      }
      
      this._product.add(formData, res => {        
        this._toastr.success(res.message);
        form.reset();
        this.imageUrls = [];
        this._router.navigateByUrl("/product");
      });

    }
  }

  getImages(event: any) {        
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);    

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);
      
      reader.onload = () => {
        const data = reader.result as string;
        this.addImage(data, element);
      }
    }
  }

  addImage(data: string, file: any) {
    this.imageUrls.push(
      { data: data, name: file.name, size: file.size }
    );
  }

  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex(p => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
  // getImages(event: any) {
  //   this.images = event.target.files;
  //   if (this.images.length > 0) {
  //     for (let i = 0; i < this.images.length; i++) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(this.images[i]);
  //       reader.onload = (event: any) => {
  //         this.imageUrls.push(event.target.result);
  //       }
  //     }
  //   }
  // }

}
