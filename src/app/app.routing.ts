import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { StudentsComponent } from './students/students.component';
import { CustomerDetailComponent } from "./customer/detail/customer-detail.component";
import { BillComponent } from "./bill/bill.component";
import { SettingComponent } from "./setting/setting.component";
import { SettingCourseComponent } from "./setting/course/course.component";

export const appRoutes: Routes = [
	{ path: 'customers', component: CustomerComponent },
	{ path: 'customers/:id', component: CustomerDetailComponent },
	{ path: 'bill', component: BillComponent },
	{
		path: 'setting', component: SettingComponent
	},
	{
		path: '',
		redirectTo: 'customers',
		pathMatch: 'full'
	}
];