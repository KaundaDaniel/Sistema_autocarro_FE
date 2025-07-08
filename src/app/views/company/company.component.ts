import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  submitted = false;
  loading = false;
  company: any = {};
  empresas: any[] = [];
  modalRef?: BsModalRef;
  isEditando: boolean = false;

  paginaActual = 0;
  totalPaginas = 0;
  totalRegistos = 0;
  tamanhoPagina = 5;
  empresaSelecionada: any = null;

  filtros: { [key: string]: string } = {
    nome: '',
    nif: '',
    cidade: '',
    distrito: '',
    contacto: '',
  };

  @ViewChild('template') modalTemplateRef!: TemplateRef<any>;
  @ViewChild('modalDetalhes') modalDetalhesRef!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.companyForm = this.fb.group({
      idEmpresa: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      contacto: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      nif: [null, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      endereco: [null, [Validators.required, Validators.maxLength(255)]],
      cidade: [null, [Validators.required, Validators.maxLength(100)]],
      distrito: [null, [Validators.required, Validators.maxLength(100)]],
      codigoPostal: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {
    const user = this.authService.current_user();
    if (!user?.roles?.includes('ADMIN')) {
      this.router.navigateByUrl('/home');
    }

    this.getEmpresas();
    console.log('🔐 Empresas:', this.empresas);
  }

  campoSelecionado: string = '';
  valorFiltro: string = '';

  getPlaceholder(): string {
    switch (this.campoSelecionado) {
      case 'empresa':
        return 'Digite o nome da empresa';
      case 'nome':
        return 'Digite o nome';
      case 'nif':
        return 'Digite o NIF';
      case 'cidade':
        return 'Digite a cidade';
      default:
        return 'Digite um valor';
    }
  }

  filtrar() {
    // Limpa todos os filtros
    for (const key of Object.keys(this.filtros)) {
      this.filtros[key] = '';
    }

    // Aplica o filtro seleccionado
    if (this.campoSelecionado && this.valorFiltro) {
      this.filtros[this.campoSelecionado] = this.valorFiltro;
    }

    // Chama o método para buscar empresas
    this.getEmpresas(0);
  }
  limpar() {
    this.campoSelecionado = '';
    this.valorFiltro = '';
    for (const key of Object.keys(this.filtros)) {
      this.filtros[key] = '';
    }
    this.getEmpresas(0);
  }

  get f() {
    return this.companyForm.controls;
  }

  abrirModal(template: TemplateRef<any>) {
    this.companyForm.reset();
    this.submitted = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }

  fecharModal() {
    this.isEditando = false;
    this.modalRef?.hide();
  }

  save() {
    this.submitted = true;

    if (this.companyForm.invalid) {
      return;
    }

    this.markFormGroupTouched(this.companyForm);

    this.loading = true;
    const empresaData = this.companyForm.getRawValue();

    const url = this.isEditando
      ? `${this.httpService.base_url}/empresas/${empresaData.idEmpresa}`
      : `${this.httpService.base_url}/empresas`;

    const metodo = this.isEditando ? 'put' : 'post';

    this.http[metodo](url, empresaData, {
      headers: this.authService.getHeaders(),
    }).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.submitted = false;
        const mensagem =
          response?.message ||
          (this.isEditando
            ? 'Empresa actualizada com sucesso'
            : 'Empresa criada com sucesso');

        this.configService.toastrSucess(mensagem);

        this.companyForm.reset();
        this.companyForm.markAsUntouched();
        this.getEmpresas();
        this.fecharModal();
      },
      error: (err) => {
        this.loading = false;
        const mensagem = err?.error?.message || 'Erro ao salvar empresa.';
        this.configService.toastrError(mensagem);
        console.error('Erro ao salvar empresa:', err);
      },
    });
  }

  editar(empresa: any) {
    this.isEditando = true;
    this.submitted = false;

    // Abre primeiro a modal
    this.modalRef = this.modalService.show(this.modalTemplateRef, {
      class: 'modal-xl',
    });

    // Aguarda a abertura completa da modal
    setTimeout(() => {
      this.companyForm.patchValue(empresa);
    }, 0);
  }
  verDetalhes(empresa: any) {
    const url = `${this.httpService.base_url}/empresas/${empresa.idEmpresa}/detalhes`;

    this.http.get(url, { headers: this.authService.getHeaders() }).subscribe({
      next: (res: any) => {
        this.empresaSelecionada = res;
        this.modalRef = this.modalService.show(this.modalDetalhesRef, {
          class: 'modal-lg',
        });
      },
      error: (err) => {
        this.configService.toastrError('Erro ao carregar detalhes da empresa');
        console.error('Erro detalhes empresa:', err);
      },
    });
  }

  apagar(idEmpresa: number) {
    if (confirm('Tens a certeza que queres apagar esta empresa?')) {
      this.http
        .delete(`${this.httpService.base_url}/empresas/${idEmpresa}`, {
          headers: this.authService.getHeaders(),
        })
        .subscribe(() => {
          this.getEmpresas();
        });
    }
    console.log('🔐 Apagando empresa', idEmpresa);
  }

  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.getEmpresas(pagina);
    }
  }

  getEmpresas(page: number = 0) {
    const filtrosActivos = Object.fromEntries(
      Object.entries(this.filtros).filter(([_, v]) => v && v.trim() !== '')
    );

    const params = {
      ...filtrosActivos,
      page: page.toString(),
      size: this.tamanhoPagina.toString(),
    };

    this.http
      .get(`${this.httpService.base_url}/empresas/filtrar`, {
        headers: this.authService.getHeaders(),
        params,
      })
      .subscribe((res: any) => {
        this.empresas = res?.content || [];
        this.paginaActual = res?.number || 0;
        this.totalPaginas = res?.totalPages || 0;
        this.totalRegistos = res?.totalElements || 0;
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
