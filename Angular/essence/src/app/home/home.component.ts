import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from '../models/track';
import { SongsService } from '../services/songs.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{ 

  user:{};
  searchValue: string;
  tracks: {};
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
      promise.then(result => this.showNewReleases()).then(result => this.getUserId())
    }
    if(sessionStorage.getItem('access_token')){
      this.showNewReleases();
      this.getUserId()
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
  
  addToFavorites(item:any){  
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
}
