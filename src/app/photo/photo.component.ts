import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Photo } from '../model/photo';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() album: string;

  listPhoto: Photo[];
  selectedPhoto: Photo;

  // Initialisation
  page: number; // 1er page
  pageSizeSelect: number[]; // valeur select page size
  pageSize: number; // nombre d'element par page
  listAffiche: any[]; // liste des elements
  collectionSize: number; // taille de la liste

  constructor(private modalService: NgbModal, private photoService: PhotoService) {
  }

  ngOnInit() {
    this.getPhotos();

    this.page = 1; // 1er page
    this.pageSizeSelect = [5, 10, 20]; // valeur select page size
    this.pageSize = this.pageSizeSelect[0]; // nombre d'element par page

    this.pageChange();
  }

  getPhotos(): void {
        this.photoService.getPhotos()
        .subscribe(listPhoto => this.listPhoto = listPhoto);
  }

  pageChange() {
    this.listAffiche = this.listPhoto.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

  onChangeSelect(value) {
    this.pageSize = value;
    this.pageChange();
  }

  open(content, photo) {
    this.selectedPhoto = photo;
    this.modalService.open(content);
  }

  goPrecedent() {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) - 1 ];
  }

   goSuivant() {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) + 1 ];
   }

}


