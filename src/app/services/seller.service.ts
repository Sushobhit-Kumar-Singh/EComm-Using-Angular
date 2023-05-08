import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
import { ILogin, ISignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  url="http://localhost:3000/seller";
  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);


  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:ISignUp){
   this.http.post(this.url,data,{observe:'response'}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body));
    this.router.navigate(['seller-home']);
  //  console.log("result",result);

   });

  //  return false;
  }
    reloadSeller(){
      if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']);

      }

    }
    userLogin(data:ILogin){
      console.log(data);
      this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
        console.log(result);
        if(result && result.body && result.body.length ){
          console.log("user Login In");
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
        else{
          console.log("Login failed");
          this.isLoginError.emit(true);
        }
      });
    }

}
