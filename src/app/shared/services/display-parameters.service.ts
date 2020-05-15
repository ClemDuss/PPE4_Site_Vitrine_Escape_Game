import { Injectable } from '@angular/core';
import { DisplayParameters } from '../models/display-parameters';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayParametersService {

  constructor(
    private _apiService: ApiService,
  ) { }

  /**
   * Retourne tous les paramètres d'affichage existants
   */
  public getAllDisplayParameters(): Observable<DisplayParameters[]>{
    let allParameters: Subject<DisplayParameters[]> = new Subject<DisplayParameters[]>();
    this._apiService.getAllDisplayParameters().subscribe((data: DisplayParameters[])=>{
      allParameters.next(data);
    });
    return allParameters.asObservable();
  }

  /**
   * Cherche un paramètre selon son nom
   * @param name nom du paramètre
   */
  public getDisplayParameterByName(name: string): Observable<DisplayParameters>{
    let theDP: Subject<DisplayParameters> = new Subject<DisplayParameters>();
    this._apiService.getDisplayParameterByName(name).subscribe((someDP: DisplayParameters)=>{
      theDP.next(someDP);
    });
    return theDP.asObservable();
  }

  /**
   * Met à jour un paramètre d'affichage
   * @param id id du paramètre
   * @param name nom du paramètre
   * @param parameter options du paramètre
   */
  public setDisplayParameterByName(id: number, name: string, parameter: string): void{
    let theDP: DisplayParameters = new DisplayParameters();
    theDP.id = id;
    theDP.displayName = name;
    theDP.parameter = parameter;
    this._apiService.putDisplayParameter(theDP);
  }
}
