import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/categories.service';
import { Categories } from '../shared/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  categories: Categories[] = [];

  //Methods CRUD
  getCategories(): void {
    this.categoriesService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  deleteCategories(category: any): void {
    const mustDelete = confirm(`Deseja deletar ${category.name}`);

    if (mustDelete) {
      this.categoriesService.delete(category.id).subscribe(
        () =>
          (this.categories = this.categories.filter(
            (element) => element != category
          )),
        () => alert('Erro ao excluir')
      );
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
