import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public autor: any = { nombre: 'Reimy', apellido: 'Antivilo'};

  public anio: String = moment().format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
