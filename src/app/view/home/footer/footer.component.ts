import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/shared/components/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private actualDate = new Date();
  //Définition du texte de copyright avec année automatique
  public copyText: string = '© CJT-' + this.actualDate.getFullYear();

  private _logoFolderPath: string = "./../../../../assets/images/logos"
  public footerLogo: string = this._logoFolderPath + "/logo_escape_game_white.svg";

  windowScrolled: boolean;

  constructor(
    public dialog: MatDialog,
    private _route: Router,
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Click sur le boutn d'accès à l'espace gestion
   */
  public btn_goToGestion_click(): void{
    if(this._loginService.userCanGoToGestion()){
      this._route.navigate(['/gestion']);
    }else{
      this.openDialog();
    }
  }

  /**
   * Ouverture de la modal de connexion
   */
  private openDialog(): void{
    const dialogRef = this.dialog.open(LoginDialogComponent,{
      width: '300px',
      data: {email: null, password: null, validConnection: false},
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if(res != undefined){
        if(res.validConnection){
          this._route.navigate(["/gestion"]);
        }
      }
    });
  }

  /**
   * Différents paramètres pour l'annimation du scroll au haut de page
   */
  @HostListener("window:scroll")
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    //Revenir au haut de page
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }

}
