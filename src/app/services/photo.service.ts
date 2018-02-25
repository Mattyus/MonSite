import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Photo } from '../model/photo';
import { PHOTO } from '../model/mock-photo';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PhotoService {

  private url = 'http://localhost:8080/api/photo/';

  constructor( private http: HttpClient ) { }

  getPhotos(album: string): Observable<Photo[]> {
    const url = `${this.url}${album}`;
    return this.http.get<Photo[]>(url)
      .pipe(
          map(this.parseDate),
          tap(_ => console.log(`GET album = ${album}`)));
  }

  addPhoto (photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.url, photo ).pipe(
      tap(_ => console.log(`POST photo = ${JSON.stringify(photo)}`)));
  }

  delPhoto (photo: Photo): Observable<Photo> {
    const url = `${this.url}${photo._id}`;
    return this.http.delete<Photo>(url).pipe(
      tap(_ => console.log(`DELETE photo = ${JSON.stringify(photo)}`)));
  }

  modifPhoto (photo: Photo): Observable<Photo> {
    const url = `${this.url}${photo._id}`;
    return this.http.put<Photo>(url, photo).pipe(
      tap(_ => console.log(`PUT photo = ${JSON.stringify(photo)}`)));
  }
    
  private parseDate(res: Photo[]) {
    var data = res || [];
    data.forEach((d) => {
      d.date = new Date(d.date);
    });
  return data;
}


}
