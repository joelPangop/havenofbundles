import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mailing} from '../models/Mailing-interface';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  mailingList: Mailing[];
  // url = 'http://localhost:4000';

  url = "https://havenofbundleservices.herokuapp.com";

  constructor(private http: HttpClient) {
    this.mailingList = [];
  }

  public getMailingList(): Observable<any> {
    return this.http.get<any>(this.url+'/users');
  }

  public sendMail(email: String): Observable<any> {
    return this.http.post<any>(this.url+'/mail', {email: email})
  }
}
