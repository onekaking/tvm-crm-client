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
	ScrollPanelModule,
	InputTextModule,
	DropdownModule,
	CheckboxModule,
	TabMenuModule
} from 'primeng/primeng';

import { TableModule } from 'primeng/table';

// Custom Component
import { CustomerComponent } from './customer/customer.component';
import { StudentsComponent } from './students/students.component';
import { CustomerService } from './customer/customer.service';
import { CustomerDetailComponent } from './customer/detail/customer-detail.component';
import { BillComponent } from './bill/bill.component';
import { SettingComponent } from './setting/setting.component';
import { SettingCourseComponent } from './setting/course/course.component';
import { CourseService } from './setting/course/course.service';
import { ClassCourseComponent } from './setting/class/class-course.component';
import { ClassCourseService } from './setting/class/class-course.service';

@NgModule({
	declarations: [
		AppComponent,
		CustomerComponent,
		StudentsComponent,
		CustomerDetailComponent,
		BillComponent,
		SettingComponent,
		SettingCourseComponent,
		ClassCourseComponent
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
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		TabMenuModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false, useHash: true } // <-- debugging purposes only
		)
	],
	providers: [CustomerService, CourseService, ClassCourseService],
	bootstrap: [AppComponent]
})
export class AppModule { }
