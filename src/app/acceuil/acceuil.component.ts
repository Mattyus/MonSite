import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

import { Album } from '../model/album';
import { AlbumService } from '../services/album.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  listAlbum: Album[];
  selectedAlbum: Album;

  // Initialisation
  page: number; // 1er page
  pageSizeSelect: number[]; // valeur select page size
  pageSize: number; // nombre d'element par page
  listAffiche: any[]; // liste des elements
  collectionSize: number; // taille de la liste

  // Upload
  newAlbum: Album;
  uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAlbums();
    this.listAlbum = [];
    this.page = 1; // 1er page
    this.pageSizeSelect = [5, 10, 20]; // valeur select page size
    this.pageSize = this.pageSizeSelect[0]; // nombre d'element par page

    this.pageChange();

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.addAlbum(response);
    };
      
    this.newAlbum = new Album();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe(listAlbum => this.listAlbum = listAlbum,
      error => console.log('Error: ', error),
      () => this.pageChange());
  }
    
  pageChange(): void {
    this.listAffiche = this.listAlbum.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

  openModalAjout(content): void {
    this.modalService.open(content);
  }
    
  openModalModif(content, album): void {
    this.selectedAlbum = album;
    this.modalService.open(content);
  }
    
  addAlbum(photo: string): void {
    this.newAlbum.photo = photo;

    this.albumService.addAlbum( this.newAlbum ).subscribe(() => this.getAlbums());

    this.newAlbum = new Album();
  }
    
  modifAlbum () {
    this.albumService.modifAlbum(this.selectedAlbum).subscribe(() => this.getAlbums());
  }
    
  delAlbum(album: Album) {
    this.albumService.delAlbum( album ).subscribe(() => this.getAlbums());
    this.photoService.delFileAlbum(album._id);
    this.photoService.delFile( album.photo ).subscribe();
      
  }

}
