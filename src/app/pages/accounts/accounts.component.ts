import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { DetailsService } from 'src/app/shared/services/details.service';

@Component({
  templateUrl: 'accounts.component.html',
})
export class AccountsComponent {
  oneElement: any = {
    description: '',
    name: "",
    refDetails: []
  }
  dataSource: any[] = [];
  DetailsSource: any[] = [];
  gridBoxValue: number[] = [3];
  cellTemplate(container: any, options: any) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element: any) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }
  constructor(private _service: AccountsService, private _detailsService: DetailsService) {
    this.getAllAccount();
    this.getDetails()
  }
  getAllAccount() {
    this._service.getAccount().subscribe((resp: any) => {
      this.dataSource = resp.data;
      console.log(resp);
    });
  }

  getDetails() {
    this._detailsService.getDetails().subscribe((result) => {
      this.DetailsSource = result.data;
      console.log(result.data);
    })
  }
  logEvent(e: any) {
    console.log('xxxxxxxxxxxxxxxxxxxx', e)
  }

  onSaveGrid(e: any) {
    console.log(e)
    for (let i = 0; i < e.changes.length; i++) {
      const data = e.changes[i]
      if (data.type === 'insert') {
        this.oneElement.description = data.data.description
        this.oneElement.name = data.data.name
        this._service.addAccounts(this.oneElement).subscribe((result) => {
          console.log(result)
          this.getAllAccount()
          this.getDetails()
        })
      }
      if (data.type === "update") {
        console.log(data)
        this._service.editAccount(data.key, data.data).subscribe((result) => {
          console.log(result)
          this.getAllAccount()
          this.getDetails()
        })

      }

    }
  }
  onInitRow(e: any) {
    this.oneElement = {
      description: '',
      name: "",
      refDetails: []
    }

  }
  btn(e: any) {

    console.log(e)
  }
}
