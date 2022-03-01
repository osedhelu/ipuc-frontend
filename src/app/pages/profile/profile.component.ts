import { Component } from '@angular/core';
import { AccountsService } from 'src/app/shared/services/accounts.service';
// import { DetailsService } from 'src/app/shared/services/details.service';
import notify from 'devextreme/ui/notify';
import { TransactionService } from 'src/app/shared/services/transaction.service';

interface iEgresos {
  Cuentas: any,
  Cartera: any,
  NoDo: any,
  Valor: any
  Fecha: Date
}
@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class IngresosComponent {
  employee!: iEgresos;
  colCountByScreen: object;
  popupVisible = false;
  positions!: string[];
  account: any[] = [];
  entregas: any[] = [];
  carteras: any[] = [];
  closeButtonOptions: any;
  EnviarbuttonOptions: any;
  txtPopu = '';


  buttonOptions: any = {
    text: 'Register',
    type: 'success',
    width: '100vh',
    useSubmitBehavior: true,
  };

  constructor(
    private _serviceAccount: AccountsService,
    private _re: TransactionService
  ) {
    // const html = `
    // <div> 

    // <p>hola</p>
    // </div>
    // `
    // confirm(html, 'hola').then((result: any) => {
    //   console.log(result)

    // })

    const that = this;
    this.closeButtonOptions = {
      text: 'Cerrar',
      icon: 'close',
      onClick(e: any) {
        that.popupVisible = false;
      },
    };
    this.EnviarbuttonOptions = {
      text: 'Guardad',
      icon: 'save',
      onClick(e: any) {
        that.Enviar('popu')
      },
    };


    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 2,
    };
    this.getAccount();
  }
  title(id: string): string {
    if (id === 'Disponible') {
      return 'Disponible'
    } else {
      const aa = this.account.filter(e => e._id == id)
      return aa[0]?.name
    }

  }
  titlePopu(): string {
    if (this.employee) {
      return `Enviar a ${this.employee.Cuentas?.name} ${!!this.employee.Cuentas.refDetails.length ? ' > ' + this.employee.Cartera.name : ''}`
    } else {
      return '';
    }
  }
  getAccount() {
    this._serviceAccount.getAccountOnDetails().subscribe((result: any) => {
      this.account = result.data;
      this.employee = {
        NoDo: null,
        Cuentas: result.data[1],
        Cartera: result.data[1].refDetails[0],
        Valor: null,
        Fecha: new Date()
      };
      // this.employee.Cartera = 
    });
  }
  onFormSubmit(e: any) {
    this.entregas = [];
    let newValue = this.employee.Valor;
    if (this.employee.Cuentas?.refDetails.length) {
      let por = this.employee.Cartera.por
      for (let i = 0; i < por.length; i++) {
        const dea = por[i];
        if (dea.position !== '4') {
          let init = newValue;
          let numa = init * dea.value;
          newValue = init - numa;
          this.entregas.push({ name: dea.description, value: numa });
        } else {
          this.entregas.push({ name: dea.description, value: newValue });
        }
      }
    } else {
      this.entregas.push({ name: 'Disponible', value: newValue });
    }
    this.popupVisible = true
    e.preventDefault();
  }
  form_fieldDataChanged(e: any) {
    let updatedField = e.dataField;
    if (updatedField === "Cuentas") {
      this.employee.Cartera = e.value.refDetails[0]
    }
  }
  Enviar(data: any) {

    const ada = {
      amount: this.employee.Valor,
      to: this.employee.Cuentas._id,
      wallet: this.employee.Cartera._id,
      btcRef: this.employee.NoDo,
      fecha: this.employee.Fecha
    }

    this._re.emit(ada).subscribe((result) => {
      console.log(result)

    })
    notify('hola mundo', 'success', 1000)
    console.log(this.employee)
    console.log(this.entregas)
    this.popupVisible = false
  }


}
