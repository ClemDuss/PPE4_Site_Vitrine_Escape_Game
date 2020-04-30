import { Injectable } from '@angular/core';
import { DisplayParameters } from '../models/display-parameters';
import { DisplayParametersData } from '../data/display-parameters-data';

@Injectable({
  providedIn: 'root'
})
export class DisplayParametersService {
  private _allDisplayParameters: DisplayParameters[];

  constructor() {
    this._allDisplayParameters = DisplayParametersData;
  }

  // GET
  public getDisplayParameterByName(name: string): string{
    let parameter: string = null;
    this._allDisplayParameters.forEach(element=>{
      if(element.getDisplayName() == name){
        parameter = element.getParameter();
      }
    });
    return parameter;
  }

  // SET
  public setDisplayParameterByName(name: string, parameter: string): void{
    this._allDisplayParameters.forEach(element=>{
      if(element.getDisplayName() == name){
        element.setParameter(parameter);
      }
    });
  }
}
