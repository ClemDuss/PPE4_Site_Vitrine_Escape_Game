import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { GestionComponent } from './view/gestion/gestion.component';
import { ReviewsEditComponent } from './view/gestion/reviews-edit/reviews-edit.component';
import { NewsEditComponent } from './view/gestion/news-edit/news-edit.component';
import { PhotosEditComponent } from './view/gestion/photos-edit/photos-edit.component';
import { PodiumComponent } from './view/gestion/podium/podium.component';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'Home'}},
  {path: 'gestion', component: GestionComponent, data: {animation: 'Gestion'}},
  {path: 'gestion/avis', component: ReviewsEditComponent, data: {animation: 'Reviews'}},
  {path: 'gestion/news', component: NewsEditComponent, data: {animation: 'News'}},
  {path: 'gestion/photos', component: PhotosEditComponent, data: {animation: 'Pictures'}},
  {path: 'gestion/podium', component: PodiumComponent, data: {animation: 'Pictures'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
