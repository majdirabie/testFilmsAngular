import {Component, OnInit} from '@angular/core';
import {FilmsService} from '../../core/services/films.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Film} from '../../core/models/film';

@Component({
  selector: 'app-details-film',
  templateUrl: './details-film.component.html',
  styleUrls: ['./details-film.component.css']
})
export class DetailsFilmComponent implements OnInit {
  filmId: string;
  film: any = {} as Film;

  constructor(private filmService: FilmsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filmId = this.route.snapshot.paramMap.get('imdbID');
    this.getFilmByimdbID();
  }

  getFilmByimdbID() {
    this.filmService.getFilm(this.filmId, '295e6386').subscribe(data => {
      this.film=data
    });
  }

  goToListFilm(){
    this.router.navigate(['/']);
  }
}
