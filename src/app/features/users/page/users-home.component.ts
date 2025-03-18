import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersTableComponent } from "../components/users-table/users-table.component";

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from '../../../models/interfaces/event/EventAction';
import { UsersFormComponent } from '../components/users-form/users-form.component';

@Component({
  selector: 'app-users-home',
  standalone: true,
  imports: [UsersTableComponent],
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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handleUserAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(UsersFormComponent, {
        header: event?.action,
        width: '35%',
        modal: true,
        contentStyle: { overflow: 'visible' },
        closable: true,
        baseZIndex: 1000,
        maximizable: false,
        data: {
          event: event
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

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }
}
