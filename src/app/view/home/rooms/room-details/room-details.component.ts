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

  /**
   * Retourne l'id de la ville
   */
  public get idVille(): number{
    return this._idVille;
  }

  /**
   * Retourne le nomn de la ville
   */
  public get nomVille(): string{
    return this._nomVille;
  }

  /**
   * Actualise la liste des salles de la ville sélectionnée
   */
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

}
