import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewsAddComponent } from './../news-add/news-add.component';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {
  public displayedColumns: string[] = ['activated', 'startDate', 'endDate', 'title'];

  public allNews: News[];
  private _subscriptionAllNews: Subscription;

  public selectedId: number;
  private _subscriptionSelectedId: Subscription;

  public selectedNews: News;
  private _subscriptionSelectedNews: Subscription;

  constructor(
    private _newsService: NewsService,
    public functionsService: FunctionsService,
    public dialog: MatDialog,
  ) {
    this._subscriptionAllNews = _newsService.getAllNewsObserver().subscribe((newsList)=>{
      this.allNews = newsList;
    });
    this._subscriptionSelectedId = _newsService.getSelectedId().subscribe((theSelectedId)=>{
      this.selectedId = theSelectedId;
    });
    this._subscriptionSelectedNews = _newsService.getSelectedNews().subscribe((data)=>{
      this.selectedNews = data;
    });
    let lauchNewsService = _newsService.getAllNews();
  }

  ngOnInit(): void {
  }

  /**
   * Sélectionne la news selon son id
   * @param id id de la news
   */
  public selectThisNews(id: number ): void{
    this._newsService.setSelectedId(id);
  }

  /**
   * Ouvre le modal pour modifier la news selon l'id
   * @param id id de la news
   */
  public openEditNews(id: number): void{
    const dialogRef = this.dialog.open(NewsAddComponent, {
      width: '500px',
      data: {type: 'edit', news: this.selectedNews}
    });
  }

  /**
   * click sur le bouton supprimer
   */
  public btn_delete_click(): void{
    this._newsService.deleteNews(this.selectedNews.getId());
  }

  /**
   * Changement d'état du switch
   */
  public changeActivatedState(): void{
    this._newsService.changeActivatedState(this.selectedNews.getId());
  }

  ngOnDestroy(): void{
    this._subscriptionAllNews.unsubscribe();
  }

}
