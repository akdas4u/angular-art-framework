import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import { BaseManageComponent } from 'app/shared/components/base-management.component';
import { UnidadeMedidaService } from '../shared/unidade-medida.service';
import { UnidadeMedida } from '../shared/unidade-medida.model';

@Component({
  selector: 'app-unidade-medida',
  templateUrl: 'unidade-medida.html',
  styleUrls: ['unidade-medida.scss']
})
export class UnidadeMedidaComponent extends BaseManageComponent implements OnInit, OnDestroy {

  model: UnidadeMedida = new UnidadeMedida();

  descriptionFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  abreviationFormControl = new FormControl('', [
    Validators.required
  ]);

  validDescription = false;
  validAbreviation = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected location: Location,
    protected unidadeMedidaService: UnidadeMedidaService) {
    super(router, activatedRoute, location, unidadeMedidaService);

    this.baseUrl = '/unidades-medida';

    this.formGroup = new FormGroup({
      id: new FormControl(0),
      abreviacao: this.abreviationFormControl,
      descricao: this.descriptionFormControl,
      ativo: new FormControl(true),
    });
  }

  afterLoad() {
    super.log('Overload do método afterload. Chamando o afterload do base component.');
    super.afterLoad();
  }

  descriptionValidation(e) {
    this.validDescription = e.length > 3;
  }

  abreviationValidation(e) {
    this.validAbreviation = e.length > 0;
  }
}
