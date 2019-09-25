import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { ListEmployeeComponent } from './forms/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './forms/create-employee/create-employeecomponent';

const route = [
  { path: '', redirectTo: '/list-employees', pathMatch: 'full' },
  { path: 'list-employees', component: ListEmployeeComponent },
  { path: 'create-employees', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(route) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
