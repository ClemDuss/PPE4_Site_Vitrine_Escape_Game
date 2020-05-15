import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Titre du header
  public welcomeText: string = 'Bienvenue';

  constructor() { }

  ngOnInit(): void {
  }

}
