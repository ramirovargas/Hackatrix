import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient) {}

  getSale() {
    return this.http.get('http://35.162.225.47:8080/agro/subasta');
  }
}
