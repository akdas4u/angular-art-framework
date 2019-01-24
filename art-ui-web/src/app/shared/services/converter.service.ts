import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';

declare var $: any;

@Injectable()
export class ConverterService {

    constructor() { }

    public binaryToBase64(arrayBuffer: any): string {
        let b64encoded = null;
        if (arrayBuffer) {
            let binary = '';
            const bytes = new Uint8Array(arrayBuffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            b64encoded = btoa(binary);
        }

        return b64encoded;
    }
}