import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-stars',
  templateUrl: './reviews-stars.component.html',
  styleUrls: ['./reviews-stars.component.css']
})
export class ReviewsStarsComponent implements OnInit {
  //note sur 5
  @Input() rating: number;

  public fullStarsToDisplay: number[] = [];
  public emptyStarsToDisplay: number[] = [];

  constructor() { }

  ngOnInit(): void {
    //Création de tableaux pour afficher le bon nombre d'étoiles vides et pleines dans la vue
    for(let i = 0; i < this.rating; i++){
      this.fullStarsToDisplay.push(0);
    }
    for(let i = 0; i < 5-this.rating; i++){
      this.emptyStarsToDisplay.push(0);
    }
  }

}
