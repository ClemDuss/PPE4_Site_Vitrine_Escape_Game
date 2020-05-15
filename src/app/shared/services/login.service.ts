import { Injectable } from '@angular/core';
import { LoginInformation } from '../models/login-information';
import { Router } from '@angular/router';
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //Défini, en heures, le temps au bout duquel l'utilisateur sera déconnecté 
  private _numberOfHourBeforeDisconnect: number = 1;

  constructor(
    private _functionsService: FunctionsService,
    private _route: Router,
  ) { }

  /**
   * Stock en local les informations de connexion
   * @param theLoginInformation information à stocker
   */
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

  /**
   * Réinitialise à zéro les informations de connexion stockées.
   * Bien pour la déconnexion d'un utilisateur
   */
  public resetLocalStorage(): void{
    let newLoginInformation: LoginInformation = new LoginInformation();
    localStorage.setItem('loginInformation', JSON.stringify(newLoginInformation));
    this._functionsService.openSuccessSnackBar("Déconnecté");
    //Retourne sur la page d'accueil du site
    this._route.navigate(['/']);
  }

  /**
   * Vérification de l'abilité de l'utilisateur à se rendre sur la partie gestion
   * Retourne vrai si il est accepté
   */
  public userCanGoToGestion(): boolean{
    let userCan: boolean = false;
    if(this.getLocalStorage() != null){
      let userInfo: LoginInformation = this.getLocalStorage();
      if(userInfo.stayConnected){
        userCan = true;
      }else{
        //vérification du temps depuis la connexion de l'utilisateur
        if(this.differenceBetweenTwoDates(new Date, this.getLocalStorage().connectionDate) < this._numberOfHourBeforeDisconnect){
          userCan = true;
        }
      }
    }
    return userCan
  }

  /**
   * Permet de vérifier si l'utilisatur est connecté.
   * Dans le cas contraire, il redirige automatiquement sur le menu d'accueil
   */
  public isUserConnected(){
    let isUserConnected: boolean = false;
    if(this.getLocalStorage() != null){
      let userInfo: LoginInformation = this.getLocalStorage();
      if(userInfo.stayConnected){
        isUserConnected = true;
      }else{
        //vérification du temps depuis la connexion de l'utilisateur
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

  /**
   * Calcul de la différence en heure entre deux dates
   * @param maxDate Date la plus récente
   * @param minDate Date la moins récente
   */
  private differenceBetweenTwoDates(maxDate: Date, minDate: Date): number{
    let nbOfDifferenceHours: number = null;
    let oneHour = 1000*60*60;
    let maxDateMs = maxDate.getTime();
    let minDateMs = minDate.getTime();
    let differenceMs = maxDateMs - minDateMs;
    nbOfDifferenceHours = Math.round(differenceMs/oneHour);
    return Math.abs(nbOfDifferenceHours);
  }
}
