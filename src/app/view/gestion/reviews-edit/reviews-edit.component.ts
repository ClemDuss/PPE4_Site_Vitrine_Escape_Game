import { Component, OnInit } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsEditDisplayComponent } from './reviews-edit-display/reviews-edit-display.component';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { DisplayParametersService } from 'src/app/shared/services/display-parameters.service';
import { DisplayParameters } from 'src/app/shared/models/display-parameters';
import { LoginService } from 'src/app/shared/services/login.service';

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
  public btn_editDisplayMode_disable: boolean;

  public ratingSelection: Rating[] = [
    {value: '0', displayValue: '0'},
    {value: '1', displayValue: '1'},
    {value: '2', displayValue: '2'},
    {value: '3', displayValue: '3'},
    {value: '4', displayValue: '4'},
    {value: '5', displayValue: '5'}
  ]

  private _DPid: number;
  private _displayOption: string;
  public displayOptionName: string;
  public nbToDisplay: number;
  private _minRate: number = 0;
  private _maxRate: number = 5;

  constructor(
    private functionsService: FunctionsService,
    public dialog: MatDialog,
    private _reviewsService: ReviewsService,
    private _displayParametersService: DisplayParametersService,
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this._loginService.isUserConnected();
    this.btn_editDisplayMode_disable = true;
    this.refreshDisplayMode();
  }

  private refreshDisplayMode(): void{
    this._displayParametersService.getDisplayParameterByName('reviews').subscribe((someDP: DisplayParameters)=>{
      let selectedParam: string = someDP.parameter;
      this._DPid = someDP.id;
      this.nbToDisplay = parseInt(selectedParam.split(';')[1]);
      this._displayOption = selectedParam.split(';')[0];
      switch(selectedParam.split(';')[0]){
        case 'random':
          this.displayOptionName = 'aléatoire';
          break;
        case'byRating':
          this._minRate = parseInt(selectedParam.split(';')[2].split(',')[0]);
          this._maxRate = parseInt(selectedParam.split(';')[2].split(',')[1]);
          if(this._minRate == this._maxRate){
            this.displayOptionName = 'dont la note est de ' + this._maxRate;
          }else{
            this.displayOptionName = 'dont la note est comprise entre ' + this._minRate + ' et ' + this._maxRate;
          }
          break;
      }
      this.btn_editDisplayMode_disable = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewsEditDisplayComponent, {
      width: '500px',
      data: {DP_id: this._DPid, displayOption: this._displayOption, nbToDisplay: this.nbToDisplay, minRate: this._minRate, maxRate: this._maxRate}
    });

    dialogRef.afterClosed().subscribe(data=>{
      this.refreshDisplayMode();
    });
  }

  public btn_editDisplayMode_click(): void{
    this.openDialog();
  }
}
