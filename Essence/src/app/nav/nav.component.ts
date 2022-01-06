import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {    
  playlists:any;

  constructor(private tokenService: TokenService, private songsService: SongsService) {}   

  ngOnInit(): void {
    this.getPlaylistsName();
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

  getPlaylistsName(){
    let id = sessionStorage.getItem('id');
    if(id){
      this.songsService.getPlaylistsName(id).subscribe(data =>{this.playlists = data},
        error => {
          console.error('Error Message: ',error.message );   
        });
    }
  }
}
