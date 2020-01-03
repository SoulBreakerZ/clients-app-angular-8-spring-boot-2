import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  private title: string;

  private errors: string[];

  constructor(private clientService: ClientService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }
  ß
  private loadClient(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clientService.findById(id).subscribe((client) => this.client = client);
        this.title = 'Update client';
      } else {
        this.title = 'Create client';
      }
    });
  }

  public create(): void {
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        this.toastrService.success(`Client has been created with success with name ${client.name}`, 'Created operation');
      }, err => {
        console.error(`Code error apirest: ${err.status}`);
        this.errors = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    this.clientService.update(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        this.toastrService.success(`Client has been update with success with name ${client.name}`, 'Updated operation');
      }, err => {
        console.error(`Code error apirest: ${err.status}`);
        this.errors = err.error.errors as string[];
      }
    );
  }

}
