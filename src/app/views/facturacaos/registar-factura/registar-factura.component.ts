import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ClientesService } from '../../clientes/clientes.service';
import { EncomendaService } from '../../encomenda/encomenda.service';
import { ProdutoService } from '../../produtos/produto.service';
import { FacturacaoService } from '../facturacao.service';

@Component({
  selector: 'app-registar-factura',
  templateUrl: './registar-factura.component.html',
  styleUrls: ['./registar-factura.component.css']
})
export class RegistarFacturaComponent implements OnInit {

  public filters = {
    search: null,
    start_date: null,
    end_date: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  loading = false;
  public products: any = []
  public customers: any = []

  public quantity = 1
  value_to_pay = 0.00;
  private productToPush: any;

  products_cart: any = []
  method_payments: any = []
  my_company: any = []

  order = {
    total: 0.00,
    total_with_tax: 0.00,
    total_without_tax: 0.00,

    customers: {
      id: null,
      name: null,
      phone: null,
      email: null
    },
    payments: {
      payment_method_id: null
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private produtoService: ProdutoService,
    private clientesService: ClientesService,
    public configService: ConfigService,
    private facturacaoService: FacturacaoService
  ) {
    this.listOfCustomers()
    this.listOfProduts()
    this.selectBoxPayment()
    this.getCompany()
  }

  ngOnInit(): void { }

  searchProducts() {
    this.listOfProduts()
  }

  public listOfProduts() {
    this.loading = true
    this.produtoService.listOfProduts(this.filters)
      .subscribe(res => {

        this.products = Object(res).data
        this.loading = false
      })
  }

  getCompany() {
    this.http.get(`${this.httpService.base_url}/company/detail`, { headers: this.authService.headers })
      .subscribe(res => {
        this.my_company = Object(res)
      })
  }

  public selectBoxPayment() {
    this.facturacaoService.selectBoxPayment()
      .subscribe(response => {
        this.method_payments = response
      })
  }

  public listOfCustomers() {
    this.loading = true
    this.clientesService.listOfCustomers(this.filters)
      .subscribe(res => {

        this.customers = Object(res).data
        console.log("customers",this.customers)
        this.loading = false
      })
  }

  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  selectCustomer(customer: any) {

    this.order.customers.id = customer.id
    this.order.customers.name = customer.name
    this.order.customers.phone = customer.phone
    this.order.customers.email = customer.email

    this.checkedCustomer(true, customer)
  }

  checkedCustomer(checked: boolean, customer: any) {
    this.customers.forEach((f: any) => f.checked = checked && f.id == customer.id);
  }

  setProduct(product: any) {
    this.productToPush = product
  }

  public pushPoductCart() {

    this.loading = true;

    this.http.post(`${this.httpService.base_url}/product-preview/to-cart`, { product_id: this.productToPush.id, quantity: this.quantity }, { headers: this.authService.headers })
      .subscribe(response => {
        this.addProduct(response)
      })
  }


  private is_new_product = false;

  addProduct(product: any) {

    this.is_new_product = true;

    for (let index = 0; index < this.products_cart.length; index++) {
      const element = this.products_cart[index];

      if (element.product_id == product.product_id) {

        this.is_new_product = false
        element.total_with_tax = element.total_with_tax + product.total_with_tax
        element.total_without_tax = element.total_without_tax + product.total_without_tax
        element.total = element.total + product.total
        element.quantity = element.quantity + product.quantity
      }
    }

    if (this.is_new_product == true) {
      this.products_cart.push(product)
    }

    this.totalOrder()
    this.loading = false;
  }

  totalOrder() {

    this.order.total = 0.00
    this.order.total_with_tax = 0.00
    this.order.total_without_tax = 0.00

    for (let index = 0; index < this.products_cart.length; index++) {
      const product = this.products_cart[index];
      this.order.total = this.order.total + product.total
      this.order.total_with_tax = this.order.total_with_tax + product.total_with_tax
      this.order.total_without_tax = this.order.total_without_tax + product.total_without_tax
    }
  }

  removeProduct(product: any) {

    for (let index = 0; index < this.products_cart.length; index++) {

      if (product.product_id == this.products_cart[index].product_id) {
        this.products_cart.splice(index, 1);
      }
    }

    this.totalOrder()
  }

  finishInvoice() {

    const payload_order = {
      customer_id: this.order.customers.id,
      total: this.order.total,
      total_with_tax: this.order.total_with_tax,
      total_without_tax: this.order.total_without_tax,
      quantity_products: this.products_cart.length,
      payment_method_id: this.order.payments.payment_method_id,
      products: this.products_cart,
    }

    this.loading = true

    this.facturacaoService.finishInvoice(payload_order)
      .subscribe(response => {
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetInvoice()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false
      }, error => {
        this.configService.toastrError(Object(error).message)
        this.loading = false
      })

  }

  payment_method_slug: any;

  handPayment(payment: any) {
    const payment_id = payment.target.value
    const payment_method = this.method_payments.find((item: any) => item.id == payment_id)
    this.payment_method_slug = payment_method.slug
    this.value_to_pay = this.order.total
  }

  resetInvoice() {

    this.order.total = 0.00;
    this.order.total_with_tax = 0.00;
    this.order.total_without_tax = 0.00;

    this.products_cart = []
  }

}
