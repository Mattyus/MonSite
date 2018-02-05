import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Photo } from './photo';
import { PHOTO } from './mock-photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  listPhoto = PHOTO;
  selectedPhoto: Photo;

  pageSizeSelect = [5, 10, 20];

  // Initialisation
  page = 1; // 1er page
  pageSize = this.pageSizeSelect[0]; // nombre d'element par page
  listAffiche: any[]; // liste des elements
  collectionSize = this.listPhoto.length; // taille de la liste

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.pageChange();
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
    this.selectedPhoto = this.listAffiche[this.listAffiche.indexOf(this.selectedPhoto) - 1 ];
  }

   goSuivant() {
    this.selectedPhoto = this.listAffiche[this.listAffiche.indexOf(this.selectedPhoto) + 1 ];
   }

}


