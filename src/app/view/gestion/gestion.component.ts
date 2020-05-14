import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

interface editionElementsFormat {
  name: string;
  path: string;
  icon?: string;
}

const editionElementsArray: editionElementsFormat[] = [
  { name: 'Avis', path: './avis'},
  { name: 'News', path: './news', icon: 'fiber_new'},
  { name: 'Photos', path: './photos'},
]

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  public welcomeText: string = 'Espace édition';

  public editionElements: editionElementsFormat[] = editionElementsArray;

  constructor(
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this._loginService.isUserConnected();
  }

  public disconnect(){
    this._loginService.resetLocalStorage();
  }

}
