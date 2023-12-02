import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ProcessosService } from '../processos.service';
import { AssociarDocumentoService } from '../associar-documentos/associar-documento.service';
import { ConfigService } from 'src/app/providers/config.service';

@Component({
  selector: 'listarDocumentos',
  templateUrl: './listar-documentos.component.html',
  styleUrls: ['./listar-documentos.component.css']
})
export class ListarDocumentosComponent implements OnInit {

  @Input() modal: any = "listarDocumentosModal";
  @Input() title: string = "Listar Documentos";
  @Input() processo: any;


  submitted = false;

  public loading = false;
  public documento: any;
  public process_documents: any = []

  constructor(
    private processosService: ProcessosService,
    private associarDocumentoService: AssociarDocumentoService,
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
      this.title = "Listar Documentos";
    } else {
      this.title = "Listar Documentos";
    }
  }

  setDocumento(item: any) {
    this.documento = item
  }

  file_name_preview: any;
  previewfile_name(fileName: any) {
    return this.associarDocumentoService.previewImage(fileName)
  }

}
