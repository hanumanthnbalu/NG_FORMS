import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeRoutingModule } from './forms/employee-routing.module';

const route = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', loadChildren: './forms/employee.module#EmployeeModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(route),
             EmployeeRoutingModule
            ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
