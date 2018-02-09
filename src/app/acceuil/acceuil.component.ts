import { Component, OnInit } from '@angular/core';

import { Album } from '../model/album';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  listAlbum: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
        this.albumService.getAlbums()
        .subscribe(listAlbum => this.listAlbum = listAlbum);
  }

}
