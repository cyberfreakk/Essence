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
  constructor(private route: ActivatedRoute, private songsService : SongsService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.playlistName = this.route.snapshot.params['playlistName'];
    this.songsService.getPlaylist(this.id,this.playlistName).subscribe((data) =>{
      this.tracks = data;
    })
  }

}
