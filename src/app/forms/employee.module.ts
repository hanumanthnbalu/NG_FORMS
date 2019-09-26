import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEmployeeComponent } from './create-employee/create-employeecomponent';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

@NgModule({
  declarations: [
    ListEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
