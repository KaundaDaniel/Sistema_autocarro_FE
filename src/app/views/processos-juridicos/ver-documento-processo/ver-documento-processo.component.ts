import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ConfigService } from 'src/app/providers/config.service';
import { AssociarDocumentoService } from '../associar-documentos/associar-documento.service';

@Component({
  selector: 'verDocumentoProcesso',
  templateUrl: './ver-documento-processo.component.html',
  styleUrls: ['./ver-documento-processo.component.css']
})
export class VerDocumentoProcessoComponent implements OnInit {

  @Input() modal: any = "verDocumentoModal";
  @Input() title: string = "Ver Documentos Associados";
  @Input() documento: any;

  submitted = false;
  public loading = false;
  public process_documents: any = []

  constructor(
    private associarDocumentoService: AssociarDocumentoService,
    public configService: ConfigService
  ) { }

  ngOnInit(): void { }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.documento !== undefined) {
      this.title = "Documentos Processo";
    } else {
      this.title = "Documentos Processo";
    }
  }

  file_name_preview: any;
  previewfile_name(fileName: any) {
    return this.associarDocumentoService.previewImage(fileName)
  }

}
