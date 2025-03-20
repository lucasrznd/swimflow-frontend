import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { EventAction } from '../../../models/interfaces/event/EventAction';
import { UserResponse } from '../../../models/interfaces/users/UserResponse';
import { UsersFormComponent } from '../components/users-form/users-form.component';
import { UsersSummaryCardsComponent } from "../components/users-summary-cards/users-summary-cards.component";
import { UsersTableComponent } from "../components/users-table/users-table.component";

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);

  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

  public usersList: Array<UserResponse> = [];

  ngOnInit(): void {
    this.setUsers();
  }

  handleUserAction(event: EventAction): void {
    if (event) {
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

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Fechou o modal');
          }
        })
    }
  }

  handleDeleteUserAction(event: { id: number, email: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do usuário: ${event.email}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        acceptButtonStyleClass: 'p-button-danger',
        acceptIcon: 'pi pi-check',
        rejectLabel: 'Cancelar',
        rejectIcon: 'pi pi-times',
        closable: true
      });
    }
  }

  setUsers(): void {
    this.usersList = [
      {
        id: 1,
        fullName: "Alice Martins",
        email: "alice.martins@example.com",
        createdAt: new Date("2024-01-15T10:30:00"),
        lastLogin: new Date("2025-03-15T09:45:00"),
        role: "Admin",
        active: true,
      },
      {
        id: 2,
        fullName: "Bruno Costa",
        email: "bruno.costa@example.com",
        createdAt: new Date("2023-11-22T14:10:00"),
        lastLogin: new Date("2025-03-16T12:20:00"),
        role: "User",
        active: true,
      },
      {
        id: 3,
        fullName: "Carla Ferreira",
        email: "carla.ferreira@example.com",
        createdAt: new Date("2024-06-05T08:00:00"),
        lastLogin: new Date("2025-03-10T16:35:00"),
        role: "Manager",
        active: false,
      },
      {
        id: 4,
        fullName: "Daniel Souza",
        email: "daniel.souza@example.com",
        createdAt: new Date("2024-03-18T11:45:00"),
        lastLogin: new Date("2025-03-12T14:50:00"),
        role: "User",
        active: true,
      },
      {
        id: 5,
        fullName: "Eduarda Lima",
        email: "eduarda.lima@example.com",
        createdAt: new Date("2024-08-09T09:25:00"),
        lastLogin: new Date("2025-03-14T10:10:00"),
        role: "Admin",
        active: false,
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
