import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class ProgressBarService {

    private isActive = false;
    private requestsCounter = 0;

    constructor(public progressBar: NgProgress) { }

    public isLoading(): boolean {
        return this.isActive;
    }

    public countActives(): number {
        return this.requestsCounter;
    }

    public start() {
        this.requestsCounter = this.requestsCounter >= 0 ? this.requestsCounter + 1 : 1;

        if (!this.isActive) {
            if (this.requestsCounter === 1) {
                this.progressBar.start();
                this.isActive = true;
            }
        }
    }

    public done() {
        this.requestsCounter = this.requestsCounter > 0 ? this.requestsCounter - 1 : 0;

        if (this.isActive) {
            if (this.requestsCounter === 0) {
                this.progressBar.done();
                this.isActive = false;
            }
        }
    }

    public clear() {
        this.requestsCounter = 0;
        this.isActive = false;
        this.progressBar.done();
    }
}
