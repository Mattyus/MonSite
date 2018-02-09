import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../model/photo';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  album: string;
  listPhoto: Photo[];
  selectedPhoto: Photo;

  // Initialisation
  page: number; // 1er page
  pageSizeSelect: number[]; // valeur select page size
  pageSize: number; // nombre d'element par page
  listAffiche: any[]; // liste des elements
  collectionSize: number; // taille de la liste

  // Upload
  uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});
  titreUpload: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private photoService: PhotoService) {
  }

  ngOnInit() {
    this.album = this.route.snapshot.paramMap.get('album');
    this.getPhotos(this.album);
    this.page = 1; // 1er page
    this.pageSizeSelect = [5, 10, 20]; // valeur select page size
    this.pageSize = this.pageSizeSelect[0]; // nombre d'element par page

    this.pageChange();
  }

  getPhotos(album: string): void {
        this.photoService.getPhotos(album)
        .subscribe(listPhoto => this.listPhoto = listPhoto);
  }

  pageChange() {
    this.listAffiche = this.listPhoto.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

  onChangeSelect(value) {
    this.pageSize = value;
    this.pageChange();
  }

  openVisu(content, photo) {
    this.selectedPhoto = photo;
    this.modalService.open(content);
  }

  openAjout(content) {
    this.modalService.open(content);
  }

  goPrecedent() {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) - 1 ];
  }

   goSuivant() {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) + 1 ];
   }

  onSubmit() {}

}


