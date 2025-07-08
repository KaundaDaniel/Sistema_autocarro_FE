import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css']
})
export class SpinnerOverlayComponent implements OnInit {

  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}
