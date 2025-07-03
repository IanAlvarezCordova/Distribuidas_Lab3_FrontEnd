import { Routes } from '@angular/router';
import { UserCrud } from './user-crud/user-crud';
import { LogViewComponent } from './log-view.component/log-view.component';

export const routes: Routes = [
  { path: '', component: UserCrud },
  { path: 'logs', component: LogViewComponent }
];