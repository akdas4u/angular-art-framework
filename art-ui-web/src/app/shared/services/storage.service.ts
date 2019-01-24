import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() {
    }

    public getItem(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public setItem(key: string, item: any) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
