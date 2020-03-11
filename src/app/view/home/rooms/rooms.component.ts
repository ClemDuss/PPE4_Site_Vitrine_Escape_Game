import { Component, OnInit } from '@angular/core';

interface roomsFormat {
  nomVille: string;
  nbSalles: number;
}

const rooms: roomsFormat[] = [
  {nomVille: 'Annecy', nbSalles: 4},
  {nomVille: 'Chamonix', nbSalles: 1},
  {nomVille: 'Thonon-les-Bains', nbSalles: 1},
  {nomVille: 'Bonneville', nbSalles: 1},
]

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public title:string = 'Salles';

  public roomsList: roomsFormat[] = rooms;

  constructor() { }

  ngOnInit(): void {
  }

}
