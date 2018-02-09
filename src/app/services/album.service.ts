import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Album } from '../model/album';
import { ALBUM } from '../model/mock-album';

@Injectable()
export class AlbumService {

  constructor() { }

  getAlbums(): Observable<Album[]> {
    return of(ALBUM);
  }

}
