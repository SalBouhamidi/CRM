import {Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart,registerables  } from 'chart.js';


Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,AfterViewInit  {
  @ViewChild('pieChartRef') pieChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;

  chart: any;

  ngAfterViewInit(): void {
    this.createChart();
    this.createSecondChart()
  }
  
  createChart(): void {
    const data = {
      labels: ['En cours', 'Gagné', 'Perdu'],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: [
          '#3b82f6',  
          '#10b981',  
          '#ef4444'   
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    };
  
    this.chart = new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.label}: ${context.raw}%`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
  }



  createSecondChart(): void {
    const data = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
      datasets: [{
        label: 'Chiffre d\'affaires (k€)',
        data: [12, 19, 24, 31, 42, 36, 45, 50],
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      }]
    };

    this.chart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  dashboardData = {
    totalClients: { value: '142', trend: 'up' },
    ongoingSales: { value: '37', trend: 'up' },
    projectedRevenue: { value: '89 500 €', trend: 'up' },
    tasksToComplete: { value: '23', trend: 'down' }
  };

  tasks = [
    { id: 1, title: 'Appeler Société Guess pour suivi', dueDate: '05/05/2025', completed: false, priority: 'high' },
    { id: 2, title: 'Préparer présentation client Mohammed', dueDate: '07/05/2025', completed: false, priority: 'medium' },
    { id: 3, title: 'Envoyer devis à Entreprise OMO', dueDate: '08/05/2025', completed: false, priority: 'medium' },
    { id: 4, title: 'Mettre à jour la base de contacts', dueDate: '03/05/2025', completed: true, priority: 'low' }
  ];


  activities = [
    { 
      id: 1, 
      type: 'new_client', 
      user: 'Sophia',
      action: 'a ajouté un nouveau client', 
      timestamp: '2025-05-04T09:30:00', 
      timeAgo: '10 minutes'
    },
    { 
      id: 2, 
      type: 'new_opportunity', 
      user: 'Mehdi',
      action: 'a créé une nouvelle opportunité', 
      timestamp: '2025-05-04T09:15:00', 
      timeAgo: '25 minutes'
    },
    { 
      id: 3, 
      type: 'closed_deal', 
      user: 'Mohammed',
      action: 'a conclu un contrat avec Entreprise XYZ', 
      timestamp: '2025-05-04T08:45:00', 
      timeAgo: '55 minutes'
    },
    { 
      id: 4, 
      type: 'task_completed', 
      user: 'Zakaria',
      action: 'a complété une tâche', 
      timestamp: '2025-05-04T08:30:00', 
      timeAgo: '1 heure'
    }
  ];


  getActivityIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'new_client': '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      'new_opportunity': '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
      'closed_deal': '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      'task_completed': '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>'
    };
    
    return icons[type] || '';
  }

  getPriorityText(priority: string): string {
    switch(priority) {
      case 'high': return 'Urgent';
      case 'medium': return 'Normal';
      case 'low': return 'Bas';
      default: return '';
    }
  }
  

  
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

  dashboardKpi = [
    { label: 'Total Clients', value: this.dashboardData.totalClients.value, trend: this.dashboardData.totalClients.trend },
    { label: 'Ongoing Sales', value: this.dashboardData.ongoingSales.value, trend: this.dashboardData.ongoingSales.trend },
    { label: 'Projected Revenue', value: this.dashboardData.projectedRevenue.value, trend: this.dashboardData.projectedRevenue.trend },
    { label: 'Tasks to Complete', value: this.dashboardData.tasksToComplete.value, trend: this.dashboardData.tasksToComplete.trend }
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

  getTrendClass(trend: string): string {
    switch (trend) {
      case 'up':
        return 'text-green-500'; 
      case 'down':
        return 'text-red-500'; 
      case 'neutral':
        return 'text-gray-500'; 
      default:
        return 'text-gray-500';
    }
  }
}
