import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  activated: boolean;
  startDate: string;
  endDate: string;
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: false, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
  {activated: true, startDate: '2019-12-12', endDate: '2019-12-20', title: 'L\'avant Noël'},
];

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  public welcomeText: string = 'Gestion des news'

  public displayedColumns: string[] = ['activated', 'startDate', 'endDate', 'title'];
  public dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
