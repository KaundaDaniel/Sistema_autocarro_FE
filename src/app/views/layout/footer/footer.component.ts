import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public version = 'Versão: 1.0.0 | 01.06.2023';

  constructor() { }

  ngOnInit(): void {
  }

}
