import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opportunity-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opportunity-list.component.html',
  styleUrls: ['./opportunity-list.component.css']
})
export class OpportunityListComponent implements OnInit {
  opportunities = [
    { id: 1, name: 'Renouvellement licence ABC', customer: 'Société ABC', value: '5400€', stage: 'Négociation', probability: '80%', expectedCloseDate: '2025-06-15', assignedTo: 'Jean Dupont' },
    { id: 2, name: 'Extension module RH', customer: 'Entreprise XYZ', value: '1900€', stage: 'Proposition', probability: '60%', expectedCloseDate: '2025-07-10', assignedTo: 'Marie Martin' },
    { id: 3, name: 'Nouveau contrat', customer: 'Société DEF', value: '7200€', stage: 'Qualification', probability: '40%', expectedCloseDate: '2025-08-20', assignedTo: 'Pierre Durand' },
    { id: 4, name: 'Montée en gamme', customer: 'Entreprise GHI', value: '3500€', stage: 'Clôture', probability: '90%', expectedCloseDate: '2025-05-30', assignedTo: 'Sophie Dubois' },
    { id: 5, name: 'Services supplémentaires', customer: 'Société JKL', value: '2200€', stage: 'Négociation', probability: '75%', expectedCloseDate: '2025-07-05', assignedTo: 'Jean Dupont' },
  ];
  
  filteredOpportunities = [...this.opportunities];
  searchTerm = '';
  
  constructor() { }
  
  ngOnInit(): void { }
  
  addOpportunity(): void {
    Swal.fire({
      title: 'Ajouter une opportunité',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>' +
        '<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Client</label>' +
        '<input id="swal-customer" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Valeur (€)</label>' +
        '<input id="swal-value" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Probabilité (%)</label>' +
        '<input id="swal-probability" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Date de clôture prévue</label>' +
        '<input id="swal-date" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Étape</label>' +
        '<select id="swal-stage" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '<option value="Qualification">Qualification</option>' +
        '<option value="Proposition">Proposition</option>' +
        '<option value="Négociation">Négociation</option>' +
        '<option value="Clôture">Clôture</option>' +
        '</select>' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const customer = (document.getElementById('swal-customer') as HTMLInputElement).value;
        const value = (document.getElementById('swal-value') as HTMLInputElement).value;
        const probability = (document.getElementById('swal-probability') as HTMLInputElement).value;
        const expectedCloseDate = (document.getElementById('swal-date') as HTMLInputElement).value;
        const stage = (document.getElementById('swal-stage') as HTMLSelectElement).value;
        
        if (!name || !customer || !value || !probability || !expectedCloseDate) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
          return false;
        }
        
        return { name, customer, value, probability, expectedCloseDate, stage };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newOpportunity = {
          id: this.opportunities.length + 1,
          name: result.value!.name,
          customer: result.value!.customer,
          value: result.value!.value + '€',
          stage: result.value!.stage,
          probability: result.value!.probability + '%',
          expectedCloseDate: result.value!.expectedCloseDate,
          assignedTo: 'Utilisateur actuel'
        };
        
        this.opportunities.unshift(newOpportunity);
        this.applyFilter();
        
        Swal.fire({
          icon: 'success',
          title: 'Opportunité ajoutée',
          text: `L'opportunité ${newOpportunity.name} a été ajoutée avec succès.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  deleteOpportunity(id: number): void {
    const opportunity = this.opportunities.find(o => o.id === id);
    
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer l'opportunité ${opportunity?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.opportunities = this.opportunities.filter(o => o.id !== id);
        this.applyFilter();
        
        Swal.fire({
          icon: 'success',
          title: 'Opportunité supprimée',
          text: 'L\'opportunité a été supprimée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredOpportunities = [...this.opportunities];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredOpportunities = this.opportunities.filter(opportunity => 
      opportunity.name.toLowerCase().includes(term) || 
      opportunity.customer.toLowerCase().includes(term) || 
      opportunity.value.toLowerCase().includes(term) || 
      opportunity.stage.toLowerCase().includes(term) || 
      opportunity.assignedTo.toLowerCase().includes(term)
    );
  }
  
  getStageClass(stage: string): string {
    switch (stage) {
      case 'Qualification':
        return 'bg-purple-100 text-purple-800';
      case 'Proposition':
        return 'bg-blue-100 text-blue-800';
      case 'Négociation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Clôture':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}