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
  constructor(
    private auth: AuthService,
    private config: ConfigService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || isNaN(id)) {
      console.error('ID inválido');
      return;
    }

    this.http
      .get(`${this.httpService.base_url}/autocarros/${id}`, {
        headers: this.auth.getHeaders(),
      })
      .subscribe({
        next: (res: any) => {
          this.autocarro = res;
          console.log('🟢 Dados do autocarro:', res);
        },
        error: (err) => {
          console.error('Erro ao buscar autocarro:', err);
          // podes navegar para uma página de erro ou mostrar uma notificação
        },
      });
  }
}
