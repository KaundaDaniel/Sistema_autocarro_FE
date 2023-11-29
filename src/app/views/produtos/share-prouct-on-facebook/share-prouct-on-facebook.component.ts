import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-share-prouct-on-facebook',
  templateUrl: './share-prouct-on-facebook.component.html',
  styleUrls: ['./share-prouct-on-facebook.component.css']
})
export class ShareProuctOnFacebookComponent implements OnInit {

  @Input() modal: any = "shareProuctFacebookModal";
  @Input() title: string = "Partilhar no facebook";
  @Input() product: any;
  @Input() shareFacebookForm: FormGroup;

  submitted = false;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    public produtoService: ProdutoService
  ) {

    this.shareFacebookForm = this.fb.group({
      id: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.shareFacebookForm.controls;
  }

  image_preview: any;
  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.product !== undefined) {
      this.title = "Partilhar no facebook";
      this.image_preview = this.previewImage(this.product.image)

      this.shareFacebookForm.patchValue(this.product);
    } else {
      this.title = "Partilhar no facebook";
    }
  }

  ngOnInit(): void { }

}
