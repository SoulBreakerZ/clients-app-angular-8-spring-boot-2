import { Component, OnInit, TemplateRef } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { Page } from 'src/app/models/page';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent implements OnInit {

  paginator: Page<Client>;

  message: string;

  deleteModal: BsModalRef;
  viewModal: BsModalRef;

  selectedClient: Client;
  clients: Client[];

  constructor(private clientService: ClientService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      console.info('page ' + page);
      this.clientService.findAllPageable(page).pipe(
        tap(pageClient => {
          this.paginator = pageClient;
          this.clients = pageClient.content;
        })
      ).subscribe();
    });
  }

  openModalDelete(template: TemplateRef<any>, selectedClient: Client) {
    this.deleteModal = this.modalService.show(template, { class: 'modal-sm' });
    this.selectedClient = selectedClient;
  }

  confirmDelete(): void {
    this.deleteClientById();
  }

  private deleteClientById(): void {
    this.clientService
      .deleteById(this.selectedClient.id)
      .subscribe((client) => {
          this.clients = this.clients.filter(client => client !== this.selectedClient);
          this.toastrService.info(`Client has been deleted`, 'Delete operation');
          this.deleteModal.hide();
        }
      );
  }

  private openProfile(selectedClient: Client) {

    this.selectedClient = selectedClient;

    const initialState = {
      selectedClient: this.selectedClient
    };

    this.viewModal = this.modalService.show(DetailsComponent, {
      initialState,
      animated: true,
      class: 'modal-lg',
    });
    this.viewModal.content.saved.subscribe((client: Client) => {
      this.clients = this.clients.map(modifiedClient => {
        if (client.id === modifiedClient.id) {
          modifiedClient.image = client.image;
        }
        return modifiedClient;
      });
    });

  }

}
