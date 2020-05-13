import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Subject, Observable } from 'rxjs';
import { newsData } from '../data/news-data';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _lesNews: News[] = [new News()];
  private _lesNewsSubject: Subject<News[]> = new Subject<News[]>();

  private _nombreNews: Subject<number> = new Subject<number>();

  private _selectedId: Subject<number> = new Subject<number>();
  private _selectedActivated: Subject<boolean> = new Subject<boolean>();
  private _selectedNews: Subject<News> = new Subject<News>();

  constructor(
    private _http: HttpClient,
    private _apiService: ApiService,
  ) {
    let dev_newsData = newsData;
    dev_newsData.forEach(element=>{
      this.dev_addInNewsList(element);
    });

    this._lesNews.shift();

    this.refreshNews();

    this._selectedId.next(0);
    this._selectedNews.next(null);
  }

  //OBSERVER
  public getAllNewsObserver(): Observable<News[]>{
    return this._lesNewsSubject.asObservable();
  }

  public getNumberOfNews(): Observable<number>{
    return this._nombreNews.asObservable();
  }

  public getSelectedId(): Observable<number>{
    return this._selectedId.asObservable();
  }

  public getSelectedActivated(): Observable<boolean>{
    return this._selectedActivated.asObservable();
  }

  public getSelectedNews(): Observable<News>{
    return this._selectedNews.asObservable();
  }

  //FUNCTIONS

  /**
   * Met à jour la liste des News d'après la BDD
   * Refresh des observer
   */
  public refreshNews(): void{
    this._apiService.getAllNews().subscribe((data)=>{
      this._lesNews = data;
      this._lesNewsSubject.next(data);
    });

    //this._lesNewsSubject.next(this._lesNews);
    this._nombreNews.next(this._lesNews.length);
  }

  /**
   * Ajouter une nouvelle News à la BDD
   * @param theNews La News à ajouter
   */
  private addNewsToDB(theNews: News): void{

  }

  private dev_addInNewsList(theNews: News): void{
    this._lesNews.push(theNews);
  }

  /**
   * Modifier les informations d'une news existante
   * @param theNews La news mopdifiée
   */
  public editNews(theNews: News): void{
    /*this._lesNews.forEach(element=>{
      if(theNews.getId() == element.getId()){
        element.setTitle(theNews.getTitle());
        element.setDescription(theNews.getDescription());
        element.setStartDate(theNews.getStartDate());
        element.setEndDate(theNews.getEndDate());
      }
    });*/
    this._apiService.putNews(theNews);
    this.refreshNews();
  }

  public deleteNews(id: number): void{
    /*let indexToDelete: number = -1;
    this._lesNews.forEach(element=>{
      indexToDelete++;
      if(element.getId() == id){
        this._lesNews.splice(indexToDelete, 1);
      }
    });
    this._selectedNews.next(null);*/
    this._apiService.deleteNews(id);
    this._selectedId.next(0);
    this._selectedNews.next(null);
    this.refreshNews();
  }

  public changeActivatedState(id: number): void{
    this._lesNews.forEach(element=>{
      if(element.getId() == id){
        element.setActivated(!element.getActivated());
      }
    });
    this._apiService.getNewsById(id).subscribe((data)=>{
      data.setActivated(!data.getActivated());
      data.setStartDate(new Date(data.getStartDate().toString().substr(0, 10)));
      data.setEndDate(new Date(data.getEndDate().toString().substr(0, 10)));
      this._apiService.putNews(data);
    });
  }

  //SET

  /**
   * Ajouter une nouvelle News
   * @param title Titre de la News
   * @param startDate Date de début (null si un seul jour)
   * @param endDate Date de fin
   * @param description Contenu de la News
   */
  /*public addNews(title: string, startDate: Date, endDate: Date, description: string): void{
    let theNews: News;
    theNews = new News();
    theNews.setTitle(title);
    theNews.setStartDate(startDate);
    theNews.setEndDate(endDate);
    theNews.setDescription(description);
    this.dev_addInNewsList(theNews);
    this.addNewsToDB(theNews);
    this.refreshNews();
  }*/

  /**
   * Ajouter une nouvelle News
   * @param theNews La news à ajouter
   */
  public addNews(theNews: News): void{
    /*theNews.setId(this.dev_setId());
    this.dev_addInNewsList(theNews);
    this.addNewsToDB(theNews);*/
    this._apiService.postNews(theNews);
    this.refreshNews();
    //this._lesNewsSubject.next(this._lesNews);
  }

  /**
   * Sélectionner une news
   * @param id id de la news sélectionné
   */
  public setSelectedId(id: number): void{
    this._selectedId.next(id);
    this._selectedActivated.next();
    this._selectedNews.next(null);
    this._lesNews.forEach(theNews => {
      if(theNews.getId() == id){
        this._selectedNews.next(theNews);
      }
    });
  }

  private dev_setId(): number{
    let newId: number = 0;
    this._lesNews.forEach(element => {
      if(element.getId() > newId){
        newId = element.getId();
      }
    });
    newId++;
    return newId;
  }

  //GET

  /**
   * Retourne toutes les news enregistrées
   */
  public getAllNews(): News[]{
    let allNewsList: News[];
    this.refreshNews();
    allNewsList = this._lesNews;
    return allNewsList;
  }

  public getValidateNews(): Observable<News[]>{
    let selectedsNews: Subject<News[]> = new Subject<News[]>();
    let allNewsList: News[];
    this.refreshNews();
    allNewsList = this._lesNews;
    this._lesNewsSubject.subscribe((data: News[])=>{
      let currentNewsData: News[] = [new News()]
      data.forEach(element=>{
        if(element.getActivated() && element.getEndDate() >= new Date()){
          currentNewsData.push(element);
        }
      });
      currentNewsData.shift();
      selectedsNews.next(currentNewsData);
    });
    
    return selectedsNews.asObservable();
  }

  /**
   * Retourne la news en fonction de l'id
   * @param id Id de la news à retrouver
   */
  public getById(id: number): News{
    let news: News;
    this._lesNews.forEach(theNews => {
      if(theNews.getId() == id){
        news = theNews;
      }
    });
    return news;
  }
}
