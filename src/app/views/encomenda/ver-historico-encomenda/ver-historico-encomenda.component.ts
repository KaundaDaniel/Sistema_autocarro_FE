import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ConfigService } from 'src/app/providers/config.service';
import { EncomendaService } from '../encomenda.service';

@Component({
  selector: 'verHistoricoEncomenda',
  templateUrl: './ver-historico-encomenda.component.html',
  styleUrls: ['./ver-historico-encomenda.component.css']
})
export class VerHistoricoEncomendaComponent implements OnInit {

  @Input() modal: any = "verHistoricoEncomendaModal";
  @Input() title: string = "Historico Encomenda";
  @Input() order: any;

  submitted = false;
  public loading = false;
  public order_historic: any = []

  constructor(
    private encomendaService: EncomendaService,
    public configService: ConfigService
  ) { }

  ngOnInit(): void { }


  getOrderHistoric(order_id: any) {
    this.encomendaService
      .getOrderHistoric(order_id)
      .subscribe(response => {
        this.order_historic = response
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.order !== undefined) {
      this.getOrderHistoric(this.order.id)
      this.title = "Historico Encomenda";
    } else {
      this.title = "Historico Encomenda";
    }
  }

}
