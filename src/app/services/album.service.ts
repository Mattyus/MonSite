import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Album } from '../model/album';

@Injectable()
export class AlbumService {

  private url = 'http://localhost:8080/api/album/';

  constructor( private http: HttpClient ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url)
      .pipe(tap(_ => console.log(`GET all album`)));
  }

  addAlbum (album: Album): Observable<Album> {
    return this.http.post<Album>(this.url, album ).pipe(
      tap(_ => console.log(`POST album = ${JSON.stringify(album)}`)));
  }

  delAlbum (album: Album): Observable<Album> {
    const url = `${this.url}${album._id}`;
    return this.http.delete<Album>(url).pipe(
      tap(_ => console.log(`DELETE album = ${JSON.stringify(album)}`)));
  }

  modifAlbum (album: Album): Observable<Album> {
    const url = `${this.url}${album._id}`;
    return this.http.put<Album>(url, album).pipe(
      tap(_ => console.log(`PUT album = ${JSON.stringify(album)}`)));
  }

}
