import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  tiles = [
      {text: 'One', cols: 1, rows: 2, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
      {text: 'Four', cols: 1, rows: 2, color: '#DDBDF1'},
      {text: 'Five', cols: 1, rows: 2, color: '#DDBDF1'},
      {text: 'Six', cols: 1, rows: 2, color: '#DDBDF1'},
      {text: 'Seven', cols: 1, rows: 2, color: '#DDBDF1'},
      {text: 'Height', cols: 1, rows: 2, color: '#DDBDF1'}
    ];

  // Initialisation
  page = 1; // 1er page
  pageSize = 3; // nombre d'element par page
  list: any[]; // liste des elements
  collectionSize = this.tiles.length; // taille de la liste

  constructor() {
  }

  ngOnInit() {
    this.list = this.tiles.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

  pageChange() {
    this.list = this.tiles.slice((this.page - 1) * this.pageSize, this.page * this.pageSize );
  }

}
