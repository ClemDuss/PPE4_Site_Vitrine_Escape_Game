import { Component, OnInit } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsEditDisplayComponent } from './reviews-edit-display/reviews-edit-display.component';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

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

  public btn_editDisplayMode_content: string = "Modifier le mode d'affichage";
  public btn_editDisplayMode_icon: string = "edit";

  public ratingSelection: Rating[] = [
    {value: '0', displayValue: '0'},
    {value: '1', displayValue: '1'},
    {value: '2', displayValue: '2'},
    {value: '3', displayValue: '3'},
    {value: '4', displayValue: '4'},
    {value: '5', displayValue: '5'}
  ]

  public displayOptionName: string;
  public nbToDisplay: number;

  constructor(
    private functionsService: FunctionsService,
    public dialog: MatDialog,
    private _reviewsService: ReviewsService,
  ) {
    this.refreshDisplayMode();
  }

  ngOnInit(): void {
  }

  private refreshDisplayMode(): void{
    this.displayOptionName = "";
    let selectedParam: string = this._reviewsService.getSelectedParameter();
    this.nbToDisplay = parseInt(selectedParam.split(';')[1], 32);
    switch(selectedParam.split(';')[0]){
      case 'random':
        this.displayOptionName = 'aléatoire';
        break;
      case'byRating':
        this.displayOptionName = 'dont la note est comprise entre ' + selectedParam.split(';')[2].split(',')[0] + ' et ' + selectedParam.split(';')[2].split(',')[1];
        break;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewsEditDisplayComponent, {
      width: '500px',
      //data: {type: 'add', news: new News()}
    });

    dialogRef.afterClosed().subscribe(data=>{
      this.refreshDisplayMode();
    });
  }

  public btn_editDisplayMode_click(): void{
    this.openDialog();
  }
}
