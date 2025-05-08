import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports = [
    { 
      id: 1, 
      title: 'Performances de vente par région',
      description: 'Analyse des performances de vente par région pour le trimestre en cours.',
      type: 'Ventes',
      lastUpdated: '2025-05-01'
    },
    { 
      id: 2, 
      title: 'Analyse des leads par source',
      description: 'Répartition des leads par source d\'acquisition pour le mois en cours.',
      type: 'Marketing',
      lastUpdated: '2025-05-03'
    },
    { 
      id: 3, 
      title: 'Taux de conversion par représentant',
      description: 'Taux de conversion des opportunités par représentant commercial.',
      type: 'Ventes',
      lastUpdated: '2025-04-28'
    },
    { 
      id: 4, 
      title: 'Prévisions de vente',
      description: 'Prévisions de vente pour les 3 prochains mois basées sur le pipeline actuel.',
      type: 'Ventes',
      lastUpdated: '2025-04-25'
    },
    { 
      id: 5, 
      title: 'Analyse des clients par secteur',
      description: 'Répartition des clients par secteur d\'activité et montant des ventes associées.',
      type: 'Clients',
      lastUpdated: '2025-04-20'
    }
  ];
  
  constructor() { }
  
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