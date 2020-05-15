import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(
    private _apiService: ApiService,
  ) { }

  /**
   * Retourne tous les utilisateurs membres du personnel
   */
  public getAllUsersPersonnel(): Observable<User[]>{
    let allUsersPersonnel: Subject<User[]> = new Subject<User[]>();
    this._apiService.getAllUsersPersonnel().subscribe((allUsers: User[])=>{
      allUsersPersonnel.next(allUsers);
    });
    return allUsersPersonnel.asObservable();
  }
}
