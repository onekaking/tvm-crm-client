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
    constructor(private customersService: CustomersService) {

    }

    ngOnInit() {
      this.customersService.getCustomers().subscribe((data : Customer[]) => {
        console.log(data);
        this.customers = data;
        console.log(this.customers);
      });
    }
}
