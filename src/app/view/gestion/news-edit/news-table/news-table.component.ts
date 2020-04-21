import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {
  public displayedColumns: string[] = ['activated', 'startDate', 'endDate', 'title'];

  public allNews: News[];
  private _subscriptionAllNews: Subscription;

  constructor(
    private _newsService: NewsService,
    public functionsService: FunctionsService,
  ) {
    //this.allNews = _newsService.getAllNews();
    this._subscriptionAllNews = _newsService.getAllNewsObserver().subscribe((newsList)=>{
      this.allNews = newsList;
    });
    let lauchNewsService = _newsService.getAllNews();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this._subscriptionAllNews.unsubscribe();
  }

}
