import { Client } from '../models/client';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


export const CLIENTS: Client[] = [
    { id: 1, name: 'Reimy', lastName: 'Antivilo', email: 'Reimy.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 2, name: 'Mario', lastName: 'Antivilo', email: 'Mario.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 3, name: 'Marco', lastName: 'Antivilo', email: 'Marco.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 4, name: 'Manuel', lastName: 'Antivilo', email: 'Manuel.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 5, name: 'Matias', lastName: 'Antivilo', email: 'Matias.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 6, name: 'Mauricio', lastName: 'Antivilo', email: 'Mauricio.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') },
    { id: 7, name: 'Facundo', lastName: 'Antivilo', email: 'Facundo.trabajo@gmail.com', createdDate: moment().format('DD/MM/YYYY') }
];