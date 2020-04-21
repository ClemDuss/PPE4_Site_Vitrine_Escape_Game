import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

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
}
