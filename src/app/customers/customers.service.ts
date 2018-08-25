import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomersService {

    constructor(private http: HttpClient) { }

    getCustomers() {
      return this.http.get(`${environment.apiUrl}/customer`);       
    }
}