import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private toastr: ToastrService,
  ) { }

  public toastrSucess(title: any) {
    return this.toastr.success(title)
  }

  public toastrError(title: any) {
    return this.toastr.error(title)
  }

  public toastrInfo(title: any) {
    return this.toastr.info(title)
  }

  public toastrWarning(title: any) {
    return this.toastr.warning(title)
  }


  public getFirstDateOfYear() {

    const now = new Date();
    const anoAtual = now.getFullYear();
    const first_date_of_year = `${anoAtual}-01-01`;

    return first_date_of_year
  }

  public getDataAtual() {

    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;
    const diaAtual = now.getDate();
    const dataAtual = `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`;

    return dataAtual
  }

  public SwalSuccess(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalError(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalInfo(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalWarning(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalQuestion(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'question',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public numberFormat(number: any) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number).replace('€', '').trim();
  }

  public dateFormat(date: any) {

    return (new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date)));
  }
}
