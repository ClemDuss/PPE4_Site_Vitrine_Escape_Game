import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsAddComponent } from './news-add/news-add.component';
import { News } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des news';

  public btn_addNews_content: string = 'Ajouter une news';
  public btn_addNews_icon: string = 'add';

  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog,
    private _newsService: NewsService,
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    //On vérifie si l'utilisateur est connecté
    this._loginService.isUserConnected();
    this.setNoteBodyRightHeight();
  }

  /**
   * Click sur le bouton d'ajout de News
   */
  public btn_addNews_click(): void{
    this.openDialog();
  }

  /**
   * Ouvre le modal pour ajouter une News
   */
  private openDialog(): void {
    this._newsService.setSelectedId(null);
    const dialogRef = this.dialog.open(NewsAddComponent, {
      width: '500px',
      data: {type: 'add', news: new News()}
    });
  }

  /**
   * Définition d'une portion de l'affichage du 'Post-it'
   */
  private setNoteBodyRightHeight(): void{
    document.getElementById('bodyRight').style.height = document.getElementById('content').style.height;
  }

}
