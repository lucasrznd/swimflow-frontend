import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/page/home.component';
import { UsersHomeComponent } from './features/users/page/users-home.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuarios', component: UsersHomeComponent }
    ]
  }
];
