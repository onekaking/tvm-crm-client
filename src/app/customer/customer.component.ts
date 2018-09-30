import { Component, ViewEncapsulation } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { TreeNode, LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
	selector: 'app-customers',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CustomerComponent {
	customers: Customer[] = [];
	newCustomer: Customer = new Customer();
	searchCustomerText: string = '';
	resultCustomers: any[] = [];
	loading: boolean = false;
	datasource: Customer[] = [];
	totalRecords: number = 0;

	constructor(private customerService: CustomerService, private router: Router) {}

	ngOnInit() {
		this.loadCustomers();
	}

	loadCustomers() {
		this.loading = true;
		this.customerService.getCustomers().subscribe((data: Customer[]) => {
			this.customers = [];
			data.map(item => {
				this.customers.push(item);
			});
			this.loading = false;
		});
	}

	createNewCustomer(isCreate) {
		if (isCreate) {
			this.customerService.postCustomer(this.newCustomer).subscribe((data: Customer) => {
				this.customers.unshift(data);
				this.newCustomer = new Customer();
			});
		} else {
			this.newCustomer = new Customer();
		}
	}

	searchCustomer(event) {
		this.customerService.findCustomers(this.searchCustomerText).subscribe((data: Customer[]) => {
			// this.resultCustomers = [];
			let result = [];
			data.map(item => {
				console.log(item);
				result.
				unshift(`<span>
					${item.name.replace(this.searchCustomerText, '<strong>'+ this.searchCustomerText +'</strong>')}
					</span>`);
			})
			this.resultCustomers = result;
			console.log(data);
		});
	}

	selectSearchCustomer(obj) {
		this.router.navigate(['../customers', obj.id ]);
	}

}
