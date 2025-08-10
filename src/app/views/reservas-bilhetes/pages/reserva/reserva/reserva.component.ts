import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

interface Reserva {
  id: number;
  cliente: string;
  data: Date;
  status: string;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  reservasPaginadas: Reserva[] = [];
  modalRef?: BsModalRef;

  dataInicio!: string;
  dataFim!: string;

  @ViewChild('detalhesReserva') modalCriarRef!: TemplateRef<any>;

  // Paginação
  paginaActual = 1;
  tamanhoPagina = 5;
  totalPaginas = 1;
  totalPaginasArray: number[] = [];
  reservaSelecionada: any = null;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    // Dados de teste (depois trocas pelo retorno da API)
    this.reservas = [
      {
        id: 1,
        cliente: 'João António',
        data: new Date('2025-08-01'),
        status: 'Confirmada',
      },
      {
        id: 2,
        cliente: 'Maria Pedro',
        data: new Date('2025-08-03'),
        status: 'Pendente',
      },
      {
        id: 3,
        cliente: 'Carlos Mário',
        data: new Date('2025-08-04'),
        status: 'Cancelada',
      },
      {
        id: 4,
        cliente: 'Ana Luísa',
        data: new Date('2025-08-05'),
        status: 'Confirmada',
      },
      {
        id: 5,
        cliente: 'Paulo Jorge',
        data: new Date('2025-08-06'),
        status: 'Pendente',
      },
      {
        id: 6,
        cliente: 'Marta Lopes',
        data: new Date('2025-08-07'),
        status: 'Confirmada',
      },
      {
        id: 7,
        cliente: 'Francisco Domingos',
        data: new Date('2025-08-08'),
        status: 'Cancelada',
      },
    ];

    this.actualizarPaginacao();
  }

  abrirModal(template: any, reserva: any) {
    this.reservaSelecionada = reserva;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md',
    });
  }

  filtrarPorData() {
    if (!this.dataInicio || !this.dataFim) {
      this.actualizarPaginacao();
      return;
    }

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);

    const filtradas = this.reservas.filter((r) => {
      const dataReserva = new Date(r.data);
      return dataReserva >= inicio && dataReserva <= fim;
    });

    this.reservasPaginadas = filtradas.slice(0, this.tamanhoPagina);
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(filtradas.length / this.tamanhoPagina);
    this.totalPaginasArray = Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
  }

  mudarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;

    const inicio = (pagina - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.reservasPaginadas = this.reservas.slice(inicio, fim);
  }

  actualizarPaginacao() {
    this.totalPaginas = Math.ceil(this.reservas.length / this.tamanhoPagina);
    this.totalPaginasArray = Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
    this.mudarPagina(1);
  }
}
