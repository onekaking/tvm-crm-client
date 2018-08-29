import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { TreeNode, LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
	selector: 'app-customers',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
	customers: Customer[] = [];
	isDialogAddCustomerVisible: boolean = false;
	newCustomer: Customer = new Customer();
	searchCustomerText: string = '';
	resultCustomers: any[] = [];
	isDialogPayMoneyVisible: boolean = false;
	loading: boolean = false;
	datasource: Customer[] = [];

	constructor(private customerService: CustomerService, private router: Router) {

	}

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

	showDialogAddCustomer() {
		this.newCustomer = new Customer();
		this.isDialogAddCustomerVisible = true;
	}

	createNewCustomer(isCreate) {
		if (isCreate) {
			this.customerService.postCustomer(this.newCustomer).subscribe(data => {
				this.isDialogAddCustomerVisible = false;
				this.loadCustomers();
			});
		} else {
			this.isDialogAddCustomerVisible = false;
		}
	}

	searchCustomer(event) {
		this.customerService.findCustomers(this.searchCustomerText).subscribe((data: Customer[]) => {
			this.resultCustomers = data;
			console.log(data);
		});
	}

	showDialogPayMoney() {
		this.isDialogPayMoneyVisible = true;
	}

	payMoney(isPay) {
		if (isPay) {

		} else {
			this.isDialogPayMoneyVisible = false;
		}
	}

	selectSearchCustomer(obj) {
		console.log(event);
		this.router.navigate(['/customer', obj.id ]);
	}

	// loadCarsLazy(event: LazyLoadEvent) {
    //     this.loading = true;

    //     //in a real application, make a remote request to load data using state metadata from event
    //     //event.first = First row offset
    //     //event.rows = Number of rows per page
    //     //event.sortField = Field name to sort with
    //     //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //     //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //     //imitate db connection over a network
    //     setTimeout(() => {
    //         if (this.cus) {
    //             this.cars = this.datasource.slice(event.first, (event.first + event.rows));
    //             this.loading = false;
    //         }
    //     }, 1000);
    // }
}
