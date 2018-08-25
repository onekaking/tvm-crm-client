import { Component } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer.model';
import { TreeNode } from 'primeng/api';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
	customers: Customer[] = [];
	isDialogAddCustomerVisible: boolean = false;
	newCustomer: Customer = new Customer();
	searchCustomerText: string = '';
	resultCustomers: any[] = [];

	constructor(private customersService: CustomersService) {

	}

	ngOnInit() {
		this.loadCustomers();
	}

	loadCustomers() {
		this.customersService.getCustomers().subscribe((data: Customer[]) => {
			this.customers = [];
			data.map(item => {
				this.customers.push(item);
			});
		});
	}

	showDialogAddCustomer() {
		this.newCustomer = new Customer();
		this.isDialogAddCustomerVisible = true;
	}

	createNewCustomer(isCreate) {
		if (isCreate) {
			this.customersService.postCustomer(this.newCustomer).subscribe(data => {
				console.log(data);
				this.isDialogAddCustomerVisible = false;
				this.loadCustomers();
			});
		} else {
			this.isDialogAddCustomerVisible = false;
		}
	}

	searchCustomer(event) {
		this.customersService.findCustomers(this.searchCustomerText).subscribe((data: Customer[]) => {
			this.resultCustomers = data;
			console.log(data);
		});
	}
}
