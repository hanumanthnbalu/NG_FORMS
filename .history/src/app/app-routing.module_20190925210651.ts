import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TempDrivenFormComponent } from './forms/temp-driven-form/temp-driven-form.component';
import { ArrayformsComponent } from './forms/arrayforms/arrayforms.component';
import { ListEmployeeComponent } from './forms/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './forms/create-employee/create-employeecomponent';

const route = [
  // { path: '', redirectTo: '/characters/all', pathMatch: 'full' },
  { path: '', redirectTo: '/list-employees', pathMatch: 'full' },
  { path: 'list-employees', component: ListEmployeeComponent },
  { path: 'create-employees', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: 'arrayForms', component: ArrayformsComponent },
	{
		path: 'characters',
		component: TabsComponent,
		children: [ { path: '', redirectTo: 'all', pathMatch: 'full' }, { path: ':side', component: ListComponent } ]
	},
  { path: 'new-character', loadChildren: './create-character/create-charcter.module#CreateCharacterModule' },
  { path: 'forms/template', component: TempDrivenFormComponent },
  { path: 'forms/reactive', component: ReactiveFormComponent },
	// { path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(route) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
