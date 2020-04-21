import { Component, OnInit } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { FunctionsService } from 'src/app/shared/services/functions.service';

interface Rating {
  value: string;
  displayValue: string;
}

@Component({
  selector: 'app-reviews-edit',
  templateUrl: './reviews-edit.component.html',
  styleUrls: ['./reviews-edit.component.css']
})
export class ReviewsEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des avis';

  public chx_selectedOption;

  public displayRatingSelection: boolean = false;

  public ratingSelection: Rating[] = [
    {value: '0', displayValue: '0'},
    {value: '1', displayValue: '1'},
    {value: '2', displayValue: '2'},
    {value: '3', displayValue: '3'},
    {value: '4', displayValue: '4'},
    {value: '5', displayValue: '5'}
  ]

  constructor(
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  public chx_valueChange(selectedValue: string): void{
    if(selectedValue == 'byRating'){
      this.displayRatingSelection = true;
    }else{
      this.displayRatingSelection = false;
    console.log('salut');
    }
  }

  public btn_saveChanges_click(): void{
    this.functionsService.backToGestionView();
  }
}
