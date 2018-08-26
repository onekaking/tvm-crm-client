import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomerService {

	constructor(private http: HttpClient) { }

	getCustomers() {
		return this.http.get(`${environment.apiUrl}/customer`);
	}

	postCustomer(customer: any) {
		return this.http.post(`${environment.apiUrl}/customer`, customer);
	}

	findCustomers(text) {
		return this.http.get(`${environment.apiUrl}/customer?where={"or":[
                                              {"name": {"contains": "${text}"}},
                                              {"code": {"contains": "${text}"}}
                                              ]}`);
	}

	getCustomer(id) {
		return this.http.get(`${environment.apiUrl}/customer/${id}`);
	}

	postNote(note) {
		return this.http.post(`${environment.apiUrl}/note`, note);
	}

}
