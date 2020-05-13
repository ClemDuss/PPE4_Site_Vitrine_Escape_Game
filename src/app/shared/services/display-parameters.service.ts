import { Injectable } from '@angular/core';
import { DisplayParameters } from '../models/display-parameters';
import { DisplayParametersData } from '../data/display-parameters-data';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayParametersService {
  private _allDisplayParameters: DisplayParameters[];

  constructor(
    private _apiService: ApiService,
  ) {
    this._allDisplayParameters = DisplayParametersData;
  }

  public getAllDisplayParameters(): Observable<DisplayParameters[]>{
    let allParameters: Subject<DisplayParameters[]> = new Subject<DisplayParameters[]>();
    this._apiService.getAllDisplayParameters().subscribe((data: DisplayParameters[])=>{
      allParameters.next(data);
    });
    return allParameters.asObservable();
  }

  // GET
  public getDisplayParameterByName(name: string): Observable<DisplayParameters>{
    let theDP: Subject<DisplayParameters> = new Subject<DisplayParameters>();
    this._apiService.getDisplayParameterByName(name).subscribe((someDP: DisplayParameters)=>{
      theDP.next(someDP);
    });
    return theDP.asObservable();
  }

  // SET
  public setDisplayParameterByName(id: number, name: string, parameter: string): void{
    /*this._allDisplayParameters.forEach(element=>{
      if(element.getDisplayName() == name){
        element.setParameter(parameter);
      }
    });*/
    let theDP: DisplayParameters = new DisplayParameters();
    theDP.id = id;
    theDP.displayName = name;
    theDP.parameter = parameter;
    console.log(theDP.parameter)
    this._apiService.putDisplayParameter(theDP);
  }
}
