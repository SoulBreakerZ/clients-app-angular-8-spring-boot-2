import { Client } from '../models/client';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


export const CLIENTS: Client[] = [
    {
        "id": 1,
        "name": "Andres",
        "lastName": "Antivilo",
        "email": "andres.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 1,
            "name": "South america"
        }
    },
    {
        "id": 2,
        "name": "Sergio",
        "lastName": "Antivilo",
        "email": "sergio.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 1,
            "name": "South america"
        }
    },
    {
        "id": 3,
        "name": "Mario",
        "lastName": "Antivilo",
        "email": "mario.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 2,
            "name": "Central America"
        }
    },
    {
        "id": 4,
        "name": "Alberto",
        "lastName": "Antivilo",
        "email": "alberto.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 7,
            "name": "Oceania"
        }
    },
    {
        "id": 5,
        "name": "Santiago",
        "lastName": "Antivilo",
        "email": "santiago.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 6,
            "name": "Africa"
        }
    },
    {
        "id": 6,
        "name": "Marco",
        "lastName": "Antivilo",
        "email": "marco.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 5,
            "name": "Asia"
        }
    },
    {
        "id": 7,
        "name": "Patricio",
        "lastName": "Antivilo",
        "email": "patricio.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 4,
            "name": "Europe"
        }
    },
    {
        "id": 8,
        "name": "Martin",
        "lastName": "Antivilo",
        "email": "martin.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 8,
            "name": "Antarctica"
        }
    },
    {
        "id": 9,
        "name": "Benjamin",
        "lastName": "Antivilo",
        "email": "benjamin.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 3,
            "name": "North America"
        }
    },
    {
        "id": 10,
        "name": "Mark",
        "lastName": "Antivilo",
        "email": "mark.antivilo@gmail.com",
        "createdDate": "2020-01-19",
        "image": null,
        "region": {
            "id": 2,
            "name": "Central America"
        }
    }
];