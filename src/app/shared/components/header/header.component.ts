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
    /*console.log(this._activatedRoute.snapshot.data.animation);
    switch(this._activatedRoute.snapshot.data.animation){
      case 'Home':
        this.welcomeText = 'Bienvenue';
        break;
      case 'Gestion':
        this.welcomeText = 'Espace édition';
        break;
      case 'News':
        this.welcomeText = 'Gestion des News';
        this.displayBackButton = true;
        break;
      case 'Pictures':
        this.welcomeText = 'Gestion des Photos';
        this.displayBackButton = true;
        break;
      case 'Reviews':
        this.welcomeText = 'Gestion des Avis';
        this.displayBackButton = true;
        break;
    }*/
  }

}
