import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Platform} from "@ionic/angular";
import {environment} from "../models/environments";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, public platform: Platform) { }

  uploadImages(uploadForm: FormGroup) {
    const headers = {
      enctype: 'multipart/form-data;',
      Accept: 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
    };
    const formData = new FormData();
    const url = `${environment.api_url}/file/upload`;

    for (const file of uploadForm.value.image) {
      formData.append('file', file);
    }
    let desc: string;

    return this.http.post<any>(url, formData, {headers});
  }

  uploadImage(uploadForm: FormGroup):Observable<any> {
    const headers = {
      enctype: 'multipart/form-data;',
      Accept: 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
    };
    const formData = new FormData();
    const url = `${environment.api_url}/user/uploadImgProfile`;
    formData.set('file', uploadForm.value.image);
    return this.http.post<any>(url, formData, {headers});
  }


  deleteImage(filename) {
    const url = `${environment.api_url}/file/files/${filename}`;
    return this.http.delete(url);
  }
}
