import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { News } from 'src/app/shared/models/news';
import { Subject } from 'rxjs';

interface newsFormat {
  date: string;
  content: string;
}

const theNews: newsFormat[] = [
  {date: '12/10/2020', content: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."},
  {date: '25/12/2020', content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes)."},
  {date: '01/02/2003', content: "L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du 'De Finibus Bonorum et Malorum' de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914)."},
];

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
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

  public refreshNewsList(): void{
    this._newsService.getValidateNews().subscribe(data=>{
      this.newsList = data;
    })
    //this.newsList = this._newsService.getValidateNews();
    console.log(this.newsList);
  }

  public dateToDisplay(date: Date): string{
    return this._functionsService.dateToStringToDisplay(date);
  }

  public numberOfNews(): number{
    return this.newsList.length;
  }

}
