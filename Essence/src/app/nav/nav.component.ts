import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {    
  redirect_uri = "http://localhost:4200";
  constructor(private tokenService: TokenService) {}   

  ngOnInit(): void {
  } 

  login(){
    this.tokenService.onLogin();
  }

  logout(){
    this.tokenService.onLogout();
  }

  register(){
    this.tokenService.onRegister();
  }

  isLoggedIn(){
    if(sessionStorage.getItem("access_token")!=null) return true;
    return false;
  }
}
