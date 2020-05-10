import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Moment } from 'moment';
import { News } from 'src/app/shared/models/news';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NewsService } from 'src/app/shared/services/news.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  type: string,
  news: News
}

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  private _theNews: News;

  public dialogTitle: string ='Ajouter une nouvelle news';

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

  private _newsEditId: number;

  constructor(
    public dialogRef: MatDialogRef<NewsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar,
    private _newsService : NewsService,
  ) {
    this._theNews = new News();
    switch(data.type){
      case 'add':
        this.btn_validate_content = "Valider l'ajout";
        this.dialogTitle = "Ajouter une nouvelle news";
        break;
      case 'edit':
        this.btn_validate_content = "Valider les modifications";
        this.dialogTitle = "Modifier une news";
        this._theNews = data.news;
        this._newsEditId = this._theNews.getId();
        this.input_title_value = new FormControl(this._theNews.getTitle());
        this.datepicker_start_value = new FormControl(this._theNews.getStartDate());
        this.datepicker_end_value = new FormControl(this._theNews.getEndDate());
        this.input_description_value = new FormControl(this._theNews.getDescription());
        break;
    }
  }

  ngOnInit(): void {
  }

  public btn_validate_click(): void{
    if(this.input_title_value.value != null && this.datepicker_end_value.value != null && this.input_description_value.value != null){
      let theStartDate: string = null;
      let theEndDate: string;
      let theNews: News;

      theNews = new News();
      theNews.setTitle(this.input_title_value.value);
      theNews.setDescription(this.input_description_value.value);

      switch(this.data.type){
        case 'add':
          if(this.datepicker_start_value.value != null){
            theNews.setStartDate(this.datepicker_start_value.value.toDate());
          }
          theNews.setEndDate(this.datepicker_end_value.value.toDate());
          this._newsService.addNews(theNews);
          this.openSnackBar("News ajoutée !", "OK", 'success');
          break;
        case 'edit':
          theNews.setId(this._newsEditId);
          if(this.datepicker_start_value.value != null){
            theNews.setStartDate(this.datepicker_start_value.value);
          }else{
            theNews.setStartDate(null);
          }
          theNews.setEndDate(this.datepicker_end_value.value);
          this._newsService.editNews(theNews);
          this.openSnackBar("News modifiée !", "OK", 'success');
          break;
      }

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
          panelClass: ['error-snackbar']
        });
        break;
      case 'success':
        this._snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: position,
          panelClass: ['success-snackbar']
        });
        break;
    }
  }

}
