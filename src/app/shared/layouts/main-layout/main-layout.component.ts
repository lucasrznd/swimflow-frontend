import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SidemenuComponent } from "../../components/sidemenu/sidemenu.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: '/dashboard' },
    { label: 'Analytics', icon: 'pi pi-chart-line', routerLink: '/analytics', badge: '4', badgeClass: 'primary' },
    { label: 'Customers', icon: 'pi pi-users', routerLink: '/customers' },
    { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: '/products', badge: 'New', badgeClass: 'success' },
    { label: 'Calendar', icon: 'pi pi-calendar', routerLink: '/calendar' },
    { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/messages', badge: '12', badgeClass: 'danger' },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' }
  ];

  userInfo = {
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png'
  };
}
