import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DisplayParametersService } from './display-parameters.service';
import { MediasPublies } from '../models/medias-publies';
import { Subject, Observable } from 'rxjs';
import { DisplayParameters } from '../models/display-parameters';

@Injectable({
  providedIn: 'root'
})
export class MediasPubliesService {

  constructor(
    private _apiService: ApiService,
    private _displayParametersService: DisplayParametersService,
  ) { }

  /**
   * Retourne tous les médias
   */
  public getAllMedias(): Observable<MediasPublies[]>{
    let allMedias: Subject<MediasPublies[]> = new Subject<MediasPublies[]>();
    this._displayParametersService.getAllDisplayParameters().subscribe((allDP: DisplayParameters[])=>{
      //On défini un paramètre d'affichage par défaut au cas où il y ai un problème sur la requête
      let reviewsParameter: DisplayParameters = new DisplayParameters('pictures', 'random;6');
      //recherche du paramètre d'affichage qui correspond
      allDP.forEach((someDP: DisplayParameters) => {
        if(someDP.getDisplayName() == 'pictures'){
          reviewsParameter = someDP;
        }
      });
      let parameter: string = reviewsParameter.getParameter().split(';')[0];
      //vérification du type d'affichage
      switch(parameter){
        case 'random':
          this._apiService.getAllMediasPublies().subscribe((allMediasFromApi: MediasPublies[])=>{
            let nbOfReviews: number = parseInt(reviewsParameter.getParameter().split(';')[1]);
            let continueToLoop: boolean = true;
            let loopCount: number = 0;
            let newAllMP: MediasPublies[] = [];
            allMedias.next([]);
            while(continueToLoop){
              let randomSelectedMP = allMediasFromApi[Math.floor(Math.random() * allMediasFromApi.length)];
              if(newAllMP.length-1 != allMediasFromApi.length && newAllMP.length < nbOfReviews && loopCount <= 100){
                if(!(newAllMP.includes(randomSelectedMP))){
                    newAllMP.push(randomSelectedMP);
                }
              }else{
                continueToLoop = false;
              }
              loopCount++;
            }
            allMedias.next(newAllMP)
          });
          break;
      }
    });
    return allMedias.asObservable();
  }
}
