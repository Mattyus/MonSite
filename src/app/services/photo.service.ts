import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Photo } from '../model/photo';
import { PHOTO } from '../model/mock-photo';

@Injectable()
export class PhotoService {

  constructor() { }

    getPhotos(): Observable<Photo[]> {
      return of(PHOTO);
  }

}
