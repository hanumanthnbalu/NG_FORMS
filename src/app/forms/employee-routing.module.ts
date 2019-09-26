import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employeecomponent';

const route = [
  { path: 'employees', children: [
    { path: '', component: ListEmployeeComponent },
    { path: 'create-employees', component: CreateEmployeeComponent },
    { path: 'edit/:id', component: CreateEmployeeComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(route) ],
  exports: [ RouterModule ]
})
export class EmployeeRoutingModule {}
