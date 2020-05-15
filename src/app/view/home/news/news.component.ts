import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { News } from 'src/app/shared/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  //titre de la section
  public title: string = 'News';

  public newsList: News[];

  constructor(
    private _newsService: NewsService,
    private _functionsService: FunctionsService,
  ) {
  }

  ngOnInit(): void {
    this.refreshNewsList();
  }

  /**
   * Actualise la liste des news valides à afficher
   */
  public refreshNewsList(): void{
    this._newsService.getValidateNews().subscribe(data=>{
      this.newsList = data;
    })
    //this.newsList = this._newsService.getValidateNews();
    //console.log(this.newsList);
  }

  /**
   * Affiche la date au format JJ mois AAAA
   * @param date date à convertir
   */
  public dateToDisplay(date: Date): string{
    return this._functionsService.dateToStringToDisplay(date);
  }

  /**
   * Retourne le nombre de news à afficher
   */
  public numberOfNews(): number{
    return this.newsList.length;
  }

}
