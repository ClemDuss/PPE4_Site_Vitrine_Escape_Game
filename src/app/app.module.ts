import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



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
import { ButtonComponent } from './shared/components/button/button.component';
import { NewsAddComponent } from './view/gestion/news-edit/news-add/news-add.component';
import { NewsTableComponent } from './view/gestion/news-edit/news-table/news-table.component';

export const MY_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    ButtonComponent,
    NewsAddComponent,
    NewsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




