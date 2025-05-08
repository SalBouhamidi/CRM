import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: any = null;
  selectedTab = 'info';
  
  // Exemple de données
  activities = [
    { date: '2025-05-01', type: 'email', description: 'Email de suivi envoyé', user: 'Jean Dupont' },
    { date: '2025-04-28', type: 'call', description: 'Appel pour discuter du renouvellement', user: 'Marie Martin' },
    { date: '2025-04-20', type: 'meeting', description: 'Réunion au bureau du client', user: 'Jean Dupont' },
    { date: '2025-04-15', type: 'note', description: 'Note ajoutée concernant les besoins spécifiques', user: 'Sophie Dubois' },
    { date: '2025-04-10', type: 'email', description: 'Envoi de documentation produit', user: 'Marie Martin' }
  ];
  
  opportunities = [
    { id: 1, name: 'Renouvellement licence annuelle', value: '3500€', stage: 'Négociation', probability: '80%', expectedCloseDate: '2025-06-15' },
    { id: 2, name: 'Extension module RH', value: '1900€', stage: 'Proposition', probability: '60%', expectedCloseDate: '2025-07-10' }
  ];
  
  notes = [
    { id: 1, content: 'Client intéressé par les nouvelles fonctionnalités à venir.', createdAt: '2025-04-28', createdBy: 'Jean Dupont' },
    { id: 2, content: 'Prévoir une démonstration du module RH en juin.', createdAt: '2025-04-20', createdBy: 'Marie Martin' }
  ];
  
  documents = [
    { id: 1, name: 'Contrat_2024.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2025-01-15' },
    { id: 2, name: 'Proposition_Extension.docx', type: 'DOCX', size: '1.8 MB', uploadedAt: '2025-04-18' }
  ];
  
  contacts = [
    { id: 1, name: 'Pierre Durand', position: 'Directeur Général', email: 'p.durand@abc.com', phone: '01 23 45 67 99' },
    { id: 2, name: 'Sophie Martin', position: 'Responsable Achats', email: 's.martin@abc.com', phone: '01 23 45 67 98' }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Dans un environnement réel, vous récupéreriez les données du client depuis un service
    // Pour cet exemple, nous utilisons des données factices
    this.customer = {
      id: 1,
      name: 'Société ABC',
      contact: 'Jean Dupont',
      email: 'contact@abc.com',
      phone: '01 23 45 67 89',
      address: '123 rue des Entreprises, 75001 Paris',
      website: 'www.abc.com',
      industry: 'Technologies',
      size: '50-100 employés',
      revenue: '5-10M€',
      status: 'Actif',
      createdAt: '2023-05-15',
      lastContact: '2025-05-01',
      notes: 'Client fidèle depuis 2 ans.',
      assignedTo: 'Marie Martin'
    };
  }
  
  setTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  getActivityIcon(type: string): string {
    switch (type) {
      case 'email':
        return 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
      case 'call':
        return 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';
      case 'meeting':
        return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
      case 'note':
        return 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';
      default:
        return 'M12 6v6m0 0v6m0-6h6m-6 0H6';
    }
  }
  
  getActivityDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  
  addActivity(): void {
    Swal.fire({
      title: 'Ajouter une activité',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Type d\'activité</label>' +
        '<select id="swal-type" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '<option value="email">Email</option>' +
        '<option value="call">Appel</option>' +
        '<option value="meeting">Réunion</option>' +
        '<option value="note">Note</option>' +
        '</select>' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Description</label>' +
        '<input id="swal-description" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const type = (document.getElementById('swal-type') as HTMLSelectElement).value;
        const description = (document.getElementById('swal-description') as HTMLInputElement).value;
        
        if (!description) {
          Swal.showValidationMessage('Veuillez saisir une description');
          return false;
        }
        
        return { type, description };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const today = new Date().toISOString().split('T')[0];
        const newActivity = {
          date: today,
          type: result.value!.type,
          description: result.value!.description,
          user: 'Utilisateur actuel'
        };
        
        this.activities.unshift(newActivity);
        
        Swal.fire({
          icon: 'success',
          title: 'Activité ajoutée',
          text: 'L\'activité a été ajoutée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  addNote(): void {
    Swal.fire({
      title: 'Ajouter une note',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>' +
        '<textarea id="swal-content" class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="4"></textarea>' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const content = (document.getElementById('swal-content') as HTMLTextAreaElement).value;
        
        if (!content) {
          Swal.showValidationMessage('Veuillez saisir le contenu de la note');
          return false;
        }
        
        return { content };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const today = new Date().toISOString().split('T')[0];
        const newNote = {
          id: this.notes.length + 1,
          content: result.value!.content,
          createdAt: today,
          createdBy: 'Utilisateur actuel'
        };
        
        this.notes.unshift(newNote);
        
        Swal.fire({
          icon: 'success',
          title: 'Note ajoutée',
          text: 'La note a été ajoutée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  addOpportunity(): void {
    Swal.fire({
      title: 'Ajouter une opportunité',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>' +
        '<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
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
        const value = (document.getElementById('swal-value') as HTMLInputElement).value;
        const probability = (document.getElementById('swal-probability') as HTMLInputElement).value;
        const expectedCloseDate = (document.getElementById('swal-date') as HTMLInputElement).value;
        const stage = (document.getElementById('swal-stage') as HTMLSelectElement).value;
        
        if (!name || !value || !probability || !expectedCloseDate) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
          return false;
        }
        
        return { name, value, probability, expectedCloseDate, stage };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newOpportunity = {
          id: this.opportunities.length + 1,
          name: result.value!.name,
          value: result.value!.value + '€',
          stage: result.value!.stage,
          probability: result.value!.probability + '%',
          expectedCloseDate: result.value!.expectedCloseDate
        };
        
        this.opportunities.unshift(newOpportunity);
        
        Swal.fire({
          icon: 'success',
          title: 'Opportunité ajoutée',
          text: 'L\'opportunité a été ajoutée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  editCustomer(): void {
    Swal.fire({
      title: 'Modifier le client',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom de l\'entreprise</label>' +
        `<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${this.customer.name}">` +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Contact</label>' +
        `<input id="swal-contact" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${this.customer.contact}">` +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Email</label>' +
        `<input id="swal-email" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${this.customer.email}">` +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>' +
        `<input id="swal-phone" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${this.customer.phone}">` +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>' +
        `<input id="swal-address" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${this.customer.address}">` +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>' +
        '<select id="swal-status" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        `<option value="Actif" ${this.customer.status === 'Actif' ? 'selected' : ''}>Actif</option>` +
        `<option value="En attente" ${this.customer.status === 'En attente' ? 'selected' : ''}>En attente</option>` +
        `<option value="Inactif" ${this.customer.status === 'Inactif' ? 'selected' : ''}>Inactif</option>` +
        '</select>' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const contact = (document.getElementById('swal-contact') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-phone') as HTMLInputElement).value;
        const address = (document.getElementById('swal-address') as HTMLInputElement).value;
        const status = (document.getElementById('swal-status') as HTMLSelectElement).value;
        
        if (!name || !contact || !email || !phone || !address) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
          return false;
        }
        
        return { name, contact, email, phone, address, status };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.customer.name = result.value!.name;
        this.customer.contact = result.value!.contact;
        this.customer.email = result.value!.email;
        this.customer.phone = result.value!.phone;
        this.customer.address = result.value!.address;
        this.customer.status = result.value!.status;
        
        Swal.fire({
          icon: 'success',
          title: 'Client modifié',
          text: 'Les informations du client ont été modifiées avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}