import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { EncomendaComponent } from '../encomenda.component';
import { EncomendaService } from '../encomenda.service';

@Component({
  selector: 'validateOrder',
  templateUrl: './validate-order.component.html',
  styleUrls: ['./validate-order.component.css']
})
export class ValidateOrderComponent implements OnInit {

  @Input() modal: any = "validateOrderModal";
  @Input() title: string = "Validar Encomenda";
  @Input() order: any;
  @Input() image_to_preview: any;
  @Input() aproveOrderForm: FormGroup;

  submitted = false;
  public loading = false;
  public order_status: any = []


  latitude = -11.683169
  longitude = 17.468088
  zoom = 6;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private encomendaService: EncomendaService,
    private listOdersComp: EncomendaComponent,
    public sanitizer: DomSanitizer,
  ) {

    this.aproveOrderForm = this.fb.group({
      order_id: [null],
      order_status_id: [null, Validators.required],
      user_id: [null],
      codigo: [null],
      description: [null, Validators.required],
      customer_id: [null],
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

  selectBoxOrderStatus() {
    this.encomendaService
      .selectBoxOrderStatus(this.order?.id)
      .subscribe(response => {
        this.order_status = response
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.order !== undefined) {
      this.title = "Validar Encomenda";

      this.latitude = this.order?.latitude // latitude do cliente
      this.longitude = this.order?.longitude // longitude do cliente

      this.selectBoxOrderStatus()

      this.aproveOrderForm.patchValue({ order_id: this.order.id, codigo: this.order.codigo, customer_id: this.order.customer_id });
    } else {
      this.title = "Validar Encomenda";
    }
  }

  validateOrder() {

    this.submitted = true
    if (this.aproveOrderForm.invalid) {
      return
    }

    this.loading = true;

    this.encomendaService
      .aproveOrder(this.aproveOrderForm)
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
