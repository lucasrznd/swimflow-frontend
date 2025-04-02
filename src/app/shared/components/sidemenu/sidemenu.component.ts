import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from './../../../../../node_modules/primeng/api/menuitem.d';

interface SidemenuItem extends MenuItem {
  bagde?: string;
  badgeClass?: string;
}

@Component({
    selector: 'app-sidemenu',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarModule, ButtonModule, MenuModule, TooltipModule, RippleModule, BadgeModule],
    templateUrl: './sidemenu.component.html',
    styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  @Input() title: string = 'Navigation';
  @Input() logoUrl: string | undefined;
  @Input() userInfo: { name: string, role: string, avatar?: string } | undefined;

  private router = inject(Router);
  private menuItemsData = signal<SidemenuItem[]>([]); // Using extended interface
  mobileSidebarVisible = signal<boolean>(false);
  desktopSidebarExpanded = signal<boolean>(true);
  menuItems = this.menuItemsData;
  currentRoute = signal<string>('');

  ngOnInit() {
    // Set default menu items
    this.menuItemsData.set([
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: '/dashboard' },
      { label: 'Analytics', icon: 'pi pi-chart-line', routerLink: '/analytics', badge: '4', badgeClass: 'primary' },
      { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: '/products', badge: 'New', badgeClass: 'success' },
      { label: 'Calendar', icon: 'pi pi-calendar', routerLink: '/calendar' },
      { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/messages', badge: '12', badgeClass: 'danger' },
      { label: 'Usuários', icon: 'pi pi-users', routerLink: '/usuarios' },
      { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' }
    ]);

    // Track route changes for active menu item
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute.set(this.router.url);
    });

    // Initialize current route
    this.currentRoute.set(this.router.url);

    // Auto-collapse sidebar on small screens
    this.checkScreenSize();
  }

  @Input() set items(value: SidemenuItem[]) {
    if (value && value.length > 0) {
      this.menuItemsData.set(value);
    }
  }

  @HostListener('window:resize')
  checkScreenSize() {
    if (window.innerWidth < 1200) {
      this.desktopSidebarExpanded.set(false);
    }
  }

  toggleMobileSidebar() {
    this.mobileSidebarVisible.update(val => !val);
  }

  toggleDesktopSidebar() {
    this.desktopSidebarExpanded.update(val => !val);
  }

  onMenuItemClick(item?: MenuItem) {
    // Close mobile sidebar after click
    this.mobileSidebarVisible.set(false);

    // Handle custom click events if provided
    if (item && item.command) {
      item.command({ originalEvent: new Event('click'), item });
    }
  }

  isActive(routerLink: string | undefined): boolean {
    if (!routerLink) return false;
    return this.currentRoute().startsWith(routerLink);
  }
}
