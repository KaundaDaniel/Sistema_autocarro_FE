import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { NewsComponent } from '../news.component';
import { NewsService } from '../news.service';

@Component({
  selector: 'createOrEditNews',
  templateUrl: './create-or-edit-news.component.html',
  styleUrls: ['./create-or-edit-news.component.css']
})
export class CreateOrEditNewsComponent implements OnInit {

  @Input() modal: any = "createOrEditNewsModal";
  @Input() title: string = "Postar Notícia";
  @Input() new: any;
  @Input() newsForm: FormGroup;

  submitted = false;
  public loading = false;
  public categories: any = []
  public product_types: any = []
  public taxes: any = []

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public newsService: NewsService,
    private newsComponent: NewsComponent
  ) {

    this.newsForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      area: [null, Validators.required],
      subject: [null, Validators.required],
      body: [null, Validators.required],
      image: [null, Validators.required],
      is_active: [null]
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.newsForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.newsForm.reset();
  }

  image_preview: any;
  previewImage(fileName: any) {
    return this.newsService.previewImage(fileName)
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.new !== undefined) {
      this.title = "Editar Notícia";
      this.image_preview = this.previewImage(this.new.image)
      this.newsForm.patchValue(this.new);
    } else {
      this.title = "Postar Notícia";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.newsForm.invalid) {
      return
    }

    this.loading = true;

    this.newsService.createOrEdit(this.newsForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        }
        this.loading = false;
        this.newsComponent.listaOfNews()
      })
  }

  resetForm() {
    this.newsForm.reset()
    this.image_preview = null
  }

  private images: any = []
  uploadFile(event: any) {

    this.images = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.newsForm.patchValue({ image: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }

}
