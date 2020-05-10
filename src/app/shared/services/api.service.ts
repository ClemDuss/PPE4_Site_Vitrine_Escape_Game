import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { News } from '../models/news';
import { FunctionsService } from './functions.service';
import { Room } from '../models/room';
import { City } from '../models/city';

interface apiNewsFormat{
  id;
  title;
  startdate;
  enddate;
  description;
  activated
}

interface apiRoomFormat{
  id: number;
  nom: string;
  idville: number;
  idthemeactuel: number;
  heureouverture: Date;
  heurefermeture: Date;
  lon: number;
  lat: number;
}

interface apiCityFormat{
  id: number;
  nomville: string;
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
  private _baseUrlApiRooms: string = this._baseUrlApi + '/salles';
  private _baseUrlApiCitys: string = this._baseUrlApi + '/villes';

  private _allNewsFromApi: Subject<News[]> = new Subject<News[]>();
  private _allRoomsFromApi: Subject<Room[]> = new Subject<Room[]>();
  private _allCitysFromApi: Subject<City[]> = new Subject<City[]>();

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



  // ROOMS
  /**
   * Retourne toutes les salles de la base
   */
  public getAllRooms(): Subject<Room[]>{
    let tableGetApi: Room[] = [new Room()];
    let tableGetFromApi: apiRoomFormat[];
    this._allRoomsFromApi = new Subject<Room[]>();
    //this._http.get(this._baseUrlApi + '/news')
    this._http.get(this._baseUrlApiRooms)
      .subscribe((data: apiRoomFormat[])=>{
        tableGetFromApi = data;
        const tableLength = tableGetFromApi.length;
        for(let i = 0; i < tableLength; i++){
          let currentRoom = new Room();
          currentRoom.id = tableGetFromApi[i].id;
          currentRoom.nom = tableGetFromApi[i].nom;
          currentRoom.idVille = tableGetFromApi[i].idville;
          currentRoom.idThemeActuel = tableGetFromApi[i].idthemeactuel;
          currentRoom.heureOuverture = new Date(tableGetFromApi[i].heureouverture);
          currentRoom.heureFermeture = new Date(tableGetFromApi[i].heurefermeture);
          currentRoom.lon = tableGetFromApi[i].lon;
          currentRoom.lat = tableGetFromApi[i].lat;
          tableGetApi.push(currentRoom);
        }
        tableGetApi.shift();
        this._allRoomsFromApi.next(tableGetApi);
      },
      error => {throw error},
      () => console.log('terminé'));
    return this._allRoomsFromApi;
  }



  // CITY
  public getAllCitys(): Subject<City[]>{
    let tableGetApi: City[] = [new City()];
    let tableGetFromApi: apiCityFormat[];
    this._allCitysFromApi = new Subject<City[]>();
    this._http.get(this._baseUrlApiCitys)
      .subscribe((data: apiCityFormat[])=>{
        tableGetFromApi = data;
        const tableLength = tableGetFromApi.length;
        for(let i = 0; i < tableLength; i++){
          let currentCity = new City();
          currentCity.id = tableGetFromApi[i].id;
          currentCity.nomVille = tableGetFromApi[i].nomville;
          tableGetApi.push(currentCity);
        }
        tableGetApi.shift();
        this._allCitysFromApi.next(tableGetApi);
      },
      error => {throw error},
      () => console.log('terminé'));
    return this._allCitysFromApi;
  }
}
