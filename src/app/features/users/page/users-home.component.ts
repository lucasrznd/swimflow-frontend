import { Component } from '@angular/core';
import { UsersTableComponent } from "../components/users-table/users-table.component";

@Component({
  selector: 'app-users-home',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users-home.component.html',
  styleUrl: './users-home.component.scss'
})
export class UsersHomeComponent {

}
