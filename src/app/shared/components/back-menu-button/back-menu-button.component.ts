import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-back-menu-button',
  templateUrl: './back-menu-button.component.html',
  styleUrls: ['./back-menu-button.component.css']
})
export class BackMenuButtonComponent implements OnInit {

  constructor(
    private _route: Router,
  ) { }

  ngOnInit(): void {
  }

  public backToMenu(): void{
    this._route.navigate(["/gestion"]);
  }

}
