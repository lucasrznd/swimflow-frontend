import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

import { UserEvent } from '../../../../models/enums/users/UserEvent';
import { EventAction } from '../../../../models/interfaces/event/EventAction';
import { UserResponse } from '../../../../models/interfaces/users/UserResponse';

import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-users-deactivated-form',
  standalone: true,
  imports: [CommonModule, TableModule, IconFieldModule, TagModule, ButtonModule, TooltipModule],
  templateUrl: './users-deactivated-form.component.html',
  styleUrl: './users-deactivated-form.component.scss'
})
export class UsersDeactivatedFormComponent implements OnInit {
  private ref = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);

  @Input() public usersDeactivatedList: Array<UserResponse> = [];

  public userSelected!: UserResponse;
  public userAction!: {
    event: EventAction
  }

  public reactivateUserAction = UserEvent.REACTIVATE_USER_EVENT;

  ngOnInit(): void {
    this.userAction = this.ref.data;
    this.usersDeactivatedList = this.ref.data.usersDeactivatedList;
  }

  handleRestoreUserAction(id: number): void {
    if (id) {
      console.log(id);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getRoleSeverity(role: string): 'danger' | 'info' | 'secondary' {
    if (role === 'ADMIN') return 'danger';
    if (role === 'USER') return 'info';
    return 'secondary';
  }

  getActivityStatus(active: boolean): 'success' | 'danger' {
    if (active) return 'success';

    return 'danger';
  }
}
