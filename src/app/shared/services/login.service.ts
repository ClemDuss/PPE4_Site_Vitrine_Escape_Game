import { Injectable } from '@angular/core';
import { LoginInformation } from '../models/login-information';
import { Router } from '@angular/router';
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _numberOfHourBeforeDisconnect: number = 1;

  constructor(
    private _functionsService: FunctionsService,
    private _route: Router,
  ) { }

  public setLocalStorage(theLoginInformation: LoginInformation): void{
    localStorage.setItem('loginInformation', JSON.stringify(theLoginInformation));
  }

  public getLocalStorage(): LoginInformation{
    let theLoginInformation: LoginInformation = null;
    if(localStorage.getItem('loginInformation') != undefined){
      if(localStorage.getItem('loginInformation') != null){
        theLoginInformation = new LoginInformation();
        theLoginInformation.email = JSON.parse(localStorage.getItem('loginInformation'))._email;
        theLoginInformation.connectionDate = new Date(JSON.parse(localStorage.getItem('loginInformation'))._connectionDate);
        theLoginInformation.stayConnected = JSON.parse(localStorage.getItem('loginInformation'))._stayConnected;
      }
    }
    return theLoginInformation;
  }

  public resetLocalStorage(): void{
    let newLoginInformation: LoginInformation = new LoginInformation();
    localStorage.setItem('loginInformation', JSON.stringify(newLoginInformation));
    this._functionsService.openSuccessSnackBar("Déconnecté");
    this._route.navigate(['/']);
  }

  public userCanGoToGestion(): boolean{
    let userCan: boolean = false;
    if(this.getLocalStorage() != null){
      let userInfo: LoginInformation = this.getLocalStorage();
      if(userInfo.stayConnected){
        userCan = true;
      }else{
        if(this.differenceBetweenTwoDates(new Date, this.getLocalStorage().connectionDate) < this._numberOfHourBeforeDisconnect){
          userCan = true;
        }
      }
    }
    return userCan
  }

  public isUserConnected(){
    let isUserConnected: boolean = false;
    if(this.getLocalStorage() != null){
      let userInfo: LoginInformation = this.getLocalStorage();
      if(userInfo.stayConnected){
        isUserConnected = true;
      }else{
        if(this.differenceBetweenTwoDates(new Date, this.getLocalStorage().connectionDate) < this._numberOfHourBeforeDisconnect){
          isUserConnected = true;
        }
      }
    }
    if(!isUserConnected){
      this._route.navigate(['/']);
      this._functionsService.openErrorSnackBar("Vous devez être connecté pour accéder à cette page.", 4000);
    }
  }

  private differenceBetweenTwoDates(maxDate: Date, minDate: Date): number{
    let nbOfDifferenceHours: number = null;
    let oneHour = 1000*60*60;
    let maxDateMs = maxDate.getTime();
    let minDateMs = minDate.getTime();
    let differenceMs = maxDateMs - minDateMs;
    nbOfDifferenceHours = Math.round(differenceMs/oneHour);
    return nbOfDifferenceHours;
  }
}
