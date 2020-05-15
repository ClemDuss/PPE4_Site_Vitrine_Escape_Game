import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { Review } from 'src/app/shared/models/review';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  public title: string = 'Avis';

  public userReviewsList: Review[];
  public allReviews: Review[];

  public rateAverage: number;

  public pictoPath: string = '../../../../assets/images/picto/Stars/';
  public emptyStar: string = this.pictoPath + 'star_empty_white.svg';
  public fullStar: string = this.pictoPath + 'star_full_white.svg';
  public middleStar: string = this.pictoPath + 'star_middle_white.svg';

  constructor(
    private _reviewsService: ReviewsService,
  ) { }

  ngOnInit(): void {
    this.refreshAllReviews();
    this.refreshAverage();
  }

  /**
   * Actualise la moyenne de notation
   */
  private refreshAverage(): void{
    this._reviewsService.getRateAverage().subscribe((data: number)=>{
      this.rateAverage = data;
    });
  }

  /**
   * Actualise la liste des avis à afficher
   */
  private refreshAllReviews(): void{
    this._reviewsService.getAllReviews().subscribe((allReviews: Review[])=>{
      this.allReviews = allReviews;
    });
  }

  /**
   * Retourne le nombre d'avis à afficher
   */
  public getNumberOfReviews(): number{
    return this.userReviewsList.length;
  }

}
