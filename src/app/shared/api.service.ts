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
        let API_URL = `${this.endpoint}/register`;
        return this.http.post(API_URL, data, {responseType: 'text' as 'json'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.errorMgmt)
            )
    }

    // Check User
    login(data: UserModel): Observable<any> {
        let API_URL = `${this.endpoint}/login`;
        return this.http.post(API_URL, data)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.errorMgmt)
            )
    }

    logout(): Observable<any>{
        let API_URL = `${this.endpoint}/logout`;
        return this.http.get(API_URL, {responseType: 'text'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.errorMgmt)
            )
    }

    isLoggedIn():Observable<any>  {
        let API_URL = `${this.endpoint}/isLoggedIn`;
        return this.http.get(API_URL)
            .pipe(map(
               res => {
                    return res;
                },
                catchError(this.errorMgmt)
            ))
    }

    getAllUsers(): Observable<any> {
        let API_URL = `${this.endpoint}/getAllUsers`;
        return this.http.get(API_URL)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.errorMgmt)
            )
    }

    deleteUser(userId: UserModel): Observable<any> {
        let API_URL = `${this.endpoint}/deleteUser/${userId}`;
        return this.http.delete(API_URL)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.errorMgmt)
            )
    }

    // Get User By Id
    getUserById(id): Observable<any> {
        let API_URL = `${this.endpoint}/getUserById/${id}`;
        return this.http.get(API_URL, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            }),
            catchError(this.errorMgmt)
        )
    }

    // Update student
    updateUserProfile(id, data: UserModel): Observable<any> {
        let API_URL = `${this.endpoint}/updateUserProfile/${id}`;
        return this.http.put(API_URL, data, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            }),
            catchError(this.errorMgmt)
        )
    }


    onFormValuesChanged(formErrors, loginForm) {
        for (const field in formErrors) {
          if (!formErrors.hasOwnProperty(field)) {
            continue;
          }
          // Clear previous errors
          formErrors[field] = {};
          // Get the control
          const control = loginForm.get(field);
          if (control && control.dirty && !control.valid) {
            formErrors[field] = control.errors;
          }
        }
      }

}