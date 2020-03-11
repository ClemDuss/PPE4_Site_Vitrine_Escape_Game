import { Component, OnInit } from '@angular/core';

interface reviewsFormat{
  username: string;
  rating: number;
  comment: string;
}

const reviewsList: reviewsFormat[] = [
  {
    username: 'Patt',
    rating: 4,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices. Feugiat pretium nibh ipsum consequat nisl. Fringilla urna porttitor rhoncus dolor. Arcu non odio euismod lacinia at. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Et magnis dis parturient montes nascetur. Lorem ipsum dolor sit amet consectetur adipiscing elit. Volutpat consequat mauris nunc congue nisi vitae. Semper auctor neque vitae tempus quam pellentesque nec. Odio facilisis mauris sit amet massa vitae tortor condimentum. Ac odio tempor orci dapibus."
  },
  {
    username: 'Seb',
    rating: 3,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum at varius vel pharetra vel turpis nunc. Arcu odio ut sem nulla pharetra diam sit amet. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Tellus molestie nunc non blandit. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Fames ac turpis egestas integer eget aliquet. Pharetra magna ac placerat vestibulum. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Sed lectus vestibulum mattis ullamcorper. Odio facilisis mauris sit amet. Accumsan sit amet nulla facilisi. Morbi leo urna molestie at elementum. Purus in mollis nunc sed. Turpis egestas sed tempus urna et. Ut sem nulla pharetra diam."
  }
]

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  public title: string = 'Nos salles';

  public userReviewsList = reviewsList;

  public pictoPath: string = '../../../../assets/images/picto/Stars/';
  public emptyStar: string = this.pictoPath + 'star_empty_white.svg';
  public fullStar: string = this.pictoPath + 'star_full_white.svg';
  public middleStar: string = this.pictoPath + 'star_middle_white.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
