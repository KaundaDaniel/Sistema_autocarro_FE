import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-autocarro-detalhes',
  templateUrl: './autocarro-detalhes.component.html',
  styleUrls: ['./autocarro-detalhes.component.css'],
})
export class AutocarroDetalhesComponent implements OnInit {
  autocarro: any;
  selectedSeats: string[] = [];

  constructor(
    private auth: AuthService,
    private config: ConfigService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || isNaN(id)) {
      console.error('ID inválido');
      this.router.navigate(['/autocarros']);
      return;
    }

    this.loadAutocarroDetails(id);
  }

  /**
   * Carrega os detalhes do autocarro
   */
  loadAutocarroDetails(id: number): void {
    this.http
      .get(`${this.httpService.base_url}/autocarros/${id}`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe({
        next: (res: any) => {
          this.autocarro = res;
          console.log('🟢 Dados do autocarro:', res);
          console.log('🟢 Lugares disponíveis:', res.lugares);
        },
        error: (err) => {
          console.error('❌ Erro ao buscar autocarro:', err);
          alert('Erro ao carregar dados do autocarro');
        },
      });
  }

  /**
   * Organiza os lugares em filas no formato 2-corredor-2
   * Retorna array de filas, cada fila com 4 posições + corredor
   */
  getSeatsInRows(): any[][] {
    if (!this.autocarro?.lugares) {
      return [];
    }

    // Ordenar lugares por número (A1, A2, A3... B1, B2...)
    const sortedSeats = [...this.autocarro.lugares].sort(
      (a, b) =>
        this.getSeatOrder(a.numeroLugar) - this.getSeatOrder(b.numeroLugar)
    );

    const rows: any[][] = [];
    let currentIndex = 0;

    // Criar filas de 4 assentos (2-corredor-2)
    while (currentIndex < sortedSeats.length) {
      const row: any[] = [];

      // Lado esquerdo - 2 assentos
      if (currentIndex < sortedSeats.length) {
        row.push(sortedSeats[currentIndex++]);
      } else {
        row.push(null);
      }

      if (currentIndex < sortedSeats.length) {
        row.push(sortedSeats[currentIndex++]);
      } else {
        row.push(null);
      }

      // Corredor (null representa o espaço vazio)
      row.push(null);

      // Lado direito - 2 assentos
      if (currentIndex < sortedSeats.length) {
        row.push(sortedSeats[currentIndex++]);
      } else {
        row.push(null);
      }

      if (currentIndex < sortedSeats.length) {
        row.push(sortedSeats[currentIndex++]);
      } else {
        row.push(null);
      }

      rows.push(row);
    }

    // Se o último assento for ímpar (como o 19), centralizar
    if (sortedSeats.length % 4 !== 0) {
      const lastSeat = sortedSeats[sortedSeats.length - 1];
      if (this.isSpecialSeat(lastSeat.numeroLugar)) {
        rows.push([null, null, lastSeat, null, null]);
      }
    }

    return rows;
  }

  /**
   * Determina a ordem de classificação dos assentos
   */
  getSeatOrder(seatNumber: string): number {
    // Verificar se é um número simples (como "19")
    if (/^\d+$/.test(seatNumber)) {
      return parseInt(seatNumber) + 1000; // Colocar números simples no final
    }

    // Padrão A1, B2, etc.
    const match = seatNumber.match(/([A-Z])(\d+)/);
    if (match) {
      const letter = match[1].charCodeAt(0) - 65; // A=0, B=1, C=2...
      const number = parseInt(match[2]);
      return letter * 100 + number;
    }

    return 9999; // Fallback para formatos não reconhecidos
  }

  /**
   * Verifica se é um assento especial (como o 19)
   */
  isSpecialSeat(seatNumber: string): boolean {
    return /^\d+$/.test(seatNumber);
  }

  /**
   * Alterna a seleção de um assento
   */
  toggleSeat(seat: any): void {
    if (!seat || seat.estado !== 'LIVRE') {
      return;
    }

    const seatNumber = seat.numeroLugar;
    const index = this.selectedSeats.indexOf(seatNumber);

    if (index > -1) {
      // Desselecionar
      this.selectedSeats.splice(index, 1);
      console.log(`🔄 Assento ${seatNumber} desmarcado`);
    } else {
      // Selecionar
      this.selectedSeats.push(seatNumber);
      console.log(`✅ Assento ${seatNumber} selecionado`);
    }

    console.log('🎫 Assentos selecionados:', this.selectedSeats);
  }

  /**
   * Verifica se um assento está selecionado
   */
  isSelected(seatNumber: string): boolean {
    return this.selectedSeats.includes(seatNumber);
  }

  /**
   * Retorna a classe CSS do ícone baseado no estado do assento
   */
  getSeatIcon(seat: any): string {
    if (this.isSelected(seat.numeroLugar)) {
      return 'fas fa-check'; // Ícone de check para selecionados
    } else if (seat.estado === 'LIVRE') {
      return 'fas fa-chair'; // Ícone de cadeira para livres
    } else {
      return 'fas fa-user'; // Ícone de usuário para ocupados
    }
  }

  /**
   * Retorna as classes CSS do assento baseado no estado
   */
  getSeatClasses(seat: any): string {
    if (!seat) return 'aisle';

    let classes = 'seat ';

    if (this.isSelected(seat.numeroLugar)) {
      classes += 'seat-selecionado';
    } else if (seat.estado === 'LIVRE') {
      classes += 'seat-livre';
    } else {
      classes += 'seat-ocupado';
    }

    return classes;
  }

  /**
   * Confirma a seleção dos assentos
   */
  confirmarSelecao(): void {
    if (this.selectedSeats.length === 0) {
      alert('Por favor, selecione pelo menos um lugar!');
      return;
    }

    const confirmacao = confirm(
      `Confirmar seleção dos lugares: ${this.selectedSeats.join(', ')}?\n\n` +
        `Total de lugares: ${this.selectedSeats.length}`
    );

    if (confirmacao) {
      this.processarReserva();
    }
  }

  /**
   * Processa a reserva dos assentos selecionados
   */
  private processarReserva(): void {
    const reservaData = {
      autocarroId: this.autocarro.id,
      lugares: this.selectedSeats,
      dataReserva: new Date().toISOString(),
      // Adicione outros campos necessários para a reserva
    };

    console.log('📝 Processando reserva:', reservaData);

    // Fazer a requisição para o backend
    this.http
      .post(`${this.httpService.base_url}/reservas`, reservaData, {
        headers: this.auth.getHeaders(),
      })
      .subscribe({
        next: (response: any) => {
          console.log('✅ Reserva criada com sucesso:', response);
          alert(
            `Reserva confirmada com sucesso!\nLugares: ${this.selectedSeats.join(
              ', '
            )}`
          );

          // Limpar seleção
          this.selectedSeats = [];

          // Recarregar dados do autocarro para atualizar estado dos lugares
          this.loadAutocarroDetails(this.autocarro.id);

          // Opcional: redirecionar para página de confirmação
          // this.router.navigate(['/reservas', response.id]);
        },
        error: (err) => {
          console.error('❌ Erro ao criar reserva:', err);
          alert('Erro ao processar reserva. Tente novamente.');
        },
      });
  }

  /**
   * Cancela todas as seleções
   */
  cancelarSelecao(): void {
    if (this.selectedSeats.length > 0) {
      const confirmacao = confirm('Deseja cancelar todas as seleções?');
      if (confirmacao) {
        this.selectedSeats = [];
        console.log('🔄 Seleções canceladas');
      }
    }
  }

  /**
   * Retorna informações estatísticas sobre os lugares
   */
  getSeatsStats() {
    if (!this.autocarro?.lugares) {
      return { total: 0, livres: 0, ocupados: 0, selecionados: 0 };
    }

    const total = this.autocarro.lugares.length;
    const livres = this.autocarro.lugares.filter(
      (l: any) => l.estado === 'LIVRE'
    ).length;
    const ocupados = total - livres;
    const selecionados = this.selectedSeats.length;

    return { total, livres, ocupados, selecionados };
  }

  /**
   * Método auxiliar para debug
   */
  debugSeats(): void {
    console.log('🔍 Debug - Autocarro:', this.autocarro);
    console.log('🔍 Debug - Lugares:', this.autocarro?.lugares);
    console.log('🔍 Debug - Selecionados:', this.selectedSeats);
    console.log('🔍 Debug - Filas organizadas:', this.getSeatsInRows());
  }
}
