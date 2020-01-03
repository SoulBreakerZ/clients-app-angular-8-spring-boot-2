import { Component, OnInit, TemplateRef } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  modalRef: BsModalRef;
  message: string;

  idSelected: number;

  constructor(private clientService: ClientService,
    private toastrService: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit() {
    // this.clientService.findAll().pipe(
    //   tap(response => {
    //     console.log('ClientService: tap 3');
    //     (response).forEach(client => {
    //       console.log(client.name);
    //     });
    //   })
    // ).subscribe((clients) => this.clients = clients);
    // this.clientService.findAll().pipe(
    //   tap(clients => {
    //     this.clients = clients;
    //     console.log('ClientService: tap 2');
    //     (clients).forEach(client => {
    //       console.log(client.name);
    //     });
    //   }))
    //   .subscribe();
    this.clientService.findAll().pipe(
        tap(clients => this.clients = clients)
      ).subscribe();
  }

  openModalDelete(template: TemplateRef<any>, idSelected: number) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idSelected = idSelected;
  }

  confirmDelete(): void {
    this.modalRef.hide();
    this.deleteClientById();
  }

  public deleteClientById(): void {
    this.clientService.deleteById(this.idSelected).subscribe(
      (client) => {
        this.clients = this.clients.filter(client => client.id !== this.idSelected);
        this.toastrService.info(`Client has been deleted`, 'Delete operation');
      }
    );
  }

}
