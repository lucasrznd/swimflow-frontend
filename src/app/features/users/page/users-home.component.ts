import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UserEvent } from '../../../models/enums/users/UserEvent';
import { EventAction } from '../../../models/interfaces/event/EventAction';
import { UserResponse } from '../../../models/interfaces/users/UserResponse';
import { UsersDeactivatedFormComponent } from '../components/users-deactivated-form/users-deactivated-form.component';
import { UsersFormComponent } from '../components/users-form/users-form.component';
import { UsersSummaryCardsComponent } from "../components/users-summary-cards/users-summary-cards.component";
import { UsersTableComponent } from "../components/users-table/users-table.component";

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../../shared/services/users/user.service';

@Component({
  selector: 'app-users-home',
  standalone: true,
  imports: [CommonModule, UsersTableComponent, UsersSummaryCardsComponent, ConfirmDialogModule],
  templateUrl: './users-home.component.html',
  styleUrl: './users-home.component.scss',
  providers: [MessageService, ConfirmationService, DialogService]
})
export class UsersHomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);

  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

  public usersList: Array<UserResponse> = [];

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe({
      next: (response) => {
        this.usersList = response;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 5000 });
      }
    });
  }

  handleUserAction(event: EventAction): void {
    if (event) {
      if (event.action !== UserEvent.REACTIVATE_USER_EVENT) {
        this.ref = this.dialogService.open(UsersFormComponent, {
          transitionOptions: '160ms',
          focusOnShow: false,
          header: event?.action,
          style: {
            width: '90vw',
            maxWidth: '500px'
          },
          modal: true,
          contentStyle: { overflow: 'auto' },
          closable: true,
          baseZIndex: 1000,
          maximizable: false,
          data: {
            event: event,
            usersList: this.usersList
          }
        });
      } else {
        this.handleReactivateUserAction(event);
      }

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Fechou o modal');
          }
        });
    }
  }

  handleReactivateUserAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(UsersDeactivatedFormComponent, {
        transitionOptions: '160ms',
        focusOnShow: false,
        header: event?.action,
        style: {
          width: '90vw',
          maxWidth: '65vw'
        },
        modal: true,
        contentStyle: { overflow: 'visible' },
        closable: true,
        baseZIndex: 1000,
        maximizable: false,
        data: {
          event: event,
          usersDeactivatedList: this.usersList
        }
      });
    }
  }

  handleDeleteUserAction(event: { id: number, email: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do usuário: ${event.email}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonProps: {
          label: 'Confirmar',
          severity: 'danger',
          icon: 'pi pi-check'
        },
        rejectButtonProps: {
          label: 'Cancelar',
          text: true,
          icon: 'pi pi-times'
        },
        closeOnEscape: true,
        closable: true
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
