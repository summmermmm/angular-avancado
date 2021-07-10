import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

const routes: Routes = [
  {path: '', component: CategoriesListComponent}, //pagina de listagem
  {path: 'new', component: CategoriesFormComponent}, //rota para criar um novo no formulário
  {path: ':id/edit', component: CategoriesFormComponent} //rota para editar um novo no formulário
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
