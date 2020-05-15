import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PhotosEditDisplayComponent } from './photos-edit-display/photos-edit-display.component';
import { DisplayParametersService } from 'src/app/shared/services/display-parameters.service';
import { DisplayParameters } from 'src/app/shared/models/display-parameters';

@Component({
  selector: 'app-photos-edit',
  templateUrl: './photos-edit.component.html',
  styleUrls: ['./photos-edit.component.css']
})
export class PhotosEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des photos';

  public btn_editDisplayMode_content: string = "Modifier le mode d'affichage";
  public btn_editDisplayMode_icon: string = "edit";
  public btn_editDisplayMode_disable: boolean;

  private _DPid: number;
  private _displayOption: string;
  public displayOptionName: string;
  public nbToDisplay: number;
  private _minRate: number = 0;
  private _maxRate: number = 5;

  constructor(
    private _loginService: LoginService,
    public dialog: MatDialog,
    private _displayParametersService: DisplayParametersService,
  ) { }

  ngOnInit(): void {
    this._loginService.isUserConnected();
    //this._functionsService.inactiveFunction();
    //this._route.navigate(['/gestion']);
    this.refreshDisplayMode();
  }

  private refreshDisplayMode(): void{
    this._displayParametersService.getDisplayParameterByName('pictures').subscribe((someDP: DisplayParameters)=>{
      let selectedParam: string = someDP.parameter;
      this._DPid = someDP.id;
      this.nbToDisplay = parseInt(selectedParam.split(';')[1]);
      this._displayOption = selectedParam.split(';')[0];
      switch(selectedParam.split(';')[0]){
        case 'random':
          this.displayOptionName = 'aléatoire';
          break;
        case'byRating':
          this._minRate = parseInt(selectedParam.split(';')[2].split(',')[0]);
          this._maxRate = parseInt(selectedParam.split(';')[2].split(',')[1]);
          if(this._minRate == this._maxRate){
            this.displayOptionName = 'dont la note est de ' + this._maxRate;
          }else{
            this.displayOptionName = 'dont la note est comprise entre ' + this._minRate + ' et ' + this._maxRate;
          }
          break;
      }
      this.btn_editDisplayMode_disable = false;
    });
  }

  /**
   * Ouvre la modal de modification des paramètres d'affichage
   */
  private openDialog(): void {
    const dialogRef = this.dialog.open(PhotosEditDisplayComponent, {
      width: '500px',
      data: {DP_id: this._DPid, displayOption: this._displayOption, nbToDisplay: this.nbToDisplay, minRate: this._minRate, maxRate: this._maxRate}
    });

    dialogRef.afterClosed().subscribe(data=>{
      this.refreshDisplayMode();
    });
  }

  /**
   * Click sur le bouton 'Modifier le mode d'affichage'
   */
  public btn_editDisplayMode_click(): void{
    this.openDialog();
  }

}
