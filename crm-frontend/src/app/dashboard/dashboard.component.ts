import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentCustomers = [
    { id: 1, name: 'Société ABC', email: 'contact@abc.com', status: 'Actif', value: '5400€' },
    { id: 2, name: 'Entreprise XYZ', email: 'info@xyz.com', status: 'En attente', value: '2800€' },
    { id: 3, name: 'Société DEF', email: 'contact@def.com', status: 'Actif', value: '7200€' },
    { id: 4, name: 'Entreprise GHI', email: 'info@ghi.com', status: 'Inactif', value: '1100€' }
  ];
  
  recentTasks = [
    { id: 1, title: 'Appeler le client ABC', priority: 'Haute', dueDate: '2025-05-10', status: 'En cours' },
    { id: 2, title: 'Envoyer proposition XYZ', priority: 'Moyenne', dueDate: '2025-05-12', status: 'Nouveau' },
    { id: 3, title: 'Réunion équipe vente', priority: 'Haute', dueDate: '2025-05-09', status: 'En cours' },
    { id: 4, title: 'Préparer rapport mensuel', priority: 'Basse', dueDate: '2025-05-15', status: 'Nouveau' }
  ];
  
  salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes 2024',
        data: [12500, 19200, 15700, 16900, 21500, 18200],
        backgroundColor: '#0ea5e9'
      },
      {
        label: 'Ventes 2023',
        data: [10800, 15300, 14200, 15500, 16800, 17200],
        backgroundColor: '#94a3b8'
      }
    ]
  };
  
  leadsSourceData = {
    labels: ['Site Web', 'Réseaux Sociaux', 'Références', 'Email', 'Autre'],
    datasets: [
      {
        label: 'Leads par source',
        data: [35, 25, 20, 15, 5],
        backgroundColor: ['#0ea5e9', '#2dd4bf', '#fbbf24', '#f87171', '#a3a3a3']
      }
    ]
  };
  
  stats = [
    { title: 'Clients', value: '254', change: '+12%', icon: 'users' },
    { title: 'Opportunités', value: '86', change: '+5%', icon: 'chart' },
    { title: 'Tâches', value: '43', change: '-3%', icon: 'tasks' },
    { title: 'Revenus', value: '152K€', change: '+18%', icon: 'currency' }
  ];
  
  constructor() { }
  
  ngOnInit(): void { }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactif':
        return 'bg-red-100 text-red-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Nouveau':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Haute':
        return 'text-red-600';
      case 'Moyenne':
        return 'text-yellow-600';
      case 'Basse':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }
}