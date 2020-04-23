import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  selectedClient: Client;
  title: string;
  imageSelected: File;

  progress: number = 0;

  saved: EventEmitter<any> = new EventEmitter();

  constructor(private clientService: ClientService, private toastrService: ToastrService, 
            public viewModal: BsModalRef,private authService:AuthService) { }

  ngOnInit() {
    console.info(this.selectedClient);
    console.info(this.viewModal);
    this.title = `View ${this.selectedClient.name} client`;
  }

  selectImage(event) {
    this.progress = 0;
    this.imageSelected = event.target.files[0];
    console.log(this.imageSelected);
    if (this.imageSelected.type.indexOf('image') < 0) {
      this.toastrService.info('Error when select image', 'The file must have only image type');
      this.imageSelected = null;
    }
  }

  uploadImage() {
    if (!this.imageSelected) {
      this.toastrService.info('Error when select image', 'You must select an image');
    } else {
      this.clientService.uploadImage(this.imageSelected, this.selectedClient.id)
        .pipe(
          catchError(e => {
            this.viewModal.hide()
            return throwError(e);
          })
        )
        .subscribe(event => {

          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              const response: any = event.body;
              this.selectedClient = response.client as Client;
              this.toastrService.info(response.message, 'Upload image client');
              this.imageSelected = null;
              this.saved.emit(this.selectedClient);
              break;
            default:
              break;
          }

        });
    }
  }

}
