import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './forms/list-employee/list-employee.component';
import { EmployeeService } from './forms/employee.service';
import { CreateEmployeeComponent } from './forms/create-employee/create-employeecomponent';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
    NotFoundComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent
	],
  imports: [ BrowserModule,
             FormsModule,
             HttpClientModule,
             AppRoutingModule,
             ReactiveFormsModule ],
	providers: [ EmployeeService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
