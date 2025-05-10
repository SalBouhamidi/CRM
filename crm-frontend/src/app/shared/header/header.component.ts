import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';  



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;
  mobileMenuOpen = false;
  
  navItems = [
    { name: 'Tableau de bord', route: '/dashboard' },
    { name: 'Clients', route: '/customers' },
    { name: 'Contacts potentiels', route: '/contacts' },
    { name: 'Opportunités', route: '/opportunities' },
    { name: 'Tâches', route: '/tasks' },
    { name: 'Rapports', route: '/reports' },
    { name: 'Utilisateurs', route: '/users' },
    { name: 'Paramètres', route: '/settings' }
  ];
  
  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  
  
  getPageTitle(): string {
    const path = this.router.url;
    if (path.includes('dashboard')) return 'Tableau de bord';
    if (path.includes('customers')) return 'Gestion des clients';
    if (path.includes('opportunities')) return 'Gestion des opportunités';
    if (path.includes('tasks')) return 'Gestion des tâches';
    if (path.includes('reports')) return 'Rapports';
    if (path.includes('users')) return 'Utilisateurs';
    if (path.includes('settings')) return 'Paramètres';
    return 'CRM Entreprise';
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}