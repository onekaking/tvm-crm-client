import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';

// PrimeNG
import {
  MegaMenuModule,
  TreeTableModule,
  DialogModule,
  ButtonModule,
  AutoCompleteModule,
  SplitButtonModule,
  CalendarModule,
  TabViewModule,
  ScrollPanelModule
} from 'primeng/primeng';

import { TableModule } from 'primeng/table';

// Custom Component
import { CustomerComponent } from './customer/customer.component';
import { StudentsComponent } from './students/students.component';
import { CustomerService } from './customer/customer.service';
import { CustomerDetailComponent } from './customer/detail/customer-detail.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    StudentsComponent,
    CustomerDetailComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MegaMenuModule,
    TreeTableModule,
    TableModule,
    DialogModule,
    ButtonModule,
    AutoCompleteModule,
    SplitButtonModule,
    CalendarModule,
    TabViewModule,
    ScrollPanelModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ CustomerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
