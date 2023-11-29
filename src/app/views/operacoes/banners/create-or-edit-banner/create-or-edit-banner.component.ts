import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { BannerService } from '../banner.service';
import { BannersComponent } from '../banners.component';

@Component({
  selector: 'createOrEditBanner',
  templateUrl: './create-or-edit-banner.component.html',
  styleUrls: ['./create-or-edit-banner.component.css']
})
export class CreateOrEditBannerComponent implements OnInit {

  @Input() modal: any = "createOrEditBannerModal";
  @Input() title: string = "Registar Banner";
  @Input() banner: any;
  @Input() bannerForm: FormGroup;

  submitted = false;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public bannerService: BannerService,
    private bannersComponent: BannersComponent
  ) {

    this.bannerForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      title: [null, Validators.required],
      sub_title: [null, Validators.required],
      image: [null, Validators.required],
      is_active: [null, Validators.required],
      ordem: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.bannerForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.bannerForm.reset();
  }

  image_preview: any;
  previewImage(fileName: any) {
    return this.bannerService.previewImage(fileName)
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.banner !== undefined) {
      this.title = "Editar Banner";
      this.image_preview = this.previewImage(this.banner.image)
      this.bannerForm.patchValue(this.banner);
    } else {
      this.title = "Registar Banner";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.bannerForm.invalid) {
      return
    }

    this.loading = true;

    this.bannerService.createOrEdit(this.bannerForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        }
        this.loading = false;
        this.bannersComponent.listaOfBanners()
      })
  }

  resetForm() {
    this.bannerForm.reset()
    this.image_preview = null
  }

  private images: any = []
  uploadFile(event: any) {

    this.images = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.bannerForm.patchValue({ image: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }

}
