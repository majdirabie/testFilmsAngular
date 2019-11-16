import {Component, Input, OnInit} from '@angular/core';
import {FilmsService} from '../core/services/films.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Film} from '../core/models/film';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-details-film',
  templateUrl: './details-film.component.html',
  styleUrls: ['./details-film.component.css']
})
export class DetailsFilmComponent implements OnInit {
  filmId: string;
  film: any = {} as Film;
  rating: number = 0;
  x_rating: number = 10;
  z_rating = new Array();
  y_rating = new Array();

  constructor(private filmService: FilmsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filmId = this.route.snapshot.paramMap.get('imdbID');

    this.getFilmByimdbID();
  }

  getFilmByimdbID() {
    this.filmService.getFilm(this.filmId, environment.apiKey).subscribe(data => {
      this.film = data;
      this.rating = Math.round(+this.film.imdbRating);
      this.x_rating = this.x_rating - this.rating;
      this.z_rating=new Array(this.rating)
      this.y_rating=new Array(this.x_rating)
    });
  }

  goToListFilm() {
    this.router.navigate(['/']);
  }
}
