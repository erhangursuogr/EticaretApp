import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryService } from './services/category.service';
import { SwalService } from 'src/app/common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';
import { CategoryModel } from './models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CategoryPipe],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: CategoryModel[] = [];
  updateCategories: CategoryModel = new CategoryModel();
  search: string = "";

  private _toastr = inject(ToastrService);
  private _categoryService = inject(CategoryService);
  private _swalService = inject(SwalService);

  public categoryForm = new FormGroup({ name: new FormControl('') });
  public updatecategoryForm = new FormGroup({ uname: new FormControl('') });

  constructor() { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._categoryService.getAll(res => {
      this.categories = res;
    });
  }

  add(): void {
    if (this.categoryForm.value.name == null || this.categoryForm.value.name == "") {
      this._toastr.error("Kategori Adı Boş Geçilemez");
      return;
    }
    if (this.categoryForm.invalid) {
      return;
    }
    let model = { name: "" };
    model.name = this.categoryForm.value.name?.toString() || "";
    this._categoryService.add(model.name, res => {
      this._toastr.success(res.message);
      let element = document.getElementById('closeModal') as HTMLElement;
      this.getAll();
      this.categoryForm.reset();
      element.click();
    });
  }

  getUpdate(model: CategoryModel): void {
    this.updateCategories = ({ ...model });
  }

  update() {
    if (this.updatecategoryForm.value.uname == null || this.updatecategoryForm.value.uname == "") {
      this._toastr.error("Kategori Adı Boş Geçilemez");
      return;
    }
    if (this.updatecategoryForm.invalid) {
      return;
    }
    this.updateCategories.name = this.updatecategoryForm.value.uname?.toString() || "";
    this._categoryService.update(this.updateCategories, res => {
      this._toastr.warning(res.message);
      let element = document.getElementById('updatecloseModal') as HTMLElement;
      this.getAll();
      this.updatecategoryForm.reset();
      element.click();
    });
  }

  delete(model: CategoryModel): void {
    if (model.id == null || model.id == "") {
      model.id = model._id;
    }
    this._swalService.callSwal("Silme İşlemi", `${model} Kategorisini Silmek İstediğinize Emin misiniz?`, "warning", () => {
      this._categoryService.delete(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      });
    });
  }

}
