import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Subject, Observable } from 'rxjs';
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
    private _apiService: ApiService,
  ) {
    this._lesNews.shift();

    this.refreshNews();

    this._selectedId.next(0);
    this._selectedNews.next(null);
  }

  //OBSERVABLE
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
    this._nombreNews.next(this._lesNews.length);
  }

  /**
   * Modifier les informations d'une news existante
   * @param theNews La news mopdifiée
   */
  public editNews(theNews: News): void{
    this._apiService.putNews(theNews);
    this.refreshNews();
  }

  /**
   * Supprime la news selon l'id
   * @param id ID de la News à supprimer
   */
  public deleteNews(id: number): void{
    this._apiService.deleteNews(id);
    this._selectedId.next(0);
    this._selectedNews.next(null);
    this.refreshNews();
  }

  /**
   * Change l'état d'activation de la news selon l'id
   * @param id id de la news
   */
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
   * Retourne toutes les news valide pour l'affichage.
   * A savoir, celles qui sont active et dont la date de fin n'est pas dépassée
   */
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
