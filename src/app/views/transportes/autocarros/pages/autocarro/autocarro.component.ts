import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocarro',
  templateUrl: './autocarro.component.html',
  styleUrls: ['./autocarro.component.css'],
})
export class AutocarroComponent implements OnInit {
  autocarroForm!: FormGroup;
  modalRef?: BsModalRef;
  isEditando: boolean = false;
  loading = false;
  submitted = false;
  campoFiltro: string = '';
  valorFiltro: string = '';

  @ViewChild('modalCriarAutocarro') modalCriarRef!: TemplateRef<any>;

  empresas: any[] = []; // Popular esta lista via HTTP
  autocarros: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private http: HttpClient,
    private auth: AuthService,
    private config: ConfigService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEmpresas();
    this.listarAutocarros();
  }

  aplicarFiltro() {
    const filtros: any = {};

    switch (this.campoFiltro) {
      case 'nomeEmpresa':
        filtros.nomeEmpresa = this.valorFiltro;
        break;
      case 'estado':
        filtros.estado = this.valorFiltro;
        break;
      case 'identificacao':
        filtros.identificacao = this.valorFiltro;
        break;
      case 'tipo':
        filtros.tipo = this.valorFiltro;
        break;
      case 'capacidade':
        filtros.capacidade = this.valorFiltro;
        break;
      case 'origem':
        filtros.origem = this.valorFiltro;
        break;
      case 'destino':
        filtros.destino = this.valorFiltro;
        break;
    }

    this.listarAutocarros(filtros);
  }

  limparFiltro() {
    this.campoFiltro = '';
    this.valorFiltro = '';
    this.listarAutocarros();
  }

  initForm() {
    this.autocarroForm = this.fb.group({
      idAutocarro: [null],
      identificacao: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      capacidade: [null, [Validators.required, Validators.min(1)]],
      tipo: ['standard', Validators.required],
      estado: ['disponivel', Validators.required],
      idEmpresa: [null, Validators.required],
    });
  }
  get f() {
    return this.autocarroForm.controls;
  }

  editar(idAutocarro: number, event: Event) {
    event.stopPropagation();
    const autocarro = this.autocarros.find(
      (a) => a.idAutocarro === idAutocarro
    );
    if (!autocarro) return;

    this.isEditando = true;
    this.submitted = false;

    this.modalRef = this.modalService.show(this.modalCriarRef, {
      class: 'modal-md',
    });

    setTimeout(() => {
      this.autocarroForm.patchValue(autocarro);
    }, 0);
  }

  apagar(idAutocarro: number, event: Event) {
    event.stopPropagation();
    if (confirm('Tens a certeza que desejas apagar este autocarro?')) {
      this.http
        .delete(`${this.httpService.base_url}/autocarros/${idAutocarro}`, {
          headers: this.auth.getHeaders(),
        })
        .subscribe({
          next: () => {
            this.config.toastrSucess('Autocarro removido com sucesso');
            this.listarAutocarros();
          },
          error: (err) => {
            this.config.toastrError('Erro ao apagar autocarro');
            console.error(err);
          },
        });
    }
  }

  abrirModal() {
    this.isEditando = false;
    this.autocarroForm.reset({ tipo: 'standard', estado: 'disponivel' });
    this.modalRef = this.modalService.show(this.modalCriarRef, {
      class: 'modal-md',
    });
  }

  salvarAutocarro() {
    if (this.autocarroForm.invalid) return;

    const dados = this.autocarroForm.value;
    const url = this.isEditando
      ? `${this.httpService.base_url}/autocarros/${dados.idAutocarro}`
      : `${this.httpService.base_url}/autocarros`;

    const metodo = this.isEditando ? 'put' : 'post';

    this.http[metodo](url, dados, {
      headers: this.auth.getHeaders(),
    }).subscribe({
      next: () => {
        this.config.toastrSucess('Autocarro salvo com sucesso');
        this.modalRef?.hide();
        this.listarAutocarros();
      },
      error: (err) => {
        this.config.toastrError('Erro ao salvar autocarro');
        console.error(err);
      },
    });
  }

  getEmpresas() {
    this.http
      .get(`${this.httpService.base_url}/empresas`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe((res: any) => (this.empresas = res?.content || []));
  }

  listarAutocarros(filtros: any = {}) {
    const params: any = {};

    if (filtros.nomeEmpresa) params.nomeEmpresa = filtros.nomeEmpresa;
    if (filtros.estado) params.estado = filtros.estado;
    if (filtros.tipo) params.tipo = filtros.tipo;
    if (filtros.capacidade) params.capacidade = filtros.capacidade;
    if (filtros.origem) params.origem = filtros.origem;
    if (filtros.destino) params.destino = filtros.destino;

    this.http
      .get(`${this.httpService.base_url}/autocarros/filtrar`, {
        headers: this.auth.getHeaders(),
        params,
      })
      .subscribe((res: any) => (this.autocarros = res?.content || []));
  }

  verDetalhes(id: number) {
    this.router.navigate(['/transportes/autocarros', id]);
  }
}
