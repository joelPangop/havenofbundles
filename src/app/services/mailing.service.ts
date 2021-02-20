import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mailing} from '../models/Mailing-interface';
import {environment} from "../models/environments";

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  mailingList: Mailing[];

  constructor(private http: HttpClient) {
    this.mailingList = [];
  }

  public getMailingList(): Observable<any> {
    return this.http.get<any>(environment.api_url+'/users');
  }

  public sendMail(email: String): Observable<any> {
    return this.http.post<any>(environment.api_url+'/mail', {email: email})
  }
}
