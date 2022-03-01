import { AppInfoService } from './app-info.service';
import { AuthGuardService, AuthService } from './auth.service';
import { ScreenService } from './screen.service';
import { AccountsService } from './accounts.service'
import { DetailsService } from './details.service';
import { TransactionService } from './transaction.service';
export const providersApp: any = [AuthService, ScreenService, AppInfoService]
export const authguardservice = AuthGuardService
export const providers: any = [AccountsService, TransactionService, DetailsService];