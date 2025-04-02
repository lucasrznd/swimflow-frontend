import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, InputTextModule, ButtonModule, MessageModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
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
