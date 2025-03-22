import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidemenuStateService {
  private _mobileSidebarVisible = signal<boolean>(false);
  private _desktopSidebarExpanded = signal<boolean>(false);

  get mobileSidebarVisible() {
    return this._mobileSidebarVisible;
  }

  get desktopSidebarExpanded() {
    return this._desktopSidebarExpanded;
  }

  // Actions
  toggleMobileSidebar() {
    this._mobileSidebarVisible.update(val => !val);
  }

  toggleDesktopSidebar() {
    this._desktopSidebarExpanded.update(val => !val);
  }

  setDesktopSidebarExpanded(expanded: boolean) {
    this._desktopSidebarExpanded.set(expanded);
  }

  setMobileSidebarVisible(visible: boolean) {
    this._mobileSidebarVisible.set(visible);
  }
}
