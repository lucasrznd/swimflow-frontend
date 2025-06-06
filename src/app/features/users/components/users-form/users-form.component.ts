import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { UserEvent } from '../../../../models/enums/users/UserEvent';
import { DropdownOption } from '../../../../models/interfaces/dropdown/DropdownOption';
import { EventAction } from '../../../../models/interfaces/event/EventAction';
import { UserRequest } from '../../../../models/interfaces/users/UserRequest';
import { UserResponse } from '../../../../models/interfaces/users/UserResponse';
import { DropdownService } from '../../../../shared/services/dropdown/dropdown.service';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, SelectModule, InputIcon, IconField],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private dropdownService = inject(DropdownService);
  private readonly destroy$: Subject<void> = new Subject();

  public usersList: Array<UserResponse> = [];
  public userRolesOptions: Array<DropdownOption> = [];
  public userAction!: {
    event: EventAction,
    usersList: Array<UserResponse>
  }

  public userForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required]
  });

  public addUserAction = UserEvent.ADD_USER_EVENT;
  public editUserAction = UserEvent.EDIT_USER_EVENT;

  ngOnInit(): void {
    this.userAction = this.ref.data;
    this.userRolesOptions = this.dropdownService.getUserRolesOptions();

    if (this.userAction.event.action === this.editUserAction && this.userAction.event.id !== null || undefined) {
      this.setUserData(this.userAction.event.id!);
    }
  }

  handleSubmitUserAction(): void {
    if (this.userAction.event.action === this.editUserAction) {
      this.handleSubmitAddUser();
      return;
    }

    this.handleSubmitEditUser();
  }

  handleSubmitAddUser(): void {
    if (this.userForm.value && this.userForm.valid) {
      const requestCreateUser: UserRequest = {
        fullName: this.userForm.value.fullName as string,
        email: this.userForm.value.email as string,
        password: this.userForm.value.password as string,
        role: this.userForm.value.role as string
      };

      console.log(requestCreateUser);
    }
  }

  handleSubmitEditUser(): void {
    if (this.userForm.value && this.userForm.valid) {
      const requestEditUser: UserRequest = {
        fullName: this.userForm.value.fullName as string,
        email: this.userForm.value.email as string,
        password: this.userForm.value.password as string,
        role: this.userForm.value.role as string
      };

      console.log(requestEditUser);
    }
  }

  setUserData(id: number): void {
    const usersList: Array<UserResponse> = this.userAction.usersList;

    if (usersList.length > 0) {
      const filteredUser: UserResponse = usersList.filter((usr) => usr.id === id)[0];

      if (filteredUser) {
        this.userForm.setValue({
          fullName: filteredUser.fullName,
          email: filteredUser.email,
          password: '',
          role: filteredUser.role
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
