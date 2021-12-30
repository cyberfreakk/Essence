import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  searchUrl: string;
  access_token = sessionStorage.getItem("access_token");
  scope ="user-read-playback-position+user-read-email+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-follow-read+user-read-currently-playing+user-read-private+user-library-read+playlist-read-public+user-top-read+user-read-recently-played";
  constructor(private http: HttpClient) { }

  getSongs(searchVal:string, type="track"){   
    let headers = new HttpHeaders(); 
    this.searchUrl = "https://api.spotify.com/v1/search?q="+searchVal+"&type="+type+"&limit=18&offset=0"+"&scope"+this.scope;    
    return this.http.get(this.searchUrl,{headers: headers});
  }

  getNewReleases(){
    let headers = new HttpHeaders();
    this.searchUrl = "https://api.spotify.com/v1/browse/new-releases?limit=9"+"&scope"+this.scope;
    return this.http.get(this.searchUrl,{headers: {
      'Content-Type': 'application/json'
    }});    
  }

  getFavorites(id: string){
    this.searchUrl = "https://localhost:44392/api/track/"+id;
    return this.http.get(this.searchUrl, {headers: {
      'Content-Type': 'application/json'
    }})
  }

  addToFavorites(item: Track){    
    this.searchUrl = "https://localhost:44392/api/track/";
    return this.http.post(this.searchUrl,item, {headers: {
      'Content-Type': 'application/json'      
    }})
  }

  removeFromFavorites(item: Track){
    this.searchUrl = "https://localhost:44392/api/track/"+item.userId+"/"+item.trackId;
    return this.http.delete(this.searchUrl, {headers: {
      'Content-Type': 'application/json'
   }})
  }

  getPlaylist(id: String, playlistName: string){
    this.searchUrl = "https://localhost:44392/api/track/"+id+"/"+playlistName;
    return this.http.get(this.searchUrl, {headers: {
      'Content-Type': 'application/json'
    }})
  }
}
