import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/providers/config.service';
import { ConfiguracaoService } from '../../configuracao/configuracao.service';
import { ClientesComponent } from '../clientes.component';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-create-or-edit-cliente',
  templateUrl: './create-or-edit-cliente.component.html',
  styleUrls: ['./create-or-edit-cliente.component.css']
})
export class CreateOrEditClienteComponent implements OnInit {

  @Input() modal: any = "createOrEditClienteModal";
  @Input() title: string = "Registar Cliente";
  @Input() customer: any;
  @Input() customerForm: FormGroup;

  submitted = false;
  public loading = false;

  public provincias: any = []
  public municipios: any = []
  public bairros: any = []

  laodings = {
    municipio: '',
    bairro: ''
  }

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private clientesComp: ClientesComponent,
    private clientesService: ClientesService,
    private configuracaoService: ConfiguracaoService
  ) {

    this.customerForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      is_active: [1, Validators.required],
      gender: [null, Validators.required],
      type_of_customer: ['NORMAL', Validators.required],
      provincia_id: [null, Validators.required],
      municipio_id: [null, Validators.required],
      bairro_id: [null, Validators.required],
    });

    this.listOfProvinces()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.customerForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.customerForm.reset();
  }

  listOfProvinces() {
    this.loading = true
    this.configuracaoService
      .listOfProvinces()
      .subscribe(res => {
        this.provincias = Object(res)
        this.loading = false
      })
  }

  handMunicipios(event: any) {
    var id = event.target.value
    this.getMunicipiosByProvincia(id)
  }

  getMunicipiosByProvincia(id: any) {

    this.laodings.municipio = 'Carregando...'

    this.configuracaoService
      .getMunicipiosByProvincia(id)
      .subscribe(res => {
        this.municipios = Object(res)
        this.laodings.municipio = ''
      })
  }

  handBairros(event: any) {
    var id = event.target.value
    this.getBairrosByMunicipio(id)
  }

  getBairrosByMunicipio(id: any) {

    this.laodings.bairro = 'Carregando...'

    this.configuracaoService
      .getBairrosByMunicipio(id)
      .subscribe(res => {
        this.bairros = Object(res)
        this.laodings.bairro = ''
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.customer !== undefined) {
      this.title = "Editar Cliente";
      this.customerForm.patchValue(this.customer);
    } else {
      this.title = "Registar Cliente";
    }
  }

  createOrEdit() {

    this.submitted = true
    
    if (this.customerForm.invalid) {
      return
    }

    this.loading = true;

    this.clientesService
      .createOrEdit(this.customerForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.customerForm.reset()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        this.clientesComp.listOfCustomers()
      })
  }


}
