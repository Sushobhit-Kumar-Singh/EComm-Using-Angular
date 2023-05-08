import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  addProduct(data: Iproduct) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<Iproduct[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<Iproduct>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(Iproduct: Iproduct) {
    return this.http.put<Iproduct>(
      `http://localhost:3000/products/${Iproduct.id}`,
      Iproduct
    );
  }
  popularProducts() {
    return this.http.get<Iproduct[]>('http://localhost:3000/products?_limit=3');

  }
  trendyProducts(){
    return this.http.get<Iproduct[]>('http://localhost:3000/products?_limit=8');

  }
  searchProducts(query:string){
    return this.http.get<Iproduct[]>(`http://localhost:3000/products?q=${query}`);

  }
}
