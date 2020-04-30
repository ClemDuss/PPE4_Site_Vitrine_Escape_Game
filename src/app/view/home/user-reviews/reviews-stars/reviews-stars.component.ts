import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-stars',
  templateUrl: './reviews-stars.component.html',
  styleUrls: ['./reviews-stars.component.css']
})
export class ReviewsStarsComponent implements OnInit {
  @Input() rating: number;

  constructor() { }

  ngOnInit(): void {
  }

}
