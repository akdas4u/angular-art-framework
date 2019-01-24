import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseService } from '../services/base.service';
import { BaseComponent } from './base.component';

@Injectable()
export abstract class BaseManageComponent extends BaseComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    id: number;
    isEditMode = false;
    model: any;
    baseUrl: string;

    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected location: Location,
        protected apiService: BaseService) {
        super();
    }

    ngOnInit() {
        this.id = Number(this.activatedRoute.snapshot.params['id']);

        if (this.id > 0) {
            this.isEditMode = true;

            this.apiService.getById(this.id)
                .subscribe((item: any) => {
                    this.model = item;
                    this.formGroup.setValue(item);
                    this.afterLoad();
                });
        }
    }

    ngOnDestroy() {
    }

    afterLoad() {
        super.log('Objeto Carregado');
    }

    submit() {
        if (this.formGroup.valid) {
            this.apiService.save(this.formGroup.value)
                .subscribe((response) => {
                    this.router.navigate([this.baseUrl]);
                });
        } else {
            this.validateAllFormFields(this.formGroup);
        }
    }

    back() {
        this.router.navigateByUrl(this.baseUrl);
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}

