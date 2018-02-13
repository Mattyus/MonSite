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
  newPhoto: Photo;
  titreUpload: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private photoService: PhotoService) {
  }

  ngOnInit() {
    this.album = this.route.snapshot.paramMap.get('album');
    this.listPhoto = [];
    this.getPhotos(this.album);
    this.page = 1; // 1er page
    this.pageSizeSelect = [5, 10, 20]; // valeur select page size
    this.pageSize = this.pageSizeSelect[0]; // nombre d'element par page

    this.pageChange();

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.addPhoto(response);
    };
  }

  getPhotos(album: string): void {
    this.photoService.getPhotos(album).subscribe(listPhoto => this.listPhoto = listPhoto,
      error => console.log('Error: ', error),
      () => this.pageChange());
  }

  pageChange(): void {
    this.listAffiche = this.listPhoto.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

  onChangeSelect(value): void {
    this.pageSize = value;
    this.pageChange();
  }

  openVisu(content, photo): void {
    this.selectedPhoto = photo;
    this.modalService.open(content);
  }

  openAjout(content): void {
    this.modalService.open(content);
  }

  goPrecedent(): void {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) - 1 ];
  }

   goSuivant(): void {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) + 1 ];
   }

  addPhoto(nom: string): void {
    this.newPhoto = new Photo();
    this.newPhoto.nom = nom;
    this.newPhoto.album = this.album;
    this.newPhoto.titre = this.titreUpload.trim();
    this.newPhoto.date = new Date();
    this.newPhoto.utilisateur = 'Mathieu Sallardon';

    this.photoService.addPhoto( this.newPhoto ).subscribe(() => this.getPhotos(this.album));
  }

}


