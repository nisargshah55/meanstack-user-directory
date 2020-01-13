import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { UserModel } from './User.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    endpoint: string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) {
    }

    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    // Add user
    register(data: UserModel): Observable<any> {
        console.log(data);
        let API_URL = `${this.endpoint}/register`;
        return this.http.post(API_URL, data)
            .pipe(
                catchError(this.errorMgmt)
            )
    }

    // Check User
    login(data: UserModel): Observable<any> {
        console.log(data);
        let API_URL = `${this.endpoint}/login`;
        return this.http.post(API_URL, data)
            .pipe(
                map(res => {
                    return res;
                    catchError(this.errorMgmt)
                })
                
            )
    }

}