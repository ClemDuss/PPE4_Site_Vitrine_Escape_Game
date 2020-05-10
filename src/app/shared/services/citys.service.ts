import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { City } from '../models/city';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitysService {
  private _allCitys: Subject<City[]> = new Subject<City[]>();

  constructor(
    private _apiService: ApiService,
  ) { }

  public getAllCitys(): Observable<City[]>{
    this._apiService.getAllCitys().subscribe((data)=>{
      this._allCitys.next(data);
    });
    return this._allCitys.asObservable();
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
