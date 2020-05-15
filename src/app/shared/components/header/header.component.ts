import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() welcomeText: string;
  @Input() displayBackButton: boolean = false;

  public logoPath: string = '../../../../assets/images/logos/';
  public logo: string = this.logoPath + 'logo_escape_game_white.svg';
 
  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
  }

}
