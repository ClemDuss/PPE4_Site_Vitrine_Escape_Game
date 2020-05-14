import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos-edit',
  templateUrl: './photos-edit.component.html',
  styleUrls: ['./photos-edit.component.css']
})
export class PhotosEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des photos'

  constructor(
    private _loginService: LoginService,
    private _functionsService: FunctionsService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this._loginService.isUserConnected();
    this._functionsService.inactiveFunction();
    this._route.navigate(['/gestion']);
  }

}
