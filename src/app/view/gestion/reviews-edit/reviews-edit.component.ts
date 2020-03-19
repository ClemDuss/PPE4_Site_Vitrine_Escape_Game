import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-edit',
  templateUrl: './reviews-edit.component.html',
  styleUrls: ['./reviews-edit.component.css']
})
export class ReviewsEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des avis'

  constructor() { }

  ngOnInit(): void {
  }

}
