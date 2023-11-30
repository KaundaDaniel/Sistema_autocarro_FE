import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/providers/config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProcessosService } from '../processos.service';
import { ProcessosJuridicosComponent } from '../processos-juridicos.component';
import { ClientesService } from '../../clientes/clientes.service';

@Component({
  selector: 'createOrEditProcesso',
  templateUrl: './create-or-edit-processos.component.html',
  styleUrls: ['./create-or-edit-processos.component.css']
})
export class CreateOrEditProcessosComponent implements OnInit {

  @Input() modal: any = "createOrEditProcessoModal";
  @Input() title: string = "Registar Processo";
  @Input() processo: any;
  @Input() processoForm: FormGroup;

  submitted = false;
  public loading = false;

  public filters = {
    search: null,

    search_cliente: null,
    customer_id: null,

    start_date: null,
    end_date: null,

    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public processosService: ProcessosService,
    private clientesService: ClientesService,
    private listProcessosComp: ProcessosJuridicosComponent
  ) {

    this.processoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      codigo: [null],
      search_cliente: [null],
      customer_id: [null, Validators.required],
      description: [null, Validators.required],
      date_start: [null, Validators.required],
      date_end: [null, Validators.required],
      status: [1, Validators.required]
    });
  }

  ngOnInit(): void { }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.processo !== undefined) {
      this.title = "Editar Processo";
      this.processoForm.patchValue(this.processo);
    } else {
      this.title = "Registar Processo";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.processoForm.invalid) {
      return
    }

    this.loading = true;

    this.processosService
      .createOrEdit(this.processoForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        this.listProcessosComp.listOfProcessos()
      })
  }

  resetForm() {
    this.processoForm.reset()
    //this.image_preview = null
  }

  private images: any = []
  uploadFile(event: any) {

    this.images = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.processoForm.patchValue({ image: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.processoForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.processoForm.reset();
  }

  view_cliente = false;
  clientes: any = []

  searchCliente() {

    this.view_cliente = true

    this.filters.search = this.processoForm.getRawValue().search_cliente

    this.clientesService
      .listOfCustomers(this.filters)
      .subscribe(response => {
        this.clientes = Object(response).data
      })
  }

  setCliente(item: any) {
    this.processoForm.patchValue({ customer_id: item.id, search_cliente: item.name })
    this.view_cliente = false
  }


}
