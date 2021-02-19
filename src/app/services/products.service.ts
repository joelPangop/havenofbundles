import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Care, Description, HairInfo, Product} from "../models/Product-interface";
import {Observable} from "rxjs";
import {environment} from "../models/environments";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public profile_product: Product;
  public profile_products: Product[];

  constructor(private http: HttpClient) {
    this.profile_product = new Product();
    this.profile_products = [] as Product[];
  }

  save(): Observable<Product> {
    return this.http.post<Product>(environment.api_url+'/product', this.profile_product);
  }

  loadAll(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url+'/products')
  }

  loadById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.api_url}/product/${id}`)
  }

  update(id: string): Observable<Product> {
    return this.http.put<Product>(`${environment.api_url}/product/${id}`, this.profile_product);
  }
}
