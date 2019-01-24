import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'app/shared/services/base.service';

@Injectable()
export class UnidadeMedidaService extends BaseService {
    model: any;
    modelName = 'unidademedida';

    constructor(protected http: HttpClient) {
        super(http);
    }
}
