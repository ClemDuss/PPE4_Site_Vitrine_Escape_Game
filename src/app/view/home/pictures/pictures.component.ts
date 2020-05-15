import { Component, OnInit } from '@angular/core';
import { MediasPublies } from 'src/app/shared/models/medias-publies';
import { MediasPubliesService } from 'src/app/shared/services/medias-publies.service';

const picturesFolder: string = './../../../../assets/images/pictures/UserPics/';

const pics: string[] = [
  'eg1.jpg',
  'eg2.jpg',
  'eg3.jpg',
  'eg4.jpg',
  'eg5.jpg',
  'eg6.jpg'
]

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
  public title: string = 'Photos';

  public picsFolder: string = picturesFolder;
  public pictures: string[] = pics;

  public allPictures: MediasPublies[];

  constructor(
    private _mediasPubliesService: MediasPubliesService,
  ) { }

  ngOnInit(): void {
    this.refreshAllPictures();
  }

  private refreshAllPictures(): void{
    this._mediasPubliesService.getAllMedias().subscribe((allMedias: MediasPublies[])=>{
      this.allPictures = allMedias;
    });
  }

}
