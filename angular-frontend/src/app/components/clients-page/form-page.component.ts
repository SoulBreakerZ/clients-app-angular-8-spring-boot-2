import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { Region } from 'src/app/models/region';


@Component({
  selector: 'app-form',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent implements OnInit {

  private client: Client = new Client();
  private title: string;

  private errors: string[];
  regions: Region[];

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  constructor(private clientService: ClientService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }

  private loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clientService.findById(id).subscribe((client) => this.client = client);
        this.title = 'Update client';
      } else {
        this.title = 'Create client';
      }
    });
    this.clientService.getRegions().subscribe(regions => this.regions = regions);
  }

  public create(): void {
    console.log(this.client);
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clients-page']);
        this.toastrService.success(`Client has been created with success with name ${client.name}`, 'Created operation');
      }, err => {
        console.error(`Code error apirest: ${err.status}`);
        this.errors = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    console.log(this.client);
    this.clientService.update(this.client).subscribe(
      client => {
        this.router.navigate(['/clients-page']);
        this.toastrService.success(`Client has been update with success with name ${client.name}`, 'Updated operation');
      }, err => {
        console.error(`Code error apirest: ${err.status}`);
        this.errors = err.error.errors as string[];
      }
    );
  }

  compareRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 == null || o2 == null ? false : o1.id === o2.id;
    //return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
