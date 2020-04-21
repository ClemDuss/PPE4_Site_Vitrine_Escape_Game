import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Moment } from 'moment';
import { News } from 'src/app/shared/models/news';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NewsService } from 'src/app/shared/services/news.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

export interface DialogData {
  title: string;
  startDate: Moment;
  endDate: Moment;
  description: string;
}

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  private _theNews: News = new News;

  public btn_validate_content: string = 'Valider';
  public btn_cancel_content: string = 'Annuler';

  public input_title_content: string = 'Titre';
  public input_title_value: FormControl = new FormControl();

  public datepicker_start_content: string = 'Date de début';
  public datepicker_start_value: FormControl = new FormControl();

  public datepicker_end_content: string = 'Date de fin';
  public datepicker_end_value: FormControl = new FormControl();

  public input_description_content: string = 'Description';
  public input_description_value: FormControl = new FormControl();
  public input_description_placeholder: string = 'Entrez la description de la news';

  constructor(
    public dialogRef: MatDialogRef<NewsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar,
    private _newsService : NewsService,
  ) { }

  ngOnInit(): void {
  }

  public btn_validate_click(): void{
    if(this.input_title_value.value != null && this.datepicker_end_value.value != null && this.input_description_value.value != null){
      let theStartDate: string = null;
      let theEndDate: string;
      let theNews: News;

      theNews = new News();
      theNews.setTitle(this.input_title_value.value);
      if(this.datepicker_start_value.value != null){
        theNews.setStartDate(this.datepicker_start_value.value.toDate());
      }
      theNews.setEndDate(this.datepicker_end_value.value.toDate());
      theNews.setDescription(this.input_description_value.value);

      this._newsService.addNews(theNews);

      this.openSnackBar("News ajoutée !", "OK", 'success');

      this.dialogRef.close();
    }else{
      this.openSnackBar("Les champs 'Titre', 'Date de fin' et 'Description' doivent être renseignés !", "OK", 'error');
    }
  }

  public btn_cancel_click(): void{
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string, type: 'success'|'error', position: MatSnackBarVerticalPosition = 'top') {
    switch(type){
      case 'error':
        this._snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: position,
          panelClass: ['form-modal-error-snackbar']
        });
        break;
      case 'success':
        this._snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: position,
          panelClass: ['form-modal-success-snackbar']
        });
        break;
    }
  }

}
