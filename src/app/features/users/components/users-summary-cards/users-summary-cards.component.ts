import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { UserStats } from '../../../../models/interfaces/users/UserStats';

@Component({
  selector: 'app-users-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-summary-cards.component.html',
  styleUrl: './users-summary-cards.component.scss'
})
export class UsersSummaryCardsComponent {

  usersStats: UserStats = {
    activeUsers: 0,
    activeUsersPercentage: 0,
    newUsers: 0,
    newUsersGrowth: 0,
    adminUsers: 0,
    adminUsersPercentage: 0,
    activityRate: 0,
    activityTrend: 0
  };

  ngOnInit() {
    this.loadUserStats();
  }

  loadUserStats() {
    // Simulando dados para demonstração
    this.usersStats = {
      activeUsers: 842,
      activeUsersPercentage: 78,
      newUsers: 24,
      newUsersGrowth: 12,
      adminUsers: 15,
      adminUsersPercentage: 1.8,
      activityRate: 68,
      activityTrend: 3.2
    };
  }
}
