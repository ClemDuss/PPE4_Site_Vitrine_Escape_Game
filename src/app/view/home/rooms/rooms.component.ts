import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { Room } from 'src/app/shared/models/room';
import { City } from 'src/app/shared/models/city';
import { CitysService } from 'src/app/shared/services/citys.service';
import { MatDialog } from '@angular/material/dialog';
import { RoomDetailsComponent } from './room-details/room-details.component';

interface roomsFormat {
  idVille: number
  nomVille: string;
  nbSalles: number;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public title:string = 'Salles';

  public roomsList: roomsFormat[];

  public _allRooms: Room[];
  public _allCitys: City[];

  public btn_moreInformations_content: string ="Plus d'infos";

  constructor(
    public dialog: MatDialog,
    private _roomsService: RoomsService,
    private _citysService: CitysService,
  ) { }

  ngOnInit(): void {
    this.refreshRoomsList();
  }

  /**
   * Actualise la liste des Salles
   */
  private refreshRoomsList(): void{
    this._citysService.getAllCitys().subscribe((allCitys: City[])=>{
      let newRoomsList: roomsFormat[] = [];
      this._allCitys = allCitys;
      allCitys.forEach((someCity)=>{
        newRoomsList.push({idVille: someCity.id, nomVille: someCity.nomVille, nbSalles: 0})
      });
      this.roomsList = newRoomsList;
      this._roomsService.getAllRooms().subscribe((allRooms)=>{
        this.roomsList.forEach(element=>{
          element.nbSalles = 0;
        });
        allRooms.forEach(someRoom => {
          this.roomsList.forEach(element=>{
            if(element.idVille == someRoom.idVille){
              element.nbSalles++;
            }
          })
        });
        //portion de code pour ne pas afficher à l'écran les villes qui n'ont pas de salles
        let index: number = 0;
        let indexToSlice: number[] = [];
        this.roomsList.forEach((element)=>{
          if(element.nbSalles == 0){
            indexToSlice.push(index);
          }
          index++;
        });
        this.roomsList.reverse();
        indexToSlice.reverse();
        indexToSlice.forEach((i)=>{
          this.roomsList.slice(i);
        });
        this.roomsList.reverse();
      });
    });
  }

  private openDialog(idVille: number, nomVille: string): void {
    const dialogRef = this.dialog.open(RoomDetailsComponent, {
      width: '500px',
      data: {idVille: idVille, nomVille: nomVille}
    });
  }

  public btn_moreInformations_click(idVille: number, nomVille: string): void{
    this.openDialog(idVille, nomVille);
  }
}
