import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';

// PrimeNG
import {
  MegaMenuModule, TreeTableModule
} from 'primeng/primeng';

// Custom Component
import { CustomersComponent } from './customers/customers.component';
import { StudentsComponent } from './students/students.component';
import { CustomersService } from './customers/customers.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    MegaMenuModule,
    TreeTableModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ CustomersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
