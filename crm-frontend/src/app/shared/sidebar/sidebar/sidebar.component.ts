import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user: any;
  
  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
  
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}