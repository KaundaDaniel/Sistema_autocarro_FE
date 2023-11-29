import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { CategoriasComponent } from '../categorias.component';

@Component({
  selector: 'createOrEditCategoria',
  templateUrl: './create-or-edit-categorias.component.html',
  styleUrls: ['./create-or-edit-categorias.component.css']
})
export class CreateOrEditCategoriasComponent implements OnInit {

  @Input() modal: any = "createOrEditCategoriaModal";
  @Input() title: string = "Registar Categória";
  @Input() category: any;

  submitted = false;
  private loading = false;

  @Input() categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriasComp: CategoriasComponent,
    private categoriaService: CategoriaService
  ) {

    this.categoriaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      description: [null, Validators.required],
      slug: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.categoriaForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.categoriaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.category !== undefined) {
      this.title = "Editar Categória";
      this.categoriaForm.patchValue(this.category);
    } else {
      this.title = "Registar Categória";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.categoriaForm.invalid) {
      return
    }

    this.loading = true;

    this.categoriaService
      .createOrEdit(this.categoriaForm)
      .subscribe(res => {
        this.loading = false;
        this.categoriasComp.listaOfCategorias()
      })
  }

}
