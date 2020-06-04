import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {
  public welcomeText: string = "Gestion des podiums";

  public btn_editPodiums_icon: string = "edit";
  public btn_editPodiums_content: string = "Modifier l'affichage des podiums";

  public allRooms: Room[];

  constructor(
    private _roomsService: RoomsService,
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshAllRoom();
  }

  private refreshAllRoom(){
    this._roomsService.getAllRooms().subscribe((data: Room[])=>{
      this.allRooms = data;
    });
  }

  public changePodiumDisplayState(theRoom: Room){
    theRoom.afficherclassement = !theRoom.afficherclassement;
    this._apiService.putRoom(theRoom);
  }

  public btn_editPodiums_click(){

  }

}
