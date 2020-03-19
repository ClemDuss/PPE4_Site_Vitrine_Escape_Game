import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() welcomeText;

  public logoPath: string = '../../../../assets/images/logos/';
  public logo: string = this.logoPath + 'logo_escape_game_white.svg';
 
  constructor() { }

  ngOnInit(): void {
  }

}
