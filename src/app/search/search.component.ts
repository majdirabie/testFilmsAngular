import {Component, Input, OnInit, ɵLOCALE_DATA} from '@angular/core';
import {FilmsService} from '../core/services/films.service';
import {Film} from '../core/models/film';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sizeItems = [10, 20, 50, 50];
  textArray = [
    'Hitman',
    'Spider',
    'Game'
  ];
  randomNumber = Math.floor(Math.random() * this.textArray.length);
  filmId: string;
  messageError: string = '';
  apiKey: string = '295e6386';
  search: string = '';
  listFilms: Film[];
  page: number = 1;
  limitPaginate: Array<any> = new Array<any>();
  pages: number = 0;
  sizeElement: number = 0;
  listPaginate: any = [];

  constructor(private filmService: FilmsService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getListFilms(this.search, this.page, this.apiKey);
    //this.OnSearch(this.search);
  }


  getListFilms(search: string, page: number, apikey: string) {
    apikey = this.apiKey;
    page = this.page;
    search = this.textArray[this.randomNumber];
    this.filmService.getListFilms(search, page, apikey).subscribe(data => {
      this.listFilms = data['Search'];
      this.sizeElement = data['totalResults'];
      this.pages = Math.round(this.sizeElement / 10);
      if (this.pages <= 100) {
        this.listPaginate = new Array(this.pages);
      } else {
        this.listPaginate = new Array(100);
      }
    });
  }

  OnSearch(value: string) {
    if (value === '') {
      let message = 'Vous devez entrer un nom de film ';
      let title = 'Warning';
      this.warningSuccess(message, title);
    } else {

      this.search = value;
      this.page = 1;


      this.filmService.getListFilms(this.search, this.page, this.apiKey).subscribe((data: any) => {
        if (data['Response'] === 'True') {
          this.listFilms = data['Search'];
          console.log(this.listFilms[1]);
          this.sizeElement = data['totalResults'];
          this.pages = Math.round(this.sizeElement / 10);

          this.listPaginate = new Array(this.pages);

        } else {
          this.ErrorSuccess(data['Error'], 'Error');
        }
      });

    }

  }

  getFilmByID(imdbID: string, event) {
    event.preventDefault();
    this.filmId = imdbID;
    console.log(this.filmId);
    this.router.navigateByUrl('/details/' + imdbID);
    // this.router.navigate(['/details/' + imdbID]);
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log(this.search);
    if (this.search === '') {
      this.filmService.getListFilms(this.textArray[this.randomNumber], this.page, this.apiKey).subscribe(data => {
          this.listFilms = data['Search'];
          this.sizeElement = data['totalResults'];

          this.pages = Math.round(this.sizeElement / 10);

          this.listPaginate = new Array(this.pages);


        },
        (error) => {
          // console.log(error.error.message);
          this.showToast(error.error.message, '');
        }
      );
    } else {
      this.filmService.getListFilms(this.search, this.page, this.apiKey).subscribe(data => {
          this.listFilms = data['Search'];

          this.sizeElement = data['totalResults'];
          this.listPaginate = data['Search'];

          this.pages = Math.round(this.sizeElement / 10);

          this.listPaginate = new Array(this.pages);


        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }
  }

  next(event: any) {
    event.preventDefault();
    this.page = this.page + 1;
    console.log(this.search);
    if (this.search !== '') {
      this.filmService.getListFilms(this.search, this.page, this.apiKey).subscribe(data => {
          this.listFilms = data['Search'];

          this.sizeElement = data['totalResults'];
          this.listPaginate = data['Search'];

          this.pages = Math.round(this.sizeElement / 10);
          if (this.pages <= 100) {
            this.listPaginate = new Array(this.pages);
          } else {
            this.listPaginate = new Array(100);
          }

        },
        (error) => {
          console.log(error.error.message);
        }
      );
    } else {
      this.getListFilms(this.textArray[this.randomNumber], this.page, this.apiKey);
    }
  }

  preview(event: any) {
    event.preventDefault();
    this.page = this.page - 1;
    console.log(this.search);
    if (this.search !== '') {
      this.filmService.getListFilms(this.search, this.page, this.apiKey).subscribe(data => {
          this.listFilms = data['Search'];

          this.sizeElement = data['totalResults'];
          this.listPaginate = data['Search'];
          this.pages = Math.round(this.sizeElement / 10);
          if (this.pages <= 100) {
            this.listPaginate = new Array(this.pages);
          } else {
            this.listPaginate = new Array(100);
          }

        },
        (error) => {
          console.log(error.error.message);
        }
      );
    } else {
      this.getListFilms(this.textArray[this.randomNumber], this.page, this.apiKey);
    }
  }

  showToast(message: string, title: string) {
    this.toastr.success(message, title);
  }

  ErrorSuccess(message: string, title: string) {
    this.toastr.error(message, title);
  }

  infoSuccess(message: string, title: string) {
    this.toastr.info(message, title);
  }

  warningSuccess(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
