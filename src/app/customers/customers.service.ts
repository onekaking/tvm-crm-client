import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(`${environment.apiUrl}/customer`);
  }

  postCustomer(customer: any) {
    return this.http.post(`${environment.apiUrl}/customer`, customer);
  }

  findCustomers(text) {
    // return this.http.get(`${environment.apiUrl}/customer?where={"name": {"contains": "${text}" }}`);
    return this.http.get(`${environment.apiUrl}/customer?where={"or":[
                                              {"name": {"contains": "${text}"}},
                                              {"code": {"contains": "${text}"}}
                                              ]}`);
  }
}
