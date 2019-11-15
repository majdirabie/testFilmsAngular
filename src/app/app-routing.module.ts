import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {DetailsFilmComponent} from './search/details-film/details-film.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'details/:imdbID', component: DetailsFilmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
