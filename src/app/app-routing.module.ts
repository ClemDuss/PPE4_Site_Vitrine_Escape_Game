import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { GestionComponent } from './view/gestion/gestion.component';
import { ReviewsEditComponent } from './view/gestion/reviews-edit/reviews-edit.component';
import { NewsEditComponent } from './view/gestion/news-edit/news-edit.component';
import { PhotosEditComponent } from './view/gestion/photos-edit/photos-edit.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gestion', component: GestionComponent},
  {path: 'gestion/avis', component: ReviewsEditComponent},
  {path: 'gestion/news', component: NewsEditComponent},
  {path: 'gestion/photos', component: PhotosEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
