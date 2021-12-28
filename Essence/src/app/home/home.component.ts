import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  id:string;

  constructor(private songsService: SongsService, private tokenService: TokenService){}

  ngOnInit(): void {
    if(!sessionStorage.getItem('access_token') && this.tokenService.getCode()){
      let promise = new Promise((resolve => {
        this.tokenService.getToken();
        setTimeout(() =>{
          resolve(true)
        }, 400);
      }))
      promise.then(result => this.showNewReleases()).then(result => this.getUserId()).then(result => this.getFavorites())
    }
    if(sessionStorage.getItem('access_token')){
      this.showNewReleases();
      this.getFavorites();
      this.getUserId();
    }
  }

  searchMusic(){
    this.songsService.getSongs(this.searchValue).subscribe(res => {this.tracks = res});    
  }

  showNewReleases(){
    this.songsService.getNewReleases().subscribe(res => {this.newReleases = res})
  }  
  
  getUserId(){
    this.songsService.getUserId().subscribe(res => this.user = res);
  }
  
  addToFavoritesSearch(item:any){
    let id = this.user['id'];
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.album.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToFavorites(track).subscribe(data =>{},
      error => {
        console.error('Error Message: ',error );   
      });
    }    
  }

  addToFavoritesNR(item:any){
    let id = this.user['id'];
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.images['1'].url, audioUrl:item.preview_url};
      this.songsService.addToFavorites(track).subscribe(data =>{},
      error => {
        console.error('Error Message: ',error );   
      });
    }    
  }

  removeTrack(item:any){
    let id = this.user['id'];
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.album.images['1'].url, audioUrl:item.preview_url};
      this.songsService.removeFromFavorites(track).subscribe(data => {});
    }    
  }

  removeTrackNR(item:any){
    let id = this.user['id'];
    if(id){
      let track:Track = {userId:id,trackName:item.name,trackId:item.id, imageUrl:item.images['1'].url, audioUrl:item.preview_url};
      this.songsService.removeFromFavorites(track).subscribe(data => {});
    }    
  }

  getFavorites(){
    this.songsService.getFavorites().subscribe(res => {this.favTracks = res});  
  }

  toggleSearch(item, e){
    if(e.target.checked)
      this.addToFavoritesSearch(item);
    else{
      this.removeTrack(item);
    }
  }
  toggleNR(item, e){
    if(e.target.checked)
      this.addToFavoritesNR(item);
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
}
