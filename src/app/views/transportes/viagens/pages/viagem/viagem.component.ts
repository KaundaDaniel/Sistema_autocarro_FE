import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/providers/http.service';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css'],
})
export class ViagemComponent implements OnInit {
  viagemForm!: FormGroup;
  autocarros: any[] = [];
  isEditando: boolean = false;
  loading = false;
  submitted = false;
  viagens: any[] = [];
  modalRef?: BsModalRef;
  @ViewChild('modalCriarViagem') modalCriarRef!: TemplateRef<any>;
  minDateTime: string = '';
  campoFiltro = '';
  valorFiltro = '';
  dataPartidaMin: string = '';

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private http: HttpClient,
    private httpService: HttpService,
    private auth: AuthService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.minDateTime = this.formatDateToInputValue(new Date());
    this.initForm();
    this.listarAutocarros();
    this.carregarViagens();
  }

  verDetalhes() {}

  private formatDateToInputValue(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  initForm() {
    this.viagemForm = this.fb.group(
      {
        idViagem: [null],
        origem: ['', Validators.required],
        destino: ['', Validators.required],
        dataPartida: ['', Validators.required],
        dataChegada: ['', Validators.required],
        precoBase: [null, [Validators.required, Validators.min(0)]],
        idAutocarro: [null, Validators.required],
      },
      {
        validators: [this.validarDatas, this.validarOrigemDestino],
      }
    );
    // Atualizar min de dataChegada dinamicamente
    this.viagemForm
      .get('dataPartida')
      ?.valueChanges.subscribe((dataPartida) => {
        if (dataPartida) {
          this.dataPartidaMin = new Date(dataPartida)
            .toISOString()
            .slice(0, 16);
          this.viagemForm.get('dataChegada')?.updateValueAndValidity(); // Forçar revalidação
        } else {
          this.dataPartidaMin = this.minDateTime;
        }
      });
  }

  provincias: string[] = [
    'Bengo',
    'Benguela',
    'Bié',
    'Cabinda',
    'Cuando Cubango',
    'Cuanza Norte',
    'Cuanza Sul',
    'Cunene',
    'Huambo',
    'Huíla',
    'Luanda',
    'Lunda Norte',
    'Lunda Sul',
    'Malanje',
    'Moxico',
    'Namibe',
    'Uíge',
    'Zaire',
    'Cambo',
    'Kibala',
    'Kuito',
  ];

  validarDatas(group: FormGroup) {
    const partida = new Date(group.get('dataPartida')?.value);
    const chegada = new Date(group.get('dataChegada')?.value);
    if (isNaN(partida.getTime()) || isNaN(chegada.getTime())) {
      return { datasInvalidas: true };
    }
    return chegada >= partida ? null : { datasInvalidas: true };
  }

  validarOrigemDestino(group: FormGroup) {
    const origem = group.get('origem')?.value;
    const destino = group.get('destino')?.value;
    return origem && destino && origem === destino
      ? { origemIgualDestino: true }
      : null;
  }

  get f() {
    return this.viagemForm.controls;
  }

  abrirModal() {
    this.isEditando = false;
    this.submitted = false;
    this.viagemForm.reset();
    this.modalRef = this.modalService.show(this.modalCriarRef, {});
  }

  listarAutocarros() {
    this.http
      .get(`${this.httpService.base_url}/autocarros/disponiveis`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          console.log('Resposta dos autocarros:', res);
          this.autocarros = res.content || [];
          if (this.autocarros.length === 0) {
            console.warn('Nenhum autocarro disponível retornado.');
          }
        },
        (error) => {
          console.error('Erro ao carregar autocarros:', error);
          this.autocarros = [];
        }
      );
  }

  fecharModal() {
    this.modalRef?.hide();
    this.viagemForm.reset();
    this.submitted = false;
    this.loading = false;
  }
  confirmarRemocao(viagem: any) {
    if (confirm('Tens certeza que desejas apagar esta viagem?')) {
      this.apagarViagem(viagem.idViagem);
    }
  }
  apagarViagem(id: number) {
    this.http
      .delete(`${this.httpService.base_url}/viagens/${id}`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe(() => {
        this.carregarViagens();
      });
  }

  limparFiltro() {
    this.campoFiltro = '';
    this.valorFiltro = '';
    this.carregarViagens();
  }

  abrirDetalhes(open: any) {}

  calcularDuracao(dataInicio: string, dataFim: string): string {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffMs = fim.getTime() - inicio.getTime();

    if (diffMs <= 0) return '0min';

    const totalMin = Math.floor(diffMs / 1000 / 60);
    const dias = Math.floor(totalMin / (60 * 24));
    const horas = Math.floor((totalMin % (60 * 24)) / 60);
    const minutos = totalMin % 60;

    if (dias > 0) {
      return `${dias}d/${horas}h`;
    } else if (horas > 0) {
      return `${horas}h/${minutos}min`;
    } else {
      return `${minutos}min`;
    }
  }

  salvarViagem() {
    this.submitted = true;

    if (this.viagemForm.invalid) {
      console.log('Formulário inválido. Erros:', this.viagemForm.errors);
      return;
    }

    this.loading = true;

    const dados = { ...this.viagemForm.value };
    const url = this.isEditando
      ? `${this.httpService.base_url}/viagens/${dados.idViagem}`
      : `${this.httpService.base_url}/viagens`;
    const metodo = this.isEditando ? 'put' : 'post';

    this.http[metodo](url, dados, {
      headers: this.auth.getHeaders(),
    }).subscribe({
      next: () => {
        const mensagem = this.isEditando
          ? 'Viagem actualizada com sucesso'
          : 'Viagem criada com sucesso';

        this.config.toastrSucess(mensagem);
        this.viagemForm.reset();
        this.modalRef?.hide();
        this.submitted = false;
        this.carregarViagens();
      },
      error: (err) => {
        const mensagemErro = err?.error?.message || 'Erro ao criar viagem';
        this.config.toastrError(mensagemErro);
        console.error(err);
        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  editarViagem(viagem: any) {
    this.isEditando = true;
    this.viagemForm.patchValue({
      origem: viagem.origem,
      idViagem: viagem.idViagem,
      destino: viagem.destino,
      dataPartida: viagem.dataPartida,
      dataChegada: viagem.dataChegada,
      precoBase: viagem.precoBase,
      idAutocarro: viagem.idAutocarro,
    });
    this.modalRef = this.modalService.show(this.modalCriarRef, {});
  }

  carregarViagens(): void {
    this.http
      .get(`${this.httpService.base_url}/viagens`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          console.log('Ola res', res);
          this.viagens = (res.content || []).map((v: any) => ({
            ...v,
            duracao: this.calcularDuracao(v.dataPartida, v.dataChegada),
          }));
        },

        (error) => {
          const mensagemErro =
            error?.error?.message || 'Erro ao carregar viagem';
          this.config.toastrError(mensagemErro);
          console.error('Erro ao carregar viagens:', error);
          this.viagens = [];
        }
      );
  }

  filtrarViagens() {
    if (!this.campoFiltro || !this.valorFiltro.trim()) {
      return;
    }

    const campo = encodeURIComponent(this.campoFiltro);
    const valor = encodeURIComponent(this.valorFiltro);

    this.http
      .get(`${this.httpService.base_url}/viagens/buscar?${campo}=${valor}`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          this.viagens = (res.content || []).map((v: any) => ({
            ...v,
            duracao: this.calcularDuracao(v.dataPartida, v.dataChegada),
          }));
        },
        (error) => {
          this.config.toastrError('Erro ao filtrar viagens');
          console.error('Erro ao filtrar viagens:', error);
        }
      );
  }
}
