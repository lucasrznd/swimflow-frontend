import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserResponse } from '../../../models/interfaces/users/UserResponse';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: Observable<Array<UserResponse>> = of([
    {
      id: 1,
      fullName: "Alice Martins",
      email: "alice.martins@example.com",
      createdAt: new Date("2024-01-15T10:30:00"),
      lastLogin: new Date("2025-03-15T09:45:00"),
      role: "ADMIN",
      active: true,
    },
    {
      id: 2,
      fullName: "Bruno Costa",
      email: "bruno.costa@example.com",
      createdAt: new Date("2023-11-22T14:10:00"),
      lastLogin: new Date("2025-03-16T12:20:00"),
      role: "USER",
      active: true,
    },
    {
      id: 3,
      fullName: "Carla Ferreira",
      email: "carla.ferreira@example.com",
      createdAt: new Date("2024-06-05T08:00:00"),
      lastLogin: new Date("2025-03-10T16:35:00"),
      role: "MANAGER",
      active: false,
    },
    {
      id: 4,
      fullName: "Daniel Souza",
      email: "daniel.souza@example.com",
      createdAt: new Date("2024-03-18T11:45:00"),
      lastLogin: new Date("2025-03-12T14:50:00"),
      role: "USER",
      active: true,
    },
    {
      id: 5,
      fullName: "Eduarda Lima",
      email: "eduarda.lima@example.com",
      createdAt: new Date("2024-08-09T09:25:00"),
      lastLogin: new Date("2025-03-14T10:10:00"),
      role: "ADMIN",
      active: false,
    }
  ]);
  private API_URL = `${environment.API_URL}/users`;
  private http = inject(HttpClient);

  constructor() { }

  findAll(): Observable<Array<UserResponse>> {
    return this.userList;
  }

  create(user: UserResponse): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}`, user);
  }

  update(id: number, user: UserResponse): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
