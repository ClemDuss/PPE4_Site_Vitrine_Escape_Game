import { Injectable } from '@angular/core';
import { News } from '../models/news';
import * as moment from 'moment';
import { Subject, Observable } from 'rxjs';

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

  constructor() {
    let tempNews = new News();
    tempNews.setId(1);
    tempNews.setTitle('Avant Noël');
    tempNews.setStartDate(new Date('2018-12-21 12:02:00'));
    tempNews.setEndDate(new Date('2018-12-21 12:02:00'));
    tempNews.setDescription('C\'est une courte description que je vois là !');
    tempNews.setActivated(true);
    this.dev_addInNewsList(tempNews);

    tempNews = new News();
    tempNews.setId(2);
    tempNews.setTitle('Avant Noël');
    tempNews.setStartDate(new Date('2018-12-21 12:02:00'));
    tempNews.setEndDate(new Date('2018-12-21 12:02:00'));
    tempNews.setDescription('C\'est une courte description que je vois là !');
    tempNews.setActivated(true);
    this.dev_addInNewsList(tempNews);

    tempNews = new News();
    tempNews.setId(3);
    tempNews.setTitle('Avant Noël');
    tempNews.setStartDate(new Date('2018-12-21 12:02:00'));
    tempNews.setEndDate(new Date('2018-12-21 12:02:00'));
    tempNews.setDescription('C\'est une courte description que je vois là !');
    tempNews.setActivated(true);
    this.dev_addInNewsList(tempNews);

    tempNews = new News();
    tempNews.setId(4);
    tempNews.setTitle('Avant Noël');
    tempNews.setStartDate(new Date('2018-12-21 12:02:00'));
    tempNews.setEndDate(new Date('2018-12-21 12:02:00'));
    tempNews.setDescription('C\'est une courte description que je vois là !');
    tempNews.setActivated(false);
    this.dev_addInNewsList(tempNews);

    tempNews = new News();
    tempNews.setId(5);
    tempNews.setTitle('Avant Noël');
    tempNews.setStartDate(new Date('2018-12-21 12:02:00'));
    tempNews.setEndDate(new Date('2018-12-21 12:02:00'));
    tempNews.setDescription('C\'est une courte description que je vois là !');
    tempNews.setActivated(true);
    this.dev_addInNewsList(tempNews);

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
    this._lesNewsSubject.next(this._lesNews);
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
    this._lesNews.forEach(element=>{
      if(theNews.getId() == element.getId()){
        element.setTitle(theNews.getTitle());
        element.setDescription(theNews.getDescription());
        element.setStartDate(theNews.getStartDate());
        element.setEndDate(theNews.getEndDate());
      }
    });
    this.refreshNews();
  }

  public deleteNews(id: number): void{
    let indexToDelete: number = -1;
    this._lesNews.forEach(element=>{
      indexToDelete++;
      if(element.getId() == id){
        this._lesNews.splice(indexToDelete, 1);
      }
    });
    this._selectedNews.next(null);
    this.refreshNews();
  }

  public changeActivatedState(id: number): void{
    this._lesNews.forEach(element=>{
      if(element.getId() == id){
        element.setActivated(!element.getActivated());
      }
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
    theNews.setId(this.dev_setId());
    this.dev_addInNewsList(theNews);
    this.addNewsToDB(theNews);
    this.refreshNews();
    this._lesNewsSubject.next(this._lesNews);
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
