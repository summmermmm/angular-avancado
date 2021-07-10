// Modulos angular
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Classes
import { Categories } from '../shared/category.model';
import { CategoriesService } from '../shared/categories.service';

// Outros modulos, suitch e toastr
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit, AfterContentChecked {
  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[];
  submittingForm: boolean = false;
  category: Categories = new Categories();

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuild.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  private loadCategory() {
    if (this.currentAction == 'edit') {

      this.route.paramMap.pipe(
          switchMap(params => this.categoriesService.getById(+params.get.name))
      )
        .subscribe(
          (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) //binds dos campos do formulário
        },
        (error) => alert(`Erro ao ler os dadas, ${error}`)
      )
    }
  }

  ngAfterContentChecked() {
    this.setPageTitle()
  }

  private setPageTitle() {
    if(this.currentAction == 'new') {
      this.pageTitle = "Nova Categoria"
    }else{
      const categoryName = this.category.name || ""
      this.pageTitle = "Editar Categoria" + categoryName // ajuste para mostrar o nome só quando tiver o nome
    }
  }
}
