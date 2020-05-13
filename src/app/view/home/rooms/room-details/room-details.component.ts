import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Room } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';

export interface DialogData {
  idVille: number,
  nomVille: string
}

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  private _idVille: number;
  private _nomVille: string;

  public btn_close_content: string = 'Fermer';

  public roomsInThisCity: Room[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoomDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _roomsService: RoomsService,
  ) {
    this._idVille = data.idVille;
    this._nomVille = data.nomVille;
  }

  ngOnInit(): void {
    this.refreshRoomsInThisCity();
  }

  public get idVille(): number{
    return this._idVille;
  }

  public get nomVille(): string{
    return this._nomVille;
  }

  private refreshRoomsInThisCity(){
    this._roomsService.getAllRooms().subscribe((allRooms)=>{
      this.roomsInThisCity = [];
      allRooms.forEach((someRoom)=>{
        if(someRoom.idVille == this.idVille){
          this.roomsInThisCity.push(someRoom);
        }
      });
    });
  }

  public getGoogleMapLink(lon: number, lat: number): string{
    let theLink: string;
    theLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1386.5979697837372!2d" + lat + "!3d" + lon + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDU4JzAyLjQiTiA2wrAwNycwMS40IkU!5e0!3m2!1sfr!2sfr!4v1589179435975!5m2!1sfr!2sfr"
    console.log(theLink);
    return theLink;
  }

}
