import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './view/home/header/header.component';
import { NewsComponent } from './view/home/news/news.component';
import { NumbersComponent } from './view/home/numbers/numbers.component';
import { UserReviewsComponent } from './view/home/user-reviews/user-reviews.component';
import { RoomsComponent } from './view/home/rooms/rooms.component';
import { PicturesComponent } from './view/home/pictures/pictures.component';
import { FooterComponent } from './view/home/footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
