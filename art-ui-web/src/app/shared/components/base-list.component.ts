import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from './base.component';
import { BaseService } from '../services/base.service';
import swal from 'sweetalert2';

@Injectable()
export abstract class BaseListComponent extends BaseComponent implements OnInit, OnDestroy {

    public tableColumns: any[];
    public tableData: any[];
    protected baseUrl: string;

    constructor(protected router: Router, protected apiService: BaseService) {
        super();
    }

    ngOnInit() {
        this.load();
    }

    ngOnDestroy() {
    }

    public load() {
        this.apiService.list()
            .subscribe((response: any) => {
                this.tableData = response;
            });
    }

    public create() {
        this.router.navigate([`${this.baseUrl}/create`]);
    }

    public edit(model: any) {
        this.router.navigate([`${this.baseUrl}/edit`, model.id]);
    }

    public activate(model: any) {
        model.ativo = !model.ativo;
        this.apiService.edit(model);
    }

    public delete(model: any) {
        swal({
            title: 'Excluir?',
            text: 'Você deseja excuir esse registro?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, delete-o!',
            cancelButtonText: 'Não, mantenha-o!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                this.apiService.delete(model.id).subscribe((response: any) => {
                    this.load();
                });

                swal({
                    title: 'Excluído!',
                    text: 'O registro foi excluido com sucesso.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                }).catch(swal.noop)
            } else {
                swal({
                    title: 'Cancelado',
                    text: 'O registro não foi excluído',
                    type: 'error',
                    confirmButtonClass: 'btn btn-info',
                    buttonsStyling: false
                }).catch(swal.noop)
            }
        });
    }
}

