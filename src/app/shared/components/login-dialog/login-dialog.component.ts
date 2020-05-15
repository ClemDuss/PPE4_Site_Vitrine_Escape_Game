import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../models/user';
import { FunctionsService } from '../../services/functions.service';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginInformation } from '../../models/login-information';
import { LoginService } from '../../services/login.service';

interface DialogData{
  email: string;
  password: string;
  validConnection?: boolean
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  public input_email_value: FormControl = new FormControl();
  public input_password_value: FormControl = new FormControl();

  //rôles autorisés à accéder à l'espace gestion
  private _authorizedRoles: string[] = ['EDIT', 'DIR'];

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _usersService: UsersServiceService,
    private _functionsService: FunctionsService,
    private _apiService: ApiService,
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Click sur le bouton connexion
   */
  public btn_login_click(){
    //récupération de tous les utilisateurs membres du personnel
    this._usersService.getAllUsersPersonnel().subscribe((allUsersPersonnel: User[])=>{
      let userIsStaffMemberConnected: boolean = false;
      let selectedUser: User = new User();
      //on vérifie si email/password sont saisis
      if(this.input_email_value.value != null && this.input_password_value.value != null){
        if(this.input_email_value.value != null){
          if(this.input_password_value.value != null){
            let emailWasFound: boolean = false;
            //vérification de l'existance de l'email
            allUsersPersonnel.forEach((theUser: User)=>{
              if(this.input_email_value.value == theUser.mail){
                emailWasFound = true;
                selectedUser = theUser;
              }
            });
            //si l'email existe
            if(emailWasFound){
              //test de la correspondance email/password
              if(this.input_password_value.value == selectedUser.password){
                userIsStaffMemberConnected = true;
              }else{
                this._functionsService.openErrorSnackBar("Mot de passe incorrect")
              }
            }else{
              this._functionsService.openErrorSnackBar("Cet email est inconnu");
            }
          }else{
            this._functionsService.openErrorSnackBar("Vous devez saisir un mot de passe")
          }
        }else{
          this._functionsService.openErrorSnackBar("Vous n'avez pas saisi d'email");
        }
      }else{
        this._functionsService.openErrorSnackBar("Vous devez saisir un email et un mot de passe");
      }

      //si le membre qui se connecte fait bien parti du personnel
      if(userIsStaffMemberConnected){
        this._apiService.getInfosSupPersonnelByUserId(selectedUser.id).subscribe((theRole: string)=>{
          //si le membre et détenteur d'un des rôles autorisés
          if(this._authorizedRoles.includes(theRole)){
            this._functionsService.openSuccessSnackBar("Connexion réussie");
            let theLoginInformation: LoginInformation = new LoginInformation();
            theLoginInformation.email = selectedUser.getMail();
            theLoginInformation.connectionDate = new Date();
            theLoginInformation.stayConnected = false;
            this._loginService.setLocalStorage(theLoginInformation);
            //on enregistre la validation de connexion
            this.validLogin();
          }else{
            this._functionsService.openErrorSnackBar("Vous n'avez pas les droits nécessaires pour vous connecter ici");
          }
        });
      }
    });
  }

  /**
   * Enregistre que la connexion est validée
   */
  private validLogin(){
    this.data.validConnection = true;
    this.dialogRef.close(this.data);
  }

}
