import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings = {
    // Paramètres généraux
    companyName: 'Ma Société',
    language: 'fr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    
    // Paramètres utilisateur
    notifications: {
      email: true,
      browser: true,
      tasks: true,
      opportunities: true,
      newCustomers: true
    },
    
    // Paramètres d'importation/exportation
    importExport: {
      autoBackup: true,
      backupFrequency: 'daily',
      exportFormat: 'csv'
    },
    
    // Paramètres de pipeline de vente
    salesPipeline: {
      stages: [
        { id: 1, name: 'Qualification', color: '#818cf8' },
        { id: 2, name: 'Proposition', color: '#60a5fa' },
        { id: 3, name: 'Négociation', color: '#fbbf24' },
        { id: 4, name: 'Clôture', color: '#34d399' }
      ]
    }
  };
  
  constructor() { }
  
  ngOnInit(): void { }
  
  saveSettings(): void {
    Swal.fire({
      icon: 'success',
      title: 'Paramètres enregistrés',
      text: 'Vos paramètres ont été enregistrés avec succès.',
      timer: 2000,
      showConfirmButton: false
    });
  }
  
  resetSettings(): void {
    Swal.fire({
      title: 'Réinitialiser les paramètres?',
      text: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres? Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, réinitialiser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset to default settings
        this.settings = {
          companyName: 'Ma Société',
          language: 'fr',
          currency: 'EUR',
          dateFormat: 'DD/MM/YYYY',
          notifications: {
            email: true,
            browser: true,
            tasks: true,
            opportunities: true,
            newCustomers: true
          },
          importExport: {
            autoBackup: true,
            backupFrequency: 'daily',
            exportFormat: 'csv'
          },
          salesPipeline: {
            stages: [
              { id: 1, name: 'Qualification', color: '#818cf8' },
              { id: 2, name: 'Proposition', color: '#60a5fa' },
              { id: 3, name: 'Négociation', color: '#fbbf24' },
              { id: 4, name: 'Clôture', color: '#34d399' }
            ]
          }
        };
        
        Swal.fire({
          icon: 'success',
          title: 'Paramètres réinitialisés',
          text: 'Les paramètres ont été réinitialisés avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  addStage(): void {
    Swal.fire({
      title: 'Ajouter une étape',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom de l\'étape</label>' +
        '<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Couleur</label>' +
        '<input id="swal-color" type="color" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="#60a5fa">' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const color = (document.getElementById('swal-color') as HTMLInputElement).value;
        
        if (!name) {
          Swal.showValidationMessage('Veuillez saisir un nom d\'étape');
          return false;
        }
        
        return { name, color };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newStage = {
          id: this.settings.salesPipeline.stages.length + 1,
          name: result.value!.name,
          color: result.value!.color
        };
        
        this.settings.salesPipeline.stages.push(newStage);
        
        Swal.fire({
          icon: 'success',
          title: 'Étape ajoutée',
          text: 'L\'étape a été ajoutée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  deleteStage(id: number): void {
    const stage = this.settings.salesPipeline.stages.find(s => s.id === id);
    
    Swal.fire({
      title: 'Supprimer l\'étape?',
      text: `Êtes-vous sûr de vouloir supprimer l'étape "${stage?.name}"? Cette action est irréversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settings.salesPipeline.stages = this.settings.salesPipeline.stages.filter(s => s.id !== id);
        
        Swal.fire({
          icon: 'success',
          title: 'Étape supprimée',
          text: 'L\'étape a été supprimée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}