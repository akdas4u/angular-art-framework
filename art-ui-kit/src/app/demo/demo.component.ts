import { Component } from '@angular/core';

import { TableColumn } from 'app/tables/shared/table-column.model';

import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-demo',
  templateUrl: 'demo.html',
  styleUrls: ['demo.scss']
})
export class DemoComponent {

  public tableColumns: any[];
  public tableRows: any[];

  public defaultTableHtml: string;
  public defaultTableComponentCode: string;
  public defaultTableScss: string;
  public defaultTableInputs: string;
  public defaultTableOutputs: string;

  constructor() {
    // Tables
    this.tableColumns = [
      new TableColumn('Identificação', 'text-center', 'text-center', 0, (column: any) => column.id),
      new TableColumn('Código', 'text-center', 'text-center', 1, (column: any) => column.codigoIso),
      new TableColumn('País', 'text-center', 'text-left', 2, (column: any) => column.nome),
      new TableColumn('Código Basen', 'text-center', 'text-center', 3, (column: any) => column.codigoBasen),
      new TableColumn('Ativo', 'text-center', 'text-center', 4, (column: any) => column.ativo ? 'Sim' : 'Não')
    ];

    this.tableRows = [
      {
        'id': 1,
        'nome': 'Brasil',
        'codigoIso': 'BRA',
        'codigoBasen': '1058',
        'ativo': true
      },
      {
        'id': 2,
        'nome': 'Estados Unidos',
        'codigoIso': 'USA',
        'codigoBasen': '2496',
        'ativo': false
      },
      {
        'id': 3,
        'nome': 'Argentina',
        'codigoIso': 'ARG',
        'codigoBasen': '0639',
        'ativo': true
      },
      {
        'id': 4,
        'nome': 'Chile',
        'codigoIso': 'CHL',
        'codigoBasen': '0639',
        'ativo': true
      }
    ];

    this.defaultTableHtml = `
    <app-default-table-kit
      [columns]="tableColumns"
      [rows]="tableRows"
      [hasActions]="true"
      [hasEditButton]="true"
      [hasActiveButton]="true"
      [hasDeleteButton]="true"
      (editClick)="editTableItem($event)"
      (activeClick)="activateTableItem($event)"
      (deleteClick)="deleteTableItem($event)">
    </app-default-table-kit>`;

    this.defaultTableInputs = `
      1. columns:           Definição das colunas;
      2. rows:              Conteúdo das colunas;
      3. hasActions:        Se a coluna de ações estará visível.                DefaultValue: true;
      4. hasEditButton:     Se o botão de edição do registro estará visível.    DefaultValue: true;
      5. hasActiveButton:   Se o botão de status do registro estará visível.    DefaultValue: true;
      6. hasDeleteButton:   Se o botão de exclusão do registro estará visível.  DefaultValue: true;
    `;

    this.defaultTableOutputs = `
      1. editClick:   Evento emitido quando o botão de edição do registro é acionado;
      2. activeClick: Evento emitido quando o botão de status do registro é acionado;
      3. deleteClick: Evento emitido quando o botão de exclusão do registro é acionado;
    `;

    this.defaultTableComponentCode = `
    this.tableColumns = [
      new TableColumn('Identificação', 'text-center', 'text-center', 0, (column: any) => column.id),
      new TableColumn('Código', 'text-center', 'text-center', 1, (column: any) => column.codigoIso),
      new TableColumn('País', 'text-center', 'text-left', 2, (column: any) => column.nome),
      new TableColumn('Código Basen', 'text-center', 'text-center', 3, (column: any) => column.codigoBasen),
      new TableColumn('Ativo', 'text-center', 'text-center', 4, (column: any) => column.ativo ? 'Sim' : 'Não')
    ];

    this.tableRows = [
      {
        'id': 1,
        'nome': 'Brasil',
        'codigoIso': 'BRA',
        'codigoBasen': '1058',
        'ativo': true
      },
      {
        'id': 2,
        'nome': 'Estados Unidos',
        'codigoIso': 'USA',
        'codigoBasen': '2496',
        'ativo': false
      },
      {
        'id': 3,
        'nome': 'Argentina',
        'codigoIso': 'ARG',
        'codigoBasen': '0639',
        'ativo': true
      },
      {
        'id': 4,
        'nome': 'Chile',
        'codigoIso': 'CHL',
        'codigoBasen': '0639',
        'ativo': true
      }
    ];

    public activateTableItem(item: any) {
      console.log('-------------');
      console.log('activateTableItem works');
      console.log('-------------');
    }

    public editTableItem(item: any) {
      console.log('-------------');
      console.log('editTableItem works');
      console.log('-------------');
    }

    public deleteTableItem(item: any) {
      console.log('-------------');
      console.log('deleteTableItem works');
      console.log('-------------');
    }`;

    this.defaultTableScss = `Vazio`;
  }

  activateTableItem(item: any) {
    console.log('-------------');
    console.log('activateTableItem');
    console.log(item);
    console.log('-------------');

    item.ativo = !item.ativo;
  }

  editTableItem(item: any) {
    console.log('-------------');
    console.log('editTableItem');
    console.log(item);
    console.log('-------------');

    $.notify({
      icon: 'notifications',
      message: `Botão de edição precionado para o item ${item.nome}!`
    }, {
        type: 'success',
        timer: 3000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  deleteTableItem(item: any) {
    console.log('-------------');
    console.log('deleteTableItem');
    console.log(item);
    console.log('-------------');

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
        this.tableRows = this.tableRows.filter(i => i.id !== item.id);

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
