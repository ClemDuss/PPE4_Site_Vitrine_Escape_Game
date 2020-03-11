import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoPath = '../../../../assets/images/logos/';
  logo = this.logoPath + 'logo_escape_game_white.svg';
  welcomeText = 'Bienvenue'

  constructor() { }

  ngOnInit(): void {
  }

}
