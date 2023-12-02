import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { ProcessosService } from '../processos.service';
import { ProcessosJuridicosComponent } from '../processos-juridicos.component';
import { AssociarDocumentoService } from './associar-documento.service';

@Component({
  selector: 'associarDocumento',
  templateUrl: './associar-documentos.component.html',
  styleUrls: ['./associar-documentos.component.css']
})
export class AssociarDocumentosComponent implements OnInit {

  @Input() modal: any = "associarDocumentoModal";
  @Input() title: string = "Associar Documento";
  @Input() processo: any;
  @Input() associarDocumentoForm: FormGroup;

  submitted = false;
  public loading = false;

  public filters = {
    search: null,
    start_date: null,
    end_date: null,
    status: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public processosService: ProcessosService,
    private associarDocumentoService: AssociarDocumentoService,
    private listProcessosComp: ProcessosJuridicosComponent
  ) {

    this.associarDocumentoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      title: [null],
      file_name: [null],
      legal_process_id: [null]
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.associarDocumentoForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.associarDocumentoForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.processo !== undefined) {
      this.title = "Associar Documento";

      console.log(this.processo)
      this.associarDocumentoForm.patchValue({ legal_process_id: this.processo.id });
    } else {
      this.title = "Associar Documento";
    }
  }

  associarDocumento() {

    this.submitted = true
    if (this.associarDocumentoForm.invalid) {
      return
    }

    this.loading = true;

    this.associarDocumentoService
      .associarDocumento(this.associarDocumentoForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        this.listProcessosComp.listOfProcessos()
      })
  }

  resetForm() {
    this.associarDocumentoForm.reset()
  }

  private file_names: any = []
  uploadFile(event: any) {

    this.file_names = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.file_names.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.associarDocumentoForm.patchValue({ file_name: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }

}
