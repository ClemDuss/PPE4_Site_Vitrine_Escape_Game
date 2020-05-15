import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private _allRooms: Subject<Room[]> = new Subject<Room[]>();

  constructor(
    private _apiService: ApiService,
  ) { }

  /**
   * Retourne toutes les salles
   */
  public getAllRooms(): Observable<Room[]>{
    this._apiService.getAllRooms().subscribe((data: Room[])=>{
      this._allRooms.next(data);
    });
    return this._allRooms.asObservable();
  }
}
