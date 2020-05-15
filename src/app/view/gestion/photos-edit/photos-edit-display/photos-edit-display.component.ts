import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReviewsEditDisplayComponent } from '../../reviews-edit/reviews-edit-display/reviews-edit-display.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayParametersService } from 'src/app/shared/services/display-parameters.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

interface DialogData{
  DP_id: number;
  displayOption: string;
  nbToDisplay: number;
  minRate: number;
  maxRate: number;
}

@Component({
  selector: 'app-photos-edit-display',
  templateUrl: './photos-edit-display.component.html',
  styleUrls: ['./photos-edit-display.component.css']
})
export class PhotosEditDisplayComponent implements OnInit {
  public dialogTitle: string = "Modifier l'affichage des photos";

  public btn_cancel_content: string = "Annuler";

  public btn_valid_content: string = "Valider les modifications";

  public input_numberToDisplay_value: FormControl = new FormControl(4, Validators.max(20));

  constructor(
    public dialogRef: MatDialogRef<ReviewsEditDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _displayParametersService: DisplayParametersService,
    private _functionsService: FunctionsService,
    ) {
      this.input_numberToDisplay_value = new FormControl(data.nbToDisplay, Validators.max(20));
    }

  ngOnInit(): void {
  }

  public btn_valid_click(): void{
    let newNbToDisplay: number = this.input_numberToDisplay_value.value;
    if(newNbToDisplay != null){
      if(newNbToDisplay <= 20){
        this.savePicturesEditChanges()
      }else{
        this._functionsService.openErrorSnackBar("Maximum 20 photos");
      }
    }else{
      this._functionsService.openErrorSnackBar("Vous n'avez rien saisi");
    }
  }

  private savePicturesEditChanges(): void{
    console.log(this.data.DP_id)
    this._displayParametersService.setDisplayParameterByName(this.data.DP_id, 'pictures', 'random;' + this.input_numberToDisplay_value.value);
    this.dialogRef.close();
  }

}
