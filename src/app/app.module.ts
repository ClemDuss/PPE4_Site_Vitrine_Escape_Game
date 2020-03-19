import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NewsComponent } from './view/home/news/news.component';
import { NumbersComponent } from './view/home/numbers/numbers.component';
import { UserReviewsComponent } from './view/home/user-reviews/user-reviews.component';
import { RoomsComponent } from './view/home/rooms/rooms.component';
import { PicturesComponent } from './view/home/pictures/pictures.component';
import { FooterComponent } from './view/home/footer/footer.component';
import { SectionsTitleComponent } from './shared/components/sections-title/sections-title.component';
import { GestionComponent } from './view/gestion/gestion.component';
import { ReviewsEditComponent } from './view/gestion/reviews-edit/reviews-edit.component';
import { NewsEditComponent } from './view/gestion/news-edit/news-edit.component';
import { PhotosEditComponent } from './view/gestion/photos-edit/photos-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewsComponent,
    NumbersComponent,
    UserReviewsComponent,
    RoomsComponent,
    PicturesComponent,
    FooterComponent,
    SectionsTitleComponent,
    GestionComponent,
    ReviewsEditComponent,
    NewsEditComponent,
    PhotosEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
