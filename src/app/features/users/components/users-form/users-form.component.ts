import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { UserEvent } from '../../../../models/enums/users/UserEvent';
import { EventAction } from '../../../../models/interfaces/event/EventAction';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { UserRequest } from '../../../../models/interfaces/users/UserRequest';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private readonly destroy$: Subject<void> = new Subject();

  public userAction!: {
    event: EventAction
  }

  public userForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required]
  });

  public addUserAction = UserEvent.ADD_USER_EVENT;
  public editUserAction = UserEvent.EDIT_USER_EVENT;

  ngOnInit(): void {
    this.userAction = this.ref.data;
  }

  handleSubmitAddUser(): void {
    if (this.userForm.value && this.userForm.valid) {
      const requestCreateUser: UserRequest = {
        fullName: this.userForm.value.fullName as string,
        email: this.userForm.value.email as string,
        password: this.userForm.value.password as string,
        role: this.userForm.value.fullName as string
      };

      console.log(requestCreateUser);
    }
  }
}
