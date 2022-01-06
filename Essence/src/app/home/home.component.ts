import { Component, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { SongsService } from '../services/songs.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{ 

  user:{};
  searchValue: string;
  tracks: {};
  favTracks: any;
  newReleases:{};
  redirect_uri = "http://localhost:4200";
  playlists:any;
  playlistName:string;

  constructor(private songsService: SongsService, private tokenService: TokenService){}

  ngOnInit(): void {
    if(!sessionStorage.getItem('access_token') && this.tokenService.getCode()){
      let promise = new Promise((resolve => {
        this.tokenService.getToken();
        setTimeout(() =>{
          resolve(true)
        }, 400);
      }))
      promise.then(result => this.showNewReleases()).then(result => this.getUserId()).then(result => this.getPlaylistsName());
    }
    if(sessionStorage.getItem('access_token')){
      this.showNewReleases();
      this.getFavorites();
      this.getPlaylistsName()
    }
  }

  searchMusic(){
    this.songsService.getSongs(this.searchValue).subscribe(res => {this.tracks = res},
      (error) => {
        if(error.status == 401){
          this.tokenService.refreshAccessToken();
          window.location.reload;
        }
      });    
  }

  showNewReleases(){
    this.songsService.getNewReleases().subscribe(res => {this.newReleases = res},
      (error) => {
        if(error.status == 401){
          this.tokenService.refreshAccessToken();
          window.location.reload;
        }
      })
  }  
  
  addSearchToFavorites(item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.album.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToFavorites(track).subscribe(data =>{},
      error => {
        console.error('Error Message: ',error.message );   
      });
    }    
  }

  addNewReleasesToFavorites(item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToFavorites(track).subscribe(data =>{},
      error => {
        console.error('Error Message: ',error.message );   
      });
    }    
  }

  removeTrack(item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.album.images['1'].url, audioUrl:item.preview_url};
      this.songsService.removeFromFavorites(track).subscribe(data => {});
    }    
  }

  removeTrackNR(item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.images['1'].url, audioUrl:item.preview_url};
      this.songsService.removeFromFavorites(track).subscribe(data => {});
    }    
  }

  getUserId(){
    this.tokenService.getUserId().subscribe(
      (user) => {     
      sessionStorage.setItem('id', user['id'].toString())},
      (error) => {
        if(error.status == 401){
          this.tokenService.refreshAccessToken();
          window.location.reload;
        }
      })
    setTimeout(() => this.getFavorites(),300);
  }

  getFavorites(){
    let id = sessionStorage.getItem('id');
    if(id){
      this.songsService.getFavorites(id).subscribe(res => {this.favTracks = res});  
    }
  }

  toggleSearch(item, e){
    if(e.target.checked)
      this.addSearchToFavorites(item);
    else{
      this.removeTrack(item);
    }
  }

  toggleNewReleases(item, e){
    if(e.target.checked)
      this.addNewReleasesToFavorites(item);
    else{
      this.removeTrackNR(item);
    }
  }

  isChecked(id:string){
    for(let item in this.favTracks){
      if(this.favTracks[item].trackId == id){
        return true;
      }
    }
    return false;
  }

  addToPlaylist(name:string, item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.album.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToPlaylist(id,name,track).subscribe(data =>{},
        error => {
          console.error('Error Message: ',error.message );   
        });
    }
    window.location.reload();
  }

  addToPlaylistNR(name:string, item:any){
    let id = sessionStorage.getItem('id');
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToPlaylist(id,name,track).subscribe(data =>{},
        error => {
          console.error('Error Message: ',error.message );   
        });
    }
    window.location.reload();
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
