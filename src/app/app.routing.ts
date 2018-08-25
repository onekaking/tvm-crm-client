import { Routes } from "@angular/router";
import { CustomersComponent } from "./customers/customers.component";
import { StudentsComponent } from './students/students.component';

export const appRoutes: Routes = [
    { path: 'customers', component: CustomersComponent },
    { path: 'students', component: StudentsComponent },
    { path: '',
      redirectTo: '/customers',
      pathMatch: 'full'
    }
  ];