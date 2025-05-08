import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      { 
        path: 'customers', 
        loadComponent: () => import('./customers/customer-list/customer-list.component').then(c => c.CustomerListComponent)
      },
      { 
        path: 'customers/:id', 
        loadComponent: () => import('./customers/customer-detail/customer-detail.component').then(c => c.CustomerDetailComponent)
      },
      { 
        path: 'opportunities', 
        loadComponent: () => import('./opportunities/opportunity-list/opportunity-list.component').then(c => c.OpportunityListComponent)
      },
      { 
        path: 'tasks', 
        loadComponent: () => import('./tasks/task-list/task-list.component').then(c => c.TaskListComponent)
      },
      { 
        path: 'reports', 
        loadComponent: () => import('./reports/report-list/report-list.component').then(c => c.ReportListComponent)
      },
      { 
        path: 'users', 
        loadComponent: () => import('./users/user-list/user-list.component').then(c => c.UserListComponent)
      },
      { 
        path: 'settings', 
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];