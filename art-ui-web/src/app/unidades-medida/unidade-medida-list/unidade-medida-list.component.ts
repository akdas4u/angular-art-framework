import { Component } from '@angular/core';
import { BaseListComponent } from 'app/shared/components/base-list.component';
import { UnidadeMedidaService } from '../shared/unidade-medida.service';
import { Router } from '@angular/router';
import { TableColumn } from 'app/shared/components/tables/shared/table-column.model';
import { UnidadeMedida } from '../shared/unidade-medida.model';

@Component({
  selector: 'app-unidade-medida-list',
  templateUrl: 'unidade-medida-list.html',
  styleUrls: ['unidade-medida-list.scss']
})
export class UnidadeMedidaListComponent extends BaseListComponent {

  constructor(protected router: Router, protected unidadeMedidaService: UnidadeMedidaService) {
    super(router, unidadeMedidaService);
    this.baseUrl = 'unidades-medida';

    this.tableColumns = [
      new TableColumn('Identificação', 'text-center', (um: UnidadeMedida) => um.id),
      new TableColumn('Abreviação', 'text-center', (um: UnidadeMedida) => um.abreviacao),
      new TableColumn('Descrição', 'text-center', (um: UnidadeMedida) => um.descricao),
      new TableColumn('Ativo', 'text-center', (um: UnidadeMedida) => { return um.ativo ? 'Sim' : 'Não'; })
    ];
  }
}
