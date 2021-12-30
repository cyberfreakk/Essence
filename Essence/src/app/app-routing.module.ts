import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '',component:HomeComponent,
  children: [
      { path: 'home', component: HomeComponent }
  ] },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule), canLoad:[AuthGuard] },
  { path: 'logout', loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule)},
  { path: 'playlist/:playlistName', loadChildren: () => import('./playlist/playlist.module').then(m => m.PlaylistModule), canLoad:[AuthGuard] },
  { path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
