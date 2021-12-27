import { Component, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { SongsService } from '../services/songs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  tracks:any;

  constructor(private songsService : SongsService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(){
    this.songsService.getFavorites().subscribe(res => {this.tracks = res});  
  }

  removeTrack(item:any){
    let track:Track = {userId:item.userId,trackName:item.trackName,trackId:item.trackId, imageUrl:item.imageUrl, audioUrl:item.audioUrl};
    this.songsService.removeFromFavorites(track).subscribe(data => console.log(data['error'].text));
    window.location.reload();
  }
}
