import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent {
  dataSource: any[] = [];
  priority: any[] = []
  constructor(
    private _re: TransactionService
  ) {
    this._re.get().subscribe((result: any) => {
      this.dataSource = result.data;
      console.log('........', result)
    })

  }
}
