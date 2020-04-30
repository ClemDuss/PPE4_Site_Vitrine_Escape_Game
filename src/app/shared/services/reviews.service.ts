import { Injectable } from '@angular/core';
import { DisplayParametersService } from './display-parameters.service';
import { Review } from '../models/review';
import { ReviewsData } from '../data/reviews-data';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private _displayReviewsParameter: string;

  private _allReviews: Review[];

  private _nbOfReviewsToDisplay: number;

  constructor(
    private _displayParametersService: DisplayParametersService,
  ) { 
    this.refreshDisplayReviewsParameter();

    this._allReviews = ReviewsData;
  }

  private refreshDisplayReviewsParameter(): void{
    this._displayReviewsParameter = this._displayParametersService.getDisplayParameterByName('reviews');
    this._nbOfReviewsToDisplay = parseInt(this._displayReviewsParameter.split(';')[1], 32);
  }

  // GET
  public getNbOfReviewsToDisplay(): number{
    this.refreshDisplayReviewsParameter();
    return this._nbOfReviewsToDisplay;
  }

  public getAllReviews(): Review[]{
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
  }

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
