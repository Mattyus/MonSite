import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from "moment";

import { User } from '../model/user';

@Injectable()
export class AuthService {

    private isLogged: boolean = false;

    private logged: Subject<boolean> = new Subject<boolean>();

    constructor( private http: HttpClient ) {        
        this.logged.subscribe((value) => {
            this.isLogged = value;
        });
    }
    
    register(user: User) {
      return this.http.post<User>('http://localhost:8080/user/register', user)
        .pipe(tap(_ => console.log(`REGISTER USER = ${user}`)));
    }

    login(user: User): Observable<User> {
      return this.http.post<User>('http://localhost:8080/user/login', user)
        .pipe(tap(_ => console.log(`LOGIN USER = ${JSON.stringify(user)}`)));
        
    }
          
    setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        
        console.log('Token : ' + authResult.idToken);
        localStorage.setItem('id_token', authResult.idToken);
        
        console.log('Session expire : ' + expiresAt);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        
        console.log('User : ' + JSON.stringify(authResult.user));
        localStorage.setItem("user", JSON.stringify(authResult.user));

        this.logged.next(true);
    }          

    logout() {
        console.log('Deconnexion !!!');
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user");
        this.logged.next(false);
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    getIsLoggedIn(){
        this.logged.next(moment().isBefore(this.getExpiration()));
        return this.isLogged;
    }
}