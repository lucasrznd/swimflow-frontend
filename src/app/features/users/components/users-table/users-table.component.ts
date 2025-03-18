import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserEvent } from '../../../../models/enums/users/UserEvent';
import { EventAction } from '../../../../models/interfaces/event/EventAction';
import { UserResponse } from '../../../../models/interfaces/users/UserResponse';

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CardModule, TableModule, ToolbarModule,
    ButtonModule, DatePipe, InputTextModule,
    IconFieldModule, InputIconModule, TooltipModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  @Input() public usersList: Array<UserResponse> = [];
  @Output() userEvent = new EventEmitter<EventAction>();
  @Output() deleteUserEvent = new EventEmitter<{ id: number }>();

  public userSelected!: UserResponse;
  public addUserEvent = UserEvent.ADD_USER_EVENT;
  public editUserEvent = UserEvent.EDIT_USER_EVENT;

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleUserEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const userEventData = id && id !== undefined ? { action, id } : { action };
      this.userEvent.emit(userEventData);
    }
  }

  handleDeleteUser(id: number): void {
    if (id !== undefined) {
      this.deleteUserEvent.emit({ id });
    }
  }
}
