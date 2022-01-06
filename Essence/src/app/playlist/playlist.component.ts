import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../services/songs.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  id = sessionStorage.getItem('id');
  playlistName:string;
  tracks:any;
  redirect_uri = "http://localhost:4200";

  constructor(private route: ActivatedRoute, private songsService : SongsService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.playlistName = this.route.snapshot.params['playlistName'];
    this.getPlaylist();
    
  }

  getPlaylist(){
    this.songsService.getPlaylist(this.id,this.playlistName).subscribe((data) =>{
      this.tracks = data;
    })
  }

  deleteFromPlaylist(trackId:string){
    this.songsService.deleteFromPlaylist(this.id,this.playlistName, trackId).subscribe((data) =>{
      this.tracks = data;
    },
    (error) => {
      console.log(error.message);
    })
    window.location.reload();
  }

  deletePlaylist(){
    this.songsService.deletePlaylist(this.id,this.playlistName).subscribe((data) =>{
      this.tracks = data;
    },
    (error) => {
      console.log(error.message);
    })
    window.location.href = this.redirect_uri;
  }

}
