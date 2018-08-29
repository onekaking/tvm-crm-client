import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { StudentsComponent } from './students/students.component';
import { CustomerDetailComponent } from "./customer/detail/customer-detail.component";
import { CourseComponent } from "./course/course.component";
import { BillComponent } from "./bill/bill.component";

export const appRoutes: Routes = [
    { path: 'customers', component: CustomerComponent },
    { path: 'customer/:id', component: CustomerDetailComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'bill', component: BillComponent },
    { path: '',
      redirectTo: '/customers',
      pathMatch: 'full'
    }
  ];