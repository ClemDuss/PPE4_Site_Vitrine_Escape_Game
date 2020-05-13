import { Injectable } from '@angular/core';
import { DisplayParametersService } from './display-parameters.service';
import { Review } from '../models/review';
import { ReviewsData } from '../data/reviews-data';
import { Subject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DisplayParameters } from '../models/display-parameters';
import { newArray } from '@angular/compiler/src/util';

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

  private refreshDisplayReviewsParameter(): void{
    this._displayParametersService.getDisplayParameterByName('reviews').subscribe((someDP: DisplayParameters)=>{
      this._displayReviewsParameter = someDP.parameter;
    });
    this._nbOfReviewsToDisplay = parseInt(this._displayReviewsParameter.split(';')[1], 32);
  }

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
  public getNbOfReviewsToDisplay(): number{
    this.refreshDisplayReviewsParameter();
    return this._nbOfReviewsToDisplay;
  }

  /*public getAllReviews(): Review[]{
    let allReviews: Review[];
    this.refreshDisplayReviewsParameter();
    let parameterName: string = this._displayReviewsParameter.split(';')[0];
    let nbOfReviewsToDisplay: number = parseInt(this._displayReviewsParameter.split(';')[1], 32);
    if(parameterName == 'random'){
      if(nbOfReviewsToDisplay > 0){
        allReviews = this.getReviewsByParameter(nbOfReviewsToDisplay);
      }
    }
    if(parameterName == 'byRating'){
      if(nbOfReviewsToDisplay > 0){
        allReviews = this.getReviewsByParameter(
          nbOfReviewsToDisplay,
          parseInt(this._displayReviewsParameter.split(';')[2].split(',')[0], 32),
          parseInt(this._displayReviewsParameter.split(';')[2].split(',')[1], 32)
        );
      }
    }
    
    return allReviews;
  }*/

  private getReviewsByParameter(nbOfReviews: number = 4, minRate: number = 0, maxRate: number = 5): Review[]{
    let selectedsReviews: Review[] = [new Review()];
    let continueToLoop: boolean = true;
    let loopCount: number = 0;
    while(continueToLoop){
      let randomSelectedReview: Review = this._allReviews[Math.floor(Math.random() * this._allReviews.length)];
      if(selectedsReviews.length-1 != this._allReviews.length && selectedsReviews.length <= nbOfReviews && loopCount <= 100){
        if(!(selectedsReviews.includes(randomSelectedReview))){
          if(minRate <= randomSelectedReview.getRate() && randomSelectedReview.getRate() <= maxRate){
            selectedsReviews.push(randomSelectedReview);
          }
        }
      }else{
        continueToLoop = false;
      }
      loopCount++;
    }
    selectedsReviews.shift();
    return selectedsReviews;
  }

  public getSelectedParameter(): string{
    this.refreshDisplayReviewsParameter();
    return this._displayReviewsParameter;
  }
}
