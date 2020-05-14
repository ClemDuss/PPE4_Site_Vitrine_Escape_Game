import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/shared/components/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LoginService } from 'src/app/shared/services/login.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private actualDate = new Date();
  public copyText: string = '© CJT-' + this.actualDate.getFullYear();

  windowScrolled: boolean;

  constructor(
    public dialog: MatDialog,
    private _route: Router,
    private _loginService: LoginService,
    private _functionsService: FunctionsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
  }

  public goToGestion(): void{
    if(this._loginService.userCanGoToGestion()){
      this._route.navigate(['/gestion']);
    }else{
      this.openDialog();
    }
  }

  public openDialog(){
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

  @HostListener("window:scroll")
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
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
