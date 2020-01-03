import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients-json-data',
  templateUrl: './clients.json.data.component.html',
  styleUrls: ['./clients.json.data.component.css']
})
export class ClientsJsonDataComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClientsObservableByJsonFile().subscribe(
      (clients) => {
        this.clients = clients;
      }
    );
  }


}
