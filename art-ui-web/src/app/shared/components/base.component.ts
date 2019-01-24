import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseComponent {

    constructor() { }

    public log(message: string) {
        // Customize sua mensagem de log, insrindo data, horario, etc.
        console.log('---------------------');
        console.log(message);
        console.log('---------------------');
    }

    public error(message: string) {
        // Customize sua mensagem de erro, insrindo data, horario, etc.
        console.error('---------------------');
        console.error(message);
        console.error('---------------------');
    }
}