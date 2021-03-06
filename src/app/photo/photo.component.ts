import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbDatepickerI18n, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../model/photo';
import { CustomDatepickerI18n } from '../datepicker/customdatepickeri18n.service';
import { I18nService } from '../datepicker/i18n.service';
import { NgbDateNativeAdapter } from '../datepicker/ngbdatenativeadapter.service';
import { PhotoService } from '../services/photo.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
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
  newPhoto: Photo;
  uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private photoService: PhotoService,
    private authService: AuthService) {}

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

    this.newPhoto = new Photo();

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

  openModal(content): void {
    this.modalService.open(content);
  }

  goPrecedent(): void {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) - 1 ];
  }

   goSuivant(): void {
    this.selectedPhoto = this.listPhoto[this.listPhoto.indexOf(this.selectedPhoto) + 1 ];
   }

  addPhoto(nom: string): void {
    this.newPhoto.nom = nom;
    this.newPhoto.album = this.album;
    this.newPhoto.utilisateur = 'Mathieu Sallardon';

    if (this.newPhoto.date == null) {
      this.newPhoto.date = new Date();
    }

    this.photoService.addPhoto( this.newPhoto ).subscribe(() => this.getPhotos(this.album));

    this.newPhoto = new Photo();
  }

  delPhoto(photo: Photo) {
    this.photoService.delPhoto( photo ).subscribe(() => this.getPhotos(this.album));
    this.photoService.delFile( photo.nom ).subscribe();
  }

  modifPhoto () {
    if (this.selectedPhoto.date == null) {
      this.selectedPhoto.date = new Date();
    }
    this.photoService.modifPhoto(this.selectedPhoto).subscribe(() => this.getPhotos(this.album));
  }

  get isLogged(): boolean {
    return this.authService.getIsLoggedIn();
  }

}


