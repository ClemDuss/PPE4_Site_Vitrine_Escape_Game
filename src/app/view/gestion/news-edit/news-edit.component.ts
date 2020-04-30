import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsAddComponent } from './news-add/news-add.component';
import { Moment } from 'moment';
import { News } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';

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
  ) { }

  openDialog(): void {
    this._newsService.setSelectedId(null);
    const dialogRef = this.dialog.open(NewsAddComponent, {
      width: '500px',
      data: {type: 'add', news: new News()}
    });
  }

  ngOnInit(): void {
  }

}
