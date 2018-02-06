import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  listAlbum: Album[];

  constructor() { }

  ngOnInit() {
  }

}
