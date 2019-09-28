import { Data } from './../models/data.model';
import { Price } from './../models/price.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient) {}

  getSale(): Observable<Data | any> {
    return this.http.get('http://35.162.225.47:8080/agro/subasta');
  }
}
