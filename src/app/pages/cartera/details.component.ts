import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { DetailsService } from 'src/app/shared/services/details.service';

@Component({
  templateUrl: 'details.component.html',
})
export class DetailsComponent {
  dataSource: any[] = [];
  priority!: any[];
  persentag: any
  rowPersentag: any = {};
  DetailEdit: any;
  key: string = ''
  cuentas: any[] = []
  constructor(private _service: DetailsService, private _Cuentas: AccountsService) {
    this.getAllAccount();
    this.DetailEdit = {
      description: '',
      name: '',
      por: [],
    };
  }
  getAllAccount() {
    this._service.getDetails().subscribe((resp: any) => {
      this.dataSource = resp.data;
      console.log(resp);
    });
    this._Cuentas.getAccount().subscribe((resp: any) => {
      this.cuentas = resp.data

    })
  }
  popoEditStart(e: any) {
    this.persentag = [];
    this.persentag = { por: e.data.por };
  }

  customizeText(cellInfo: any) {
    console.log(cellInfo);
    return cellInfo.value + ' &deg;C';
  }
  newRowPopu(e: any) {
    console.log('new', e)
    e.data.por = [];
  }
  logEvent(e: any) {
    this.key = e.key
    console.log('..............', e);
  }

  prepareEditSubgird(e: any) {
    console.log(e);
  }
  prepareEditandSave(e: any) {
    console.log(e)
    if (!!e.changes[0]) {
      for (let i = 0; i < e.changes.length; i++) {
        let d = e.changes[i];
        if (d.type === 'insert') {
          const { _id, ...data } = d.data
          this.save(data);
        }
        if (d.type === "update") {
          console.log('update', { ...d.data, ...this.persentag })
          this.updateDetails({ ...d.data, ...this.persentag })
        }
      }

    } else {
      console.log('xxxxx 68', this.persentag)
      this.updateDetails(this.persentag)

    }
  }
  save(data: any) {
    console.log('xxxx 74', data)
    this._service.addDetails(data).subscribe((result: any) => {
      console.log(result);
      this.getAllAccount();
    });
  }
  updateSaving(data: any, value: any) {
    this.persentag = { por: value }
  }

  updateDetails(data: any) {
    this._service.updateDetails(this.key, data).subscribe((result) => {
      console.log(result)
      this.getAllAccount()
    })
  }
}
