import { Injectable } from '@angular/core';
import { DisplayParametersService } from './display-parameters.service';
import { Review } from '../models/review';
import { ReviewsData } from '../data/reviews-data';
import { Subject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DisplayParameters } from '../models/display-parameters';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private _displayReviewsParameter: string;

  private _allReviews: Review[];
  public allReviews: Review[];

  private _nbOfReviewsToDisplay: number;

  constructor(
    private _displayParametersService: DisplayParametersService,
    private _apiService: ApiService,
  ) { 
    //this.refreshDisplayReviewsParameter();
    
    this._allReviews = ReviewsData;
  }

  /**
   * Actualise les paramètres d'affichage d'après la BDD
   */
  private refreshDisplayReviewsParameter(): void{
    this._displayParametersService.getDisplayParameterByName('reviews').subscribe((someDP: DisplayParameters)=>{
      this._displayReviewsParameter = someDP.parameter;
    });
    this._nbOfReviewsToDisplay = parseInt(this._displayReviewsParameter.split(';')[1]);
  }

  /**
   * Retourne la note moyenne des utilisateurs
   */
  public getRateAverage(): Observable<number>{
    let subjectAverage: Subject<number> = new Subject<number>();
    this._apiService.getGlobalRateAverage().subscribe((average: number)=>{
      subjectAverage.next(average);
    });
    return subjectAverage.asObservable();
  }

  /**
   * Retourne tous les avis selon le paramètre d'affichage
   */
  public getAllReviews(): Observable<Review[]>{
    let allReviewsFromApi: Subject<Review[]> = new Subject<Review[]>();
    this._displayParametersService.getAllDisplayParameters().subscribe((allDP: DisplayParameters[])=>{
      let reviewsParameter: DisplayParameters = new DisplayParameters('reviews', 'random;4');
      allDP.forEach((someDP: DisplayParameters) => {
        if(someDP.getDisplayName() == 'reviews'){
          reviewsParameter = someDP;
        }
      });
      let parameter: string = reviewsParameter.getParameter().split(';')[0];
      //Affichage selon le paramètre enregistré
      switch(parameter){
        case 'random':
          this._apiService.getAllReviews().subscribe((allReviews: Review[])=>{
            allReviewsFromApi.next([]);
            let newAllReviews: Review[] = [];
            let nbOfReviews: number = parseInt(reviewsParameter.getParameter().split(';')[1]);
            let maxRate: number = 5;
            let minRate: number = 0;
            let continueToLoop: boolean = true;
            let loopCount: number = 0;
            while(continueToLoop){
              let randomSelectedReview = allReviews[Math.floor(Math.random() * allReviews.length)];
              if(newAllReviews.length-1 != allReviews.length && newAllReviews.length < nbOfReviews && loopCount <= 100){
                if(!(newAllReviews.includes(randomSelectedReview))){
                  if(minRate <= randomSelectedReview.getRate() && randomSelectedReview.getRate() <= maxRate){
                    newAllReviews.push(randomSelectedReview);
                  }
                }
              }else{
                continueToLoop = false;
              }
              loopCount++;
            }
            allReviewsFromApi.next(newAllReviews);
          });
          break;
        case 'byRating':
          this._apiService.getAllReviews().subscribe((allReviews: Review[])=>{
            allReviewsFromApi.next([]);
            let newAllReviews: Review[] = [];
            let nbOfReviews: number = parseInt(reviewsParameter.getParameter().split(';')[1]);
            let maxRate: number = parseInt(reviewsParameter.getParameter().split(';')[2].split(',')[1]);
            let minRate: number = parseInt(reviewsParameter.getParameter().split(';')[2].split(',')[0]);
            let continueToLoop: boolean = true;
            let loopCount: number = 0;
            while(continueToLoop){
              let randomSelectedReview = allReviews[Math.floor(Math.random() * allReviews.length)];
              if(newAllReviews.length-1 != allReviews.length && newAllReviews.length < nbOfReviews && loopCount <= 100){
                if(!(newAllReviews.includes(randomSelectedReview))){
                  if(minRate <= randomSelectedReview.getRate() && randomSelectedReview.getRate() <= maxRate){
                    newAllReviews.push(randomSelectedReview);
                  }
                }
              }else{
                continueToLoop = false;
              }
              loopCount++;
            }
            allReviewsFromApi.next(newAllReviews);
          });
          break;
      }
    });
    return allReviewsFromApi.asObservable();
  }

  // GET
  /**
   * Retourne le nombre d'avis à afficher
   */
  public getNbOfReviewsToDisplay(): number{
    this.refreshDisplayReviewsParameter();
    return this._nbOfReviewsToDisplay;
  }

  /**
   * Retourne le paramètre d'affichage
   */
  public getSelectedParameter(): string{
    this.refreshDisplayReviewsParameter();
    return this._displayReviewsParameter;
  }
}
