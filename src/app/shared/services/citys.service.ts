import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { City } from '../models/city';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitysService {

  constructor(
    private _apiService: ApiService,
  ) { }

  /**
   * Retourne toutes les villes
   */
  public getAllCitys(): Observable<City[]>{
    let allCitys: Subject<City[]> = new Subject<City[]>();
    this._apiService.getAllCitys().subscribe((data)=>{
      allCitys.next(data);
    });
    return allCitys.asObservable();
  }

  /**
   * Retourne la ville selon l'ID
   * @param id id de la ville a chercher
   */
  public getCityById(id: number): Observable<City>{
    let theCity: Subject<City> = new Subject<City>();
    this.getAllCitys().subscribe((data)=>{
      let allCitys: City[] = data;
      allCitys.forEach(element => {
        if(element.id == id){
          theCity.next(element);
        }
      });
    });
    return theCity;
  }

  
}
