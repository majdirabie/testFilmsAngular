import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  apiKey: string;
  title_of_film: string;

  constructor(private http: HttpClient) {
  }


  getListFilms(title_of_film: string, page: number, apiKey: string) {
    this.apiKey = apiKey;
    this.title_of_film=title_of_film;
    return this.http.get(`${environment.api_url}` + 's=' + this.title_of_film + '&page=' + page + '&apiKey=' + apiKey)
      .pipe(map(data => data));
  }


  getFilm(imdbID: string, apiKey: string) {
    return this.http.get(`${environment.api_url}` + 'i=' + imdbID + '&apiKey=' + apiKey)
      .pipe(map(data => data));
  }

}
