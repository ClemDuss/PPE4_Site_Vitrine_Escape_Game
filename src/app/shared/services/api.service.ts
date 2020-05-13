import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { News } from '../models/news';
import { FunctionsService } from './functions.service';
import { Room } from '../models/room';
import { City } from '../models/city';
import { Review } from '../models/review';
import { User } from '../models/user';
import { DisplayParameters } from '../models/display-parameters';

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
}

interface apiCityFormat{
  id: number;
  nomville: string;
}

interface apiPublicationsFormat{
  id: number,
  datepublication: Date,
  commentaire: string,
  idutilisateur: string,
  idpartie: string
}

interface apiNotesFormat{
  id: number,
  noteetoile: number,
  idpartie: string
}

interface apiUtilisateursFormat{
  id: number;
  mail: string,
  nom: string,
  prenom: string,
  phot: string,
  adresse1: string,
  adresse2: string,
  ville: string,
  codepostal: string,
  datenaissance: Date,
  motdepase: string,
  identifiant: string,
  tel: string,
  personnel: boolean,
  idetatcompte: string
}

interface apiDisplayParametersFormat{
  id: number,
  displayname: string;
  parameter: string
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
  private _baseUrlApi: string = 'http://localhost:8081/api';
  private _baseUrlApiNews: string = this._baseUrlApi + '/news';
  private _baseUrlApiRooms: string = this._baseUrlApi + '/salles';
  private _baseUrlApiCitys: string = this._baseUrlApi + '/villes';
  private _baseUrlApiPublications: string = this._baseUrlApi + '/publications';
  private _baseUrlApiNotes: string = this._baseUrlApi + '/notes';
  private _baseUrlApiUtilisateurs: string = this._baseUrlApi + '/utilisateurs';
  private _baseUrlApiDisplayParameters: string = this._baseUrlApi + '/displayparameters';

  private _allNewsFromApi: Subject<News[]> = new Subject<News[]>();
  private _allRoomsFromApi: Subject<Room[]> = new Subject<Room[]>();
  private _allCitysFromApi: Subject<City[]> = new Subject<City[]>();
  private _allReviewsFromApi: Subject<Review[]> = new Subject<Review[]>();
  private _allDisplayParametersFromApi: Subject<DisplayParameters[]> = new Subject<DisplayParameters[]>();

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

  public getNewsById(id: number): Subject<News>{
    let theNewsFromApi: Subject<News> = new Subject<News>();
    this._http.get(this._baseUrlApiNews + '/' + id)
      .subscribe((data: apiNewsFormat)=>{
        let theNews: News = new News();
        theNews.setId(data.id);
        theNews.setTitle(data.title);
        theNews.setStartDate(data.startdate);
        theNews.setEndDate(data.enddate);
        theNews.setDescription(data.description);
        theNews.setActivated(data.activated);
        theNewsFromApi.next(theNews);
      });
    return theNewsFromApi;
  }

  public postNews(theNews: News): void{
    let theNewsJson = '{' +
      '"title": "' + theNews.getTitle() + '",' +
      '"startdate": "' + this._functionsService.dateToString(theNews.getStartDate()) + '",' +
      '"enddate": "' + this._functionsService.dateToString(theNews.getEndDate()) + '",' +
      '"description": "' + theNews.getDescription() + '",' +
      '"activated": ' + theNews.getActivated() + '}';
    this._http.post(this._baseUrlApiNews, theNewsJson, httpOptions).subscribe(()=>{});
    console.log(theNewsJson);
  }

  public putNews(theNews: News): void{
    let theNewsJson = '{' +
      '"title": "' + theNews.getTitle() + '",' +
      '"startdate": "' + this._functionsService.dateToString(theNews.getStartDate()) + '",' +
      '"enddate": "' + this._functionsService.dateToString(theNews.getEndDate()) + '",' +
      '"description": "' + theNews.getDescription() + '",' +
      '"activated": ' + theNews.getActivated() + '}';
    this._http.put(this._baseUrlApiNews + '/' + theNews.getId().toString(), theNewsJson, httpOptions).subscribe(()=>{});
  }

  public deleteNews(newsId: number): void{
    this._http.delete(this._baseUrlApiNews + '/' + newsId, httpOptions).subscribe(()=>{});
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



  // REVIEWS
  public getAllReviews(): Subject<Review[]>{
    let tableGetApi: Review[] = [];
    let _allReviewsFromApi = new Subject<Review[]>();
    this._http.get(this._baseUrlApiPublications)
      .subscribe((allPosts: apiPublicationsFormat[])=>{
        allPosts.forEach(somePost => {
          let someReview: Review = new Review();
          someReview.user = new User();
          someReview.user.id = parseInt(somePost.idutilisateur.split('/')[3]);
          someReview.date = somePost.datepublication;
          someReview.comment = somePost.commentaire;
          someReview.idPartie = parseInt(somePost.idpartie.split('/')[3]);
          tableGetApi.push(someReview);
        });
        this._http.get(this._baseUrlApiNotes)
          .subscribe((allRates: apiNotesFormat[])=>{
            tableGetApi.forEach((someReview: Review)=>{
              allRates.forEach((someRate: apiNotesFormat) => {
                if(parseInt(someRate.idpartie.split('/')[3]) == someReview.idPartie){
                  someReview.rate = someRate.noteetoile;
                }
              });
            });
            this._http.get(this._baseUrlApiUtilisateurs)
              .subscribe((allUsers: apiUtilisateursFormat[])=>{
                tableGetApi.forEach((someReview: Review)=>{
                  allUsers.forEach((someUser: apiUtilisateursFormat) => {
                    if(someUser.id == someReview.user.id){
                      someReview.user.nom = someUser.nom;
                      someReview.user.prenom = someUser.prenom;
                    }
                  });
                });
                _allReviewsFromApi.next(tableGetApi);
              });
          });
      });
    return _allReviewsFromApi;
  }


  // DISPLAY PARAMETERS
  public getAllDisplayParameters(): Subject<DisplayParameters[]>{
    let tableGetApi: DisplayParameters[] = [];
    let _allDisplayParametersFromApi = new Subject<DisplayParameters[]>();
    this._http.get(this._baseUrlApiDisplayParameters)
      .subscribe((allDisplayParameters: apiDisplayParametersFormat[])=>{
        allDisplayParameters.forEach((someDisplayParameters: apiDisplayParametersFormat) => {
          let currentDP: DisplayParameters = new DisplayParameters();
          currentDP.id = someDisplayParameters.id;
          currentDP.displayName = someDisplayParameters.displayname;
          currentDP.parameter = someDisplayParameters.parameter;
          tableGetApi.push(currentDP);
        });
        _allDisplayParametersFromApi.next(tableGetApi);
      });
    return _allDisplayParametersFromApi;
  }

  public getDisplayParameterByName(name: string): Subject<DisplayParameters>{
    let theDP: Subject<DisplayParameters> = new Subject<DisplayParameters>();
    this._http.get(this._baseUrlApiDisplayParameters)
      .subscribe((allDP: apiDisplayParametersFormat[])=>{
        allDP.forEach((someDP: apiDisplayParametersFormat) => {
          if(someDP.displayname == name){
            let currentDP: DisplayParameters = new DisplayParameters();
            currentDP.id = someDP.id;
            currentDP.displayName = someDP.displayname;
            currentDP.parameter = someDP.parameter;
            theDP.next(currentDP);
          }
        });
      });
    return theDP;
  }

  public putDisplayParameter(theDP: DisplayParameters): void{
    let theDPJson: string = '{'+
      '"displayname":"' + theDP.displayName + '",' +
      '"parameter":"' + theDP.parameter + '"' +
      '}';
    this._http.put(this._baseUrlApiDisplayParameters + '/' + theDP.id, theDPJson, httpOptions).subscribe(()=>{});
  }
}
