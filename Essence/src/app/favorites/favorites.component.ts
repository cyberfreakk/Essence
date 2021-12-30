import { Component, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { SongsService } from '../services/songs.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  tracks: any;
  id = sessionStorage.getItem('id');
  constructor(private songsService : SongsService, private tokenService: TokenService) { }

  ngOnInit(): void {   
    this.getFavorites();
  }

  getFavorites(){
    if(this.id){
      this.songsService.getFavorites(this.id).subscribe((res) => {this.tracks = res},
        (error) => {
          console.log(error.message);
        });  
    }
  }

  removeTrack(item:any){
    let track:Track = {userId:item.userId,trackName:item.trackName,trackId:item.trackId, imageUrl:item.imageUrl, audioUrl:item.audioUrl};
    this.songsService.removeFromFavorites(track).subscribe((res) => {},
      (error) => {
        console.log(error.message);
      });
    window.location.reload();
  }
}
