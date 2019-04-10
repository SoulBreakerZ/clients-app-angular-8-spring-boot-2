import { Cliente } from '../models/cliente';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


export const CLIENTES: Cliente[] = [
    { id: 1, nombre: 'Reimy', apellido: 'Antivilo', email: 'Reimy.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 2, nombre: 'Mario', apellido: 'Antivilo', email: 'Mario.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 3, nombre: 'Marco', apellido: 'Antivilo', email: 'Marco.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 4, nombre: 'Manuel', apellido: 'Antivilo', email: 'Manuel.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 5, nombre: 'Matias', apellido: 'Antivilo', email: 'Matias.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 6, nombre: 'Mauricio', apellido: 'Antivilo', email: 'Mauricio.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') },
    { id: 7, nombre: 'Facundo', apellido: 'Antivilo', email: 'Facundo.trabajo@gmail.com', createAt: moment().format('DD/MM/YYYY') }
];