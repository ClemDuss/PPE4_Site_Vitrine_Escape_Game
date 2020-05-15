import { Component, OnInit } from '@angular/core';
import { MediasPublies } from 'src/app/shared/models/medias-publies';
import { MediasPubliesService } from 'src/app/shared/services/medias-publies.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
  //titre de la section
  public title: string = 'Photos';

  //chemin d'accès à l'emplacement de stockage des photos utilisateur
  public picsFolder: string = './../../../../assets/images/pictures/UserPics/';

  public allPictures: MediasPublies[];

  constructor(
    private _mediasPubliesService: MediasPubliesService,
  ) { }

  ngOnInit(): void {
    this.refreshAllPictures();
  }

  /**
   * Acluatise la liste des photos à afficher
   */
  private refreshAllPictures(): void{
    this._mediasPubliesService.getAllMedias().subscribe((allMedias: MediasPublies[])=>{
      this.allPictures = allMedias;
    });
  }

}
