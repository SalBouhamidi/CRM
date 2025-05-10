import {Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart,registerables  } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  @ViewChild('pieChartRef') pieChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;
  chart: any;

  constructor() { }
  
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
  
  ngOnInit(): void { }
  
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  
  getTypeClass(type: string): string {
    switch (type) {
      case 'Ventes':
        return 'bg-blue-100 text-blue-800';
      case 'Marketing':
        return 'bg-purple-100 text-purple-800';
      case 'Clients':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}