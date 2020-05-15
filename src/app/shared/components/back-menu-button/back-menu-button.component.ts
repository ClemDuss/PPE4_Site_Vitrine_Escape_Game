import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-back-menu-button',
  templateUrl: './back-menu-button.component.html',
  styleUrls: ['./back-menu-button.component.css']
})
export class BackMenuButtonComponent implements OnInit {

  public btn_backToMenu_content: string = "Retour au menu";

  constructor(
    private _route: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Revenir au menu de gestion
   */
  public backToMenu(): void{
    this._route.navigate(["/gestion"]);
  }

  /**
   * Click sur le bouton de retour au menu
   */
  public btn_backToMenu_click(): void{
    this.backToMenu();
  }

}
