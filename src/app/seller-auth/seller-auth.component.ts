import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import {ISignUp} from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError:string = '';

  constructor(private seller:SellerService, private router:Router){
    
  }
  ngOnInit(): void {

    this.seller.reloadSeller();
  }
  signUp(data:ISignUp):void{
    
     this.seller.userSignUp(data) //.subscribe((result)=>{
    //   //console.log(result);
    //   if(result){
      //   this.router.navigate(['seller-home']);
      // }
    // });
    
  }
  Login(data: ISignUp){    
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = 'Email or password is Wrong';
      }
    })
  };
  

  openLogin(){
      this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
}
}
