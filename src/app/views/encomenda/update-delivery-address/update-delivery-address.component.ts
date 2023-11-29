import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { EncomendaComponent } from '../encomenda.component';
import { EncomendaService } from '../encomenda.service';

@Component({
  selector: 'updateDeliveryAddress',
  templateUrl: './update-delivery-address.component.html',
  styleUrls: ['./update-delivery-address.component.css']
})
export class UpdateDeliveryAddressComponent implements OnInit {

  @Input() modal: any = "updateDeliveryAddressModal";
  @Input() title: string = "Alterar Local de Entrega";
  @Input() order: any;
  @Input() aproveOrderForm: FormGroup;

  submitted = false;
  public loading = false;
  public order_status: any = []


  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private encomendaService: EncomendaService,
    private listOdersComp: EncomendaComponent,
    public sanitizer: DomSanitizer,
  ) {

    this.aproveOrderForm = this.fb.group({
      order_id: [null],
      delivery_address: [null, Validators.required]
    });

  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.aproveOrderForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.aproveOrderForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.order !== undefined) {
      this.title = "Alterar Local de Entrega";

      this.aproveOrderForm.patchValue({ order_id: this.order.id, delivery_address: this.order.delivery_address });
    } else {
      this.title = "Alterar Local de Entrega";
    }
  }

  updateDeliveryAddress() {

    this.submitted = true
    if (this.aproveOrderForm.invalid) {
      return
    }

    this.loading = true;

    this.encomendaService
      .updateDeliveryAddress(this.aproveOrderForm)
      .subscribe(response => {
        this.submitted = false

        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
        } else {
          this.configService.toastrError(Object(response).message)
        }

        this.loading = false;
        this.listOdersComp.listOfOrders()
      })
  }


}
