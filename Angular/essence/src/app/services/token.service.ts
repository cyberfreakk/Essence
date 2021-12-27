import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SongsService } from './songs.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  redirect_uri = "http://localhost:4200";
  client_id = "e1de244a6de948f580f290621762f1e2"; 
  client_secret = "ef829dd4696d4eceb24aa608974b9fa7";
  TOKEN = "https://accounts.spotify.com/api/token";
  AUTHORIZE = "https://accounts.spotify.com/authorize";
  
  constructor(private httpClient:HttpClient, private songsService : SongsService) { }  

  onLogin(){
    sessionStorage.setItem("client_id", this.client_id);
    sessionStorage.setItem("client_secret", this.client_secret); 
    let url = this.AUTHORIZE;
    url += "?client_id=" + this.client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(this.redirect_uri);
    url += "&show_dialog=false";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
  }

  onRegister(){
    let url = 'https://www.spotify.com/in-en/signup?forward_url=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-email%2Buser-modify-playback-state%2Buser-read-playback-position%2Buser-library-read%2Bstreaming%2Buser-read-playback-state%2Buser-read-recently-played%2Bplaylist-read-private%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200%26client_id%3De1de244a6de948f580f290621762f1e2%26show_dialog%3Dfalse';
    window.location.href = url;
  }

  onLogout(){
    const url = 'https://accounts.spotify.com/en/logout';
    sessionStorage.removeItem("client_id");
    sessionStorage.removeItem("client_secret");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
    setTimeout(() => spotifyLogoutWindow.close(),1000);
  } 

  getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
  }
  getToken(){
    let code = this.getCode();
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(this.redirect_uri);
    body += "&client_id=" + this.client_id;
    body += "&client_secret=" + this.client_secret;
    let headers = new HttpHeaders();
    this.httpClient.post(this.TOKEN, body,{headers:headers}).subscribe((data:any) =>{     
      sessionStorage.setItem('access_token', data['access_token'].toString());
      sessionStorage.setItem('refresh_token', data['refresh_token'].toString());
    });  
    window.history.pushState("", "", this.redirect_uri);  
  }

}
