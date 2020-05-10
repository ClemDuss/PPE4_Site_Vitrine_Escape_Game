import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Room } from 'src/app/shared/models/room';

export interface DialogData {
  idVille: number
}

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  private _idVille: number;

  constructor(
    public dialogRef: MatDialogRef<RoomDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this._idVille = data.idVille;
  }

  ngOnInit(): void {
  }

}
