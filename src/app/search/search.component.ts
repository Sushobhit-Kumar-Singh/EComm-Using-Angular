import { Component } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Iproduct } from '../data-type';
import {ProductService} from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined | Iproduct[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){

  }
  ngOnInit():void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult=result;
    });
  }
}
