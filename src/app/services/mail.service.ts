import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../models/environments';
import {Mail} from '../models/mail-interface';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  url = environment.api_url;

  constructor(private http: HttpClient) { }

  sendMail(content: Mail): Observable<Mail> {
    const url = `${this.url}/user/mail`;
    return this.http.post<Mail>(url, content);
  }
}
