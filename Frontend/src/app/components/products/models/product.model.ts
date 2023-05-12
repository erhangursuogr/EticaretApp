import { CategoryModel } from "../../category/models/category.model";

export class ProductModel{
    id: string = '';
    _id: string = '';
    name: string = '';
    price: number = 0;
    stock: number = 0;
    imageUrls: any[] = [];
    isActive: boolean = true;
    createdDate: Date = new Date();
    categories: CategoryModel[] = [];
}