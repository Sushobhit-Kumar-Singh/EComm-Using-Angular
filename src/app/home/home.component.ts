import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined | Iproduct[];
  trendyProducts:undefined | Iproduct[];
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product:ProductService){}
  ngOnInit():void {
    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts=data;
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });
  }

}
