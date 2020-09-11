import { Injectable } from '@angular/core';
import { Student } from './student';
import {observable, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private http: HttpClient) { }

  // * Add Student
  AddStudent(data: Student): Observable<any> {
    const API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
    .pipe(
      catchError(this.errorMgmt)
    );
  }

  GetStudents(): Observable<any> {
    return this.http.get(`${this.endpoint}`);
  }

  GetStudent(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/read-student/${id}`;

    return this.http.get(API_URL, {headers: this.headers})
    .pipe(
      catchError(this.errorMgmt)
    );
  }

  UpdateStudent(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/update-student/${id}`;

    return this.http.put(API_URL, data, {headers: this.headers})
    .pipe(
      catchError(this.errorMgmt)
    );
  }

  DeleteStudent(id): Observable<any> {
    const API_URL = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  errorMgmt(err: HttpErrorResponse): any {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = err.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
