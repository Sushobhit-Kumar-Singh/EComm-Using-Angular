import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Iproduct[];
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit() {
    this.route.events.subscribe((value: any) => {
      // console.log(value.url);
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          // console.log("in seller area");
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          // console.log("outside seller");
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    // console.log(val);
    this.route.navigate([`search/${val}`])
  }
}
