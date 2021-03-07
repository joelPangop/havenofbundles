import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BundleSet} from "../models/BundleSet";
import {environment} from "../models/environments";

@Injectable({
  providedIn: 'root'
})
export class BundleSetService {

  bundleSets: BundleSet[];
  bundleSet: BundleSet;

  constructor(private http: HttpClient) {
    this.bundleSets = [];
    this.bundleSet = new BundleSet();
  }

  public addBundleSet(bundleSet: BundleSet): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/bundleset`, bundleSet);
  }

  public getAllBundleSet(): Observable<BundleSet[]> {
    return this.http.get<BundleSet[]>(`${environment.api_url}/bundleset`);
  }

  public getBundleSet(id): Observable<BundleSet> {
    return this.http.get<BundleSet>(`${environment.api_url}/bundleset/${id}`);
  }

  public updateBundleSet(bundleSet: BundleSet, id): Observable<BundleSet> {
    return this.http.put<BundleSet>(`${environment.api_url}/bundleset/${id}`, bundleSet);
  }

}
