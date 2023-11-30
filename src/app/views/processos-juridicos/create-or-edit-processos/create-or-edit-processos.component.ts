import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoService } from '../../configuracao/configuracao.service';
import { ConfigService } from 'src/app/providers/config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProcessosService } from '../processos.service';

@Component({
  selector: 'createOrEditProcesso',
  templateUrl: './create-or-edit-processos.component.html',
  styleUrls: ['./create-or-edit-processos.component.css']
})
export class CreateOrEditProcessosComponent implements OnInit {

  @Input() modal: any = "createOrEditProcessoModal";
  @Input() title: string = "Registar Processo";
  @Input() processo: any;
  @Input() processoForm: FormGroup;

  submitted = false;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public processosService: ProcessosService,
    private configuracaoService: ConfiguracaoService
  ) {

    this.processoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      customer_id: [null, Validators.required],
      description: [null, Validators.required],
      date_start: [null, Validators.required],
      date_end: [null, Validators.required],
      is_active: [1, Validators.required]
    });
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.processo !== undefined) {
      this.title = "Editar Processo";
      //this.image_preview = this.previewImage(this.product.image)
      this.processoForm.patchValue(this.processo);
    } else {
      this.title = "Registar Processo";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.processoForm.invalid) {
      return
    }

    this.loading = true;

    this.processosService
      .createOrEdit(this.processoForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        //this.listOfProductComp.listOfProduts()
      })
  }

  resetForm() {
    this.processoForm.reset()
    //this.image_preview = null
  }

  private images: any = []
  uploadFile(event: any) {

    this.images = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.processoForm.patchValue({ image: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }



  // convenience getter for easy access to form fields
  get f() {
    return this.processoForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.processoForm.reset();
  }

}
