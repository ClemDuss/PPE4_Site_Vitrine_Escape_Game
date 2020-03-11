import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {
  public title: string = 'Les chiffres';

  public numberOfGames: number = 30;
  public numberOfRooms: number = 7;

  constructor() { }

  ngOnInit(): void {
  }

}
