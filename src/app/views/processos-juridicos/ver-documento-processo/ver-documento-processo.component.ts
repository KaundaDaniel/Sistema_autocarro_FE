import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { ProcessosService } from '../processos.service';

@Component({
  selector: 'verDocumentoProcesso',
  templateUrl: './ver-documento-processo.component.html',
  styleUrls: ['./ver-documento-processo.component.css']
})
export class VerDocumentoProcessoComponent implements OnInit {

  @Input() modal: any = "verDocumentosProcessoModal";
  @Input() title: string = "Ver Documentos Associados";
  @Input() processo: any;

  submitted = false;
  public loading = false;
  public process_documents: any = []

  constructor(
    private processosService: ProcessosService,
    public configService: ConfigService
  ) { }

  ngOnInit(): void { }


  getDocumentoProcesso(legal_process_id: any) {
    this.processosService
      .getDocumentoProcesso(legal_process_id)
      .subscribe(response => {
        this.process_documents = response
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.processo !== undefined) {
      this.getDocumentoProcesso(this.processo.id)
      this.title = "Documentos Processo";
    } else {
      this.title = "Documentos Processo";
    }
  }

}
