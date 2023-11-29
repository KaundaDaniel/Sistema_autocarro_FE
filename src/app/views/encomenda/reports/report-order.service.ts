import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { ConfigService } from 'src/app/providers/config.service';
import { ConfiguracaoService } from '../../configuracao/configuracao.service';

@Injectable({
  providedIn: 'root'
})
export class ReportOrderService {

  company: any = []

  constructor(
    private configService: ConfigService,
    private configuracaoService: ConfiguracaoService
  ) {
    this.getCompany()
  }

  getOrder(order_id: any, via: any) {

    this.configuracaoService.getOrder(order_id)
      .subscribe(response => {
        const data = response
        this.printOrder(data, via)
      })
  }

  getCompany() {

    this.configuracaoService
      .getCompany()
      .subscribe(response => {
        this.company = response
      })
  }

  printOrder(data: any, via: any) {

    const doc = new jsPDF({ format: "a4" });

    function headerRecibo(company: any) {

      doc.setProperties({
        title: 'Recibo de Encomenda ' + data.order.codigo,
        subject: 'Layout Report',
        author: 'aldimiroalfredo@gmail.com',
        keywords: '',
        creator: 'aldimiroalfredo@gmail.com'
      });


      var company_logo = new Image()
      company_logo.src = 'assets/images/company/logos/ajca_pdf.png'

      console.log(company_logo)

      doc.addImage(company_logo, 'JPEG', 10, 10, 30, 25);

      doc.setFontSize(14);

      doc.setFont("helvetica", "bold");
      doc.text("RECIBO DE ENCOMENDA", 80, 20);

      doc.setFontSize(7);

      /* ===== EMPRESA ===== */

      doc.setDrawColor(255, 0, 0); // Vermelho
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(10, 55, 65, 48, 3, 3, 'FD'); //  Black square with rounded corners

      doc.text("Loja Online: ", 12, 60);
      doc.text("Apoio ao Cliente: ", 12, 65);

      /* ===== Via ===== */
      doc.setDrawColor(0);
      doc.setFillColor(255, 0, 0);
      doc.rect(135, 56, 65, 5, 'F'); //Coluna Via impressão

      doc.setTextColor(255);
      doc.text('' + via, 140, 60);
      doc.setTextColor(0);

      /* ===== EMPRESA DATA ===== */

      doc.setFont("helvetica", "normal");
      doc.text('' + company.website, 28, 60);
      doc.text('' + company.phone, 34, 65);

      /* ===== CLIENTE ===== */

      doc.setFont("helvetica", "bold");
      doc.text("CLIENTE: ", 12, 75);
      doc.text("Nome: ", 12, 80);
      doc.text("Endereço: ", 12, 85);
      doc.text("Telefone: ", 12, 90);
      doc.text("Email: ", 12, 95);
      doc.text("Local de Entrega: ", 12, 100);

      doc.setDrawColor(0);
      doc.setFillColor(255, 0, 0);
      doc.rect(10, 106, 64.6, 5, 'F'); //Coluna Produto / Referência
      doc.setTextColor(255);
      doc.text("Nº Encomenda: ", 12, 109);
      doc.setTextColor(0);
      //doc.text("NIF: ", 10, 100);

      /* ===== CLIENTE DATA ===== */

      doc.setFont("helvetica", "normal");
      doc.text('' + data.order.customer, 25, 80);
      doc.text('---', 25, 85);
      doc.text('' + data.order.phone, 25, 90);
      doc.text('' + data.order.email, 25, 95);
      doc.text('' + data.order.delivery_address, 37, 100);
      //doc.text("---", 25, 100);

      doc.setTextColor(255);
      doc.text('' + data.order.codigo, 37, 109);
    }

    headerRecibo(this.company)

    doc.setFont("helvetica", "normal");

    doc.setDrawColor(0);
    doc.setFillColor(255, 0, 0);
    doc.rect(10, 117, 64.6, 5, 'F'); //Coluna Produto / Referência
    doc.rect(75, 117, 19.7, 5, 'F'); //Coluna Qtd
    doc.rect(95, 117, 39.7, 5, 'F'); //Coluna Preço Unitário
    doc.rect(135, 117, 65, 5, 'F'); //Coluna Total


    doc.setTextColor(255);
    doc.text("Produto / Referência", 12, 120);
    doc.text("Qtd", 80, 120);
    doc.text("Preço Unitário", 100, 120);
    doc.text("Total", 140, 120);

    doc.setFont("helvetica", "normal");

    var posY = 125;

    /* ===== PRODUTOS ===== */

    doc.setTextColor(0);

    for (var index = 0; index < data.orders_lines.length; index++) {

      const product = data.orders_lines[index]

      doc.setDrawColor(255, 0, 0); // draw red lines
      doc.line(10, posY + 1, 200, posY + 1);

      doc.text('' + product.name, 12, posY);
      doc.text('' + product.quantity, 80, posY);
      doc.text('' + this.configService.numberFormat(product.value), 100, posY);
      doc.text('' + this.configService.numberFormat(product.total_without_tax), 140, posY);

      //const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

      posY = posY + 5
    }

    /* ===== DETALHES DA ENCOMENDA ===== */

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.3);

    doc.setDrawColor(0);
    doc.setFillColor(255, 0, 0);
    doc.rect(10, posY + 5, 64.5, 5, 'F'); //Coluna Quantidade Produtos
    doc.rect(10, posY + 13, 64.5, 5, 'F'); //Coluna Valor Entrega
    doc.rect(10, posY + 20, 64.5, 5, 'F'); //Coluna Total
    doc.rect(10, posY + 28, 64.5, 5, 'F'); //Coluna Método de Pagamento
    doc.rect(10, posY + 37, 64.5, 5, 'F'); //Coluna Data de Pagamento

    doc.setTextColor(255);

    doc.text("Quantidade Produtos: ", 12, posY + 8.5);
    //doc.text("Imposto: ", 10, posY + 15);
    doc.text("Taxa de Entrega: ", 12, posY + 16.5);
    doc.text("Total Encomenda: ", 12, posY + 23.5);

    /* ===== DETALHES DA ENCOMENDA DATA ===== */

    doc.setFont("helvetica", "normal");
    doc.text('' + data.orders_lines.length, 39, posY + 8.5);
    doc.text('', 25, posY + 15);
    doc.text('' + this.configService.numberFormat(data.order.delivery_fee), 39, posY + 16.5);
    doc.text('' + this.configService.numberFormat(data.order.total_without_tax), 39, posY + 23.5);

    doc.text("Método de Pagamento: ", 12, posY + 31.5);
    doc.text("Data da Encomenda: ", 12, posY + 40);

    doc.setFont("helvetica", "normal");

    doc.text('' + data.order.payment_method || '', 39, posY + 31.5);
    doc.text('' + this.configService.dateFormat(data.order.payment_date), 39, posY + 40);

    doc.setTextColor(0);

    footer(this.company)

    function footer(company: any) {

      doc.setFontSize(7);

      var text_company = '' + company.commercial_name + ', ' + company.address + ', Tel +244 ' + company.phone + ' / Email: ' + company.email
      var text_nif = '' + company.commercial_name + ', NIF: ' + company.contributor

      doc.text(text_company, 40, posY + 140);
      doc.text(text_nif, 80, posY + 143);

      doc.setDrawColor(255, 0, 0); // draw red lines
      doc.line(10, posY + 145, 200, posY + 146);

      doc.text('Documento processado por computador - não carece de assinatura', 12, posY + 150);
    }

    if (via != 'download') {

      doc.autoPrint();
      doc.output("dataurlnewwindow", { filename: 'Recibo da Encomenda' });

    } else {

      doc.save("Recibo da Encomenda.pdf");
    }

  }

}
