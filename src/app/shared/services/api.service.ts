import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { News } from '../models/news';
import { FunctionsService } from './functions.service';

interface apiNewsFormat{
  id;
  title;
  startdate;
  enddate;
  description;
  activated
}

const httpOptions= {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrlApi: string = 'http://localhost:8080/api';
  private _baseUrlApiNews: string = this._baseUrlApi + '/news';

  private _allNewsFromApi: Subject<News[]> = new Subject<News[]>();

  constructor(
    private _http: HttpClient,
    private _functionsService: FunctionsService,
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // NEWS
  public getAllNewsFromApi(){
    return this._http.get(this._baseUrlApiNews);
  }

  /**
   * Retourne toutes les news de l'API
   */
  public getAllNews(): Subject<News[]>{
    let tableGetApi: News[] = [new News()];
    let tableGetFromApi: apiNewsFormat[];
    this._allNewsFromApi = new Subject<News[]>();
    //this._http.get(this._baseUrlApi + '/news')
    this.getAllNewsFromApi()
      .subscribe((data: apiNewsFormat[])=>{
        tableGetFromApi = data;
        const tableLength = tableGetFromApi.length;
        for(let i = 0; i < tableLength; i++){
          let currentNews = new News();
          currentNews.setId(tableGetFromApi[i].id);
          currentNews.setTitle(tableGetFromApi[i].title);
          currentNews.setStartDate(new Date(tableGetFromApi[i].startdate));
          currentNews.setEndDate(new Date(tableGetFromApi[i].enddate));
          currentNews.setDescription(tableGetFromApi[i].description);
          currentNews.setActivated(tableGetFromApi[i].activated);
          tableGetApi.push(currentNews);
        }
        tableGetApi.shift();
        this._allNewsFromApi.next(tableGetApi);
      },
      error => {throw error},
      () => console.log('terminé'));
    return this._allNewsFromApi;
  }

  public postNews(theNews: News): void{
    let theNewsJson = '{' +
      '"title": "' + theNews.getTitle() + '",' +
      '"startdate": "' + this._functionsService.dateToString(theNews.getStartDate()) + '",' +
      '"enddate": "' + this._functionsService.dateToString(theNews.getEndDate()) + '",' +
      '"description": "' + theNews.getDescription() + '",' +
      '"activated": ' + theNews.getActivated() + '}';
    this._http.post(this._baseUrlApiNews, theNews, httpOptions);
    console.log(theNewsJson);
  }

  public putNews(theNews: News): void{
    let theNewsJson = '{' +
      '"title": "' + theNews.getTitle() + '",' +
      '"startdate": "' + this._functionsService.dateToString(theNews.getStartDate()) + '",' +
      '"enddate": "' + this._functionsService.dateToString(theNews.getEndDate()) + '",' +
      '"description": "' + theNews.getDescription() + '",' +
      '"activated": ' + theNews.getActivated() + '}';
    this._http.put(this._baseUrlApiNews + '/' + theNews.getId().toString(), theNewsJson, httpOptions)
  }
}
