import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import {Validators} from '@angular/forms'
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { DisplayParametersService } from 'src/app/shared/services/display-parameters.service';

interface Rating {
  value: string;
  displayValue: string;
}

interface DialogData{
  DP_id: number;
  displayOption: string;
  nbToDisplay: number;
  minRate: number;
  maxRate: number;
}

@Component({
  selector: 'app-reviews-edit-display',
  templateUrl: './reviews-edit-display.component.html',
  styleUrls: ['./reviews-edit-display.component.css']
})
export class ReviewsEditDisplayComponent implements OnInit {
  public dialogTitle: string = "Modifier l'affichage des avis";

  public btn_cancel_content: string = "Annuler";

  public btn_valid_content: string = "Valider les modifications";

  public displayRatingSelection: boolean = false;

  public select_minRate_value: FormControl = new FormControl();
  public select_maxRate_value: FormControl = new FormControl();
  public radio_displayMode_value: FormControl = new FormControl();
  public input_numberToDisplay_value: FormControl = new FormControl(4, Validators.max(20));

  public ratingSelection: Rating[] = [
    {value: '0', displayValue: '0'},
    {value: '1', displayValue: '1'},
    {value: '2', displayValue: '2'},
    {value: '3', displayValue: '3'},
    {value: '4', displayValue: '4'},
    {value: '5', displayValue: '5'}
  ]

  constructor(
    public dialogRef: MatDialogRef<ReviewsEditDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _functionsService: FunctionsService,
    private _displayParametersService: DisplayParametersService,
  ) {
    this.radio_displayMode_value = new FormControl(data.displayOption);
    this.input_numberToDisplay_value = new FormControl(data.nbToDisplay);
  }

  ngOnInit(): void {
  }

  public chx_option_change(option: string): void{
    if(option == 'byRating'){
      this.displayRatingSelection = true;
    }else{
      this.displayRatingSelection = false;
    }
  }

  public btn_valid_click(): void{
    if(this.radio_displayMode_value.value == null){
      this._functionsService.openErrorSnackBar("Vous devez sélectionner un mode d'affichage!", 4000)
    }else if(this.radio_displayMode_value.value == "byRating"){
      if(this.select_minRate_value.value == null && this.select_maxRate_value.value == null){
        this._functionsService.openErrorSnackBar("Vous devez remplir la plage de notation!", 4000)
      }else if(this.select_maxRate_value.value == null){
        this._functionsService.openErrorSnackBar("Vous devez renseigner la valeur maximale de la plage!", 4000);
      }else if(this.select_minRate_value.value == null){
        this._functionsService.openErrorSnackBar("Vous devez renseigner la valeur minimale de la plage!", 4000);
      }else if((this.select_minRate_value.value < 0 && this.select_minRate_value.value > 5) && (this.select_maxRate_value.value < 0 && this.select_maxRate_value.value > 5)){
        this._functionsService.openErrorSnackBar("Les valeurs min et max doivent être comprises entre 0 et 5.");
      }else if(this.select_minRate_value.value < 0 && this.select_minRate_value.value > 5){
        this._functionsService.openErrorSnackBar("Les valeurs min doit être comprise entre 0 et 5.");
      }else if(this.select_maxRate_value.value < 0 && this.select_maxRate_value.value > 5){
        this._functionsService.openErrorSnackBar("Les valeurs max doit être comprise entre 0 et 5.");
      }else if(this.select_maxRate_value.value < this.select_minRate_value.value){
        this._functionsService.openErrorSnackBar("La valeur maximale ne peut pas être inférieure à la valeur minimale!", 4000)
      }else{
        this._functionsService.openSuccessSnackBar("Affichage des avis selon la notation! Pour les notes comprises entre " + this.select_minRate_value.value + " et " + this.select_maxRate_value.value + ".", 6000);
        if(this.input_numberToDisplay_value.value > 20){
          this._functionsService.openErrorSnackBar("Vous pouvez afficher maximum 20 avis.", 4000);
        }else if(this.input_numberToDisplay_value.value < 0){
          this._functionsService.openErrorSnackBar("Il n'est pas possible d'afficher moins de 0 avis...", 4000);
        }else{
          this.saveReviewsEditChanges();
        }
      }
    }else{
      this._functionsService.openSuccessSnackBar("Affichage des avis aléatoirement!", 4000);
      if(this.input_numberToDisplay_value.value > 20){
        this._functionsService.openErrorSnackBar("Vous pouvez afficher maximum 20 avis.", 4000);
      }else if(this.input_numberToDisplay_value.value < 0){
        this._functionsService.openErrorSnackBar("Il n'est pas possible d'afficher moins de 0 avis...", 4000);
      }else{
        this.saveReviewsEditChanges();
      }
    }
  }

  private saveReviewsEditChanges(): void{
    switch(this.radio_displayMode_value.value){
      case 'random':
        this._displayParametersService.setDisplayParameterByName(this.data.DP_id, 'reviews', 'random;' + this.input_numberToDisplay_value.value);
        break;
      case 'byRating':
        this._displayParametersService.setDisplayParameterByName(this.data.DP_id, 'reviews', 'byRating;' + this.input_numberToDisplay_value.value + ";" + this.select_minRate_value.value + "," + this.select_maxRate_value.value);
        break;
    }
    this.dialogRef.close();
  }

}
