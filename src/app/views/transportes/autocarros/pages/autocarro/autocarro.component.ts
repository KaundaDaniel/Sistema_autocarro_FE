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

  @ViewChild('modalCriarAutocarro') modalCriarRef!: TemplateRef<any>;

  empresas: any[] = [];
  autocarros: any[] = [];

  // Paginação
  paginaActual = 1;
  itensPorPagina = 8;
  totalRegistos = 0;

  // Filtros
  campoFiltro: string = '';
  valorFiltro: string = '';

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

  initForm() {
    this.autocarroForm = this.fb.group({
      idAutocarro: [null],
      matricula: [
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

  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.totalRegistos / this.itensPorPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  get f() {
    return this.autocarroForm.controls;
  }

  abrirModal() {
    this.isEditando = false;
    this.submitted = false;
    this.autocarroForm.reset({ tipo: 'standard', estado: 'disponivel' });
    this.modalRef = this.modalService.show(this.modalCriarRef, {
      class: 'modal-md',
    });
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

  salvarAutocarro() {
    this.submitted = true;
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

  listarAutocarros(filtrar = false) {
    this.loading = true;
    const endpoint = filtrar
      ? `${this.httpService.base_url}/autocarros/filtrar`
      : `${this.httpService.base_url}/autocarros`;

    const params: any = {
      page: this.paginaActual - 1,
      size: this.itensPorPagina,
    };

    if (filtrar) {
      switch (this.campoFiltro) {
        case 'nomeEmpresa':
          params.nomeEmpresa = this.valorFiltro;
          break;
        case 'estado':
          params.estado = this.valorFiltro;
          break;
        case 'tipo':
          params.tipo = this.valorFiltro;
          break;
        case 'matricula':
          params.matricula = this.valorFiltro;
          break;

        case 'capacidade':
          params.capacidade = this.valorFiltro;
          break;
        case 'origem':
          params.origem = this.valorFiltro;
          break;
        case 'destino':
          params.destino = this.valorFiltro;
          break;
      }
    }

    this.http
      .get(endpoint, {
        headers: this.auth.getHeaders(),
        params,
      })
      .subscribe({
        next: (res: any) => {
          this.autocarros = res?.content || [];
          this.totalRegistos = res?.totalElements || 0;
          this.loading = false;
        },
        error: (err) => {
          this.config.toastrError('Erro ao carregar autocarros');
          this.loading = false;
        },
      });
  }

  filtrar() {
    this.paginaActual = 1;
    this.listarAutocarros(true);
  }

  limparFiltro() {
    this.campoFiltro = '';
    this.valorFiltro = '';
    this.paginaActual = 1;
    this.listarAutocarros();
  }

  paginaAlterada(pagina: number) {
    this.paginaActual = pagina;
    this.listarAutocarros(!!this.campoFiltro && !!this.valorFiltro);
  }

  verDetalhes(id: number) {
    this.router.navigate(['/transportes/autocarros', id]);
  }
}
