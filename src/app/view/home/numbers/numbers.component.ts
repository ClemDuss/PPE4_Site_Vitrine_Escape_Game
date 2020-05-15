import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {
  public title: string = 'Les chiffres';

  public numberOfCitys: number;
  public numberOfRooms: number;
  public numberOfUsers: number;

  constructor(
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.setUserCount();
    this.setRoomsCount();
    this.setCitysCount();
  }

  private setUserCount(){
    this._apiService.countAllUsers().subscribe((data: number)=>{
      this.numberOfUsers = data;
    });
  }

  private setRoomsCount(){
    this._apiService.countAllRooms().subscribe((data: number)=>{
      this.numberOfRooms = data;
    });
  }

  private setCitysCount(){
    this._apiService.countAllCitys().subscribe((data: number)=>{
      this.numberOfCitys = data;
    });
  }

}
