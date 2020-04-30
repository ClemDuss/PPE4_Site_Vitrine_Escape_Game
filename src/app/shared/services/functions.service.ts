import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  /**
   * Revenir au menu de gestion
   */
  public backToGestionView(){
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host;
    var backLink = document.createElement('a');
    document.body.appendChild(backLink);
    backLink.href = baseUrl + '/gestion';
    backLink.click();
    document.body.removeChild(backLink);
  }

  /**
   * Retourne une chaine en Date. 
   * Respecter le format 'yyyy-mm-dd'
   * @param theString La chaine à transformer
   */
  public stringToDate(theString: string): Date{
    let theDate: Date;
    theDate = new Date(theString);
    return theDate;
  }

  /**
   * Retourne une date en string au format yyyy-mm-dd
   * @param theDate La date à transformer
   */
  public dateToString(theDate: Date): string{
    let theString: string;
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(theDate);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(theDate);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(theDate);
    theString = `${year}-${month}-${day}`;
    return theString;
  }

  /**
   * Retourne une date en string au format yyyy-mm-dd
   * @param theDate La date à transformer
   */
  public dateToStringToDisplay(theDate: Date): string{
    let theString: string;
    const year = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(theDate);
    const month = new Intl.DateTimeFormat('fr', { month: 'long' }).format(theDate);
    const day = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(theDate);
    theString = `${day} ${month} ${year}`;
    return theString;
  }

  /**
   * Affichage d'une SnackBar 'Error' à savoir rouge
   * @param message Message d'alerte
   * @param actionBtnContent Texte du bouton d'action (qui dit avoir pris connaissance de l'alerte)
   * @param delay temps d'affichage de l'alerte avant fermeture
   * @param position position verticale de la snackBar
   */
  public openErrorSnackBar(message: string, delay: number = 2000, actionBtnContent: string = "OK", position: MatSnackBarVerticalPosition = 'top'): void{
    this._snackBar.open(message, actionBtnContent, {
      duration: 2000,
      verticalPosition: position,
      panelClass: ['error-snackbar']
    });
  }

  /**
   * Affichage d'une SnackBar 'Success' à savoir verte
   * @param message Message d'alerte
   * @param actionBtnContent Texte du bouton d'action (qui dit avoir pris connaissance de l'alerte)
   * @param delay temps d'affichage de l'alerte avant fermeture
   * @param position position verticale de la snackBar
   */
  public openSuccessSnackBar(message: string, delay: number = 2000, actionBtnContent: string = "OK", position: MatSnackBarVerticalPosition = 'top'): void{
    this._snackBar.open(message, actionBtnContent, {
      duration: 2000,
      verticalPosition: position,
      panelClass: ['success-snackbar']
    });
  }
}
