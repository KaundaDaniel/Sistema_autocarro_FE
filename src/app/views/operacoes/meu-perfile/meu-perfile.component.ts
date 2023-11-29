import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-meu-perfile',
  templateUrl: './meu-perfile.component.html',
  styleUrls: ['./meu-perfile.component.css']
})
export class MeuPerfileComponent implements OnInit {


  @Input() user: any;
  @Input() perfileForm: FormGroup;

  submitted = false;
  public loading = false;

  public my_perfile: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.perfileForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required]
    });

    this.getMyPerfile()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.perfileForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.perfileForm.reset();
  }

  getMyPerfile() {

    this.loading = true
    
    this.http.get(`${this.httpService.base_url}/users/getMyAccount`, { headers: this.authService.headers })
      .subscribe(res => {

        this.my_perfile = Object(res).user
        this.handPerfile(this.my_perfile)
        this.loading = false
      })
  }

  handPerfile(perfile: any) {
    this.perfileForm.patchValue({ id: perfile.id, name: perfile.name, username: perfile.username, email: perfile.email, phone: perfile.phone })
  }

  save() {

    this.submitted = true
    if (this.perfileForm.invalid) {
      return
    }

    if (this.perfileForm.getRawValue().password != this.perfileForm.getRawValue().confirm_password) {
      this.configService.toastrError('A password de confirmação é diferente da password!')
      return
    }

    this.loading = true;

    const url = `${this.httpService.base_url}/users/resetPassword`

    this.http.post(url, this.perfileForm.value, { headers: this.authService.headers })
      .subscribe(response => {
        this.loading = false;
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.perfileForm.reset()
        }else{
          this.configService.toastrError(Object(response).message)
        }
      })
  }

}
