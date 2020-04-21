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

  private _nombreNews: Subject<Number> = new Subject<Number>();

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
  }

  //OBSERVER
  public getAllNewsObserver(): Observable<News[]>{
    return this._lesNewsSubject.asObservable();
  }

  public getNumberOfNews(): Observable<Number>{
    return this._nombreNews.asObservable();
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
    this.dev_addInNewsList(theNews);
    this.addNewsToDB(theNews);
    this.refreshNews();
    this._lesNewsSubject.next(this._lesNews);
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
}
