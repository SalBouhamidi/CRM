import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers = [
    { id: 1, name: 'Société ABC', email: 'contact@abc.com',phone:"08293746483663", secteur: 'Technologie', commercial: 'Abdellatif' },
    { id: 2, name: 'Entreprise XYZ', email: 'info@xyz.com',phone:"08293746483663", secteur: 'Marketing', commercial: 'Abdellatif' },
    { id: 3, name: 'Société DEF', email: 'contact@def.com',phone:"08293746483663", secteur: 'Technologie', commercial: 'Mohammed' },
    { id: 4, name: 'Entreprise GHI', email: 'info@ghi.com',phone:"08293746483663", secteur: 'Bien etre', commercial: 'Mohammed' }
  ];
  
  filteredCustomers = [...this.customers];
  searchTerm = '';
  
  constructor(private router: Router) { }
  
  ngOnInit(): void { }
  
  viewCustomer(id: number): void {
    this.router.navigate(['/customers', id]);
  }
  
  addCustomer(): void {
    Swal.fire({
      title: 'Ajouter un client',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom de l\'entreprise</label>' +
        '<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Contact</label>' +
        '<input id="swal-contact" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Email</label>' +
        '<input id="swal-email" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>' +
        '<input id="swal-phone" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const contact = (document.getElementById('swal-contact') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-phone') as HTMLInputElement).value;
        
        if (!name || !contact || !email || !phone) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
          return false;
        }
        
        return { name, contact, email, phone };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCustomer = {
          id: this.customers.length + 1,
          name: result.value!.name,
          email: result.value!.email,
          phone: result.value!.phone,
          secteur: 'Technologie',
          commercial: 'Salima'
        };
        
        this.customers.unshift(newCustomer);
        this.applyFilter();
        
        Swal.fire({
          icon: 'success',
          title: 'Client ajouté',
          text: `Le client ${newCustomer.name} a été ajouté avec succès.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  deleteCustomer(id: number): void {
    const customer = this.customers.find(c => c.id === id);
    
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer le client ${customer?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customers = this.customers.filter(c => c.id !== id);
        this.applyFilter();
        
        Swal.fire({
          icon: 'success',
          title: 'Client supprimé',
          text: 'Le client a été supprimé avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer => 
      customer.name.toLowerCase().includes(term) || 
      customer.secteur.toLowerCase().includes(term) || 
      customer.email.toLowerCase().includes(term) || 
      customer.phone.toLowerCase().includes(term)
    );
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactif':
        return 'bg-red-100 text-red-800';
      case 'Nouveau':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}