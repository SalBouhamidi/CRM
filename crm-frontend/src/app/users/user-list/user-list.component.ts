import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Admin', department: 'Ventes', status: 'Actif', lastLogin: '2025-05-07' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', role: 'Manager', department: 'Ventes', status: 'Actif', lastLogin: '2025-05-06' },
    { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com', role: 'Standard', department: 'Support', status: 'Actif', lastLogin: '2025-05-07' },
    { id: 4, name: 'Sophie Dubois', email: 'sophie.dubois@example.com', role: 'Standard', department: 'Marketing', status: 'Actif', lastLogin: '2025-05-05' },
    { id: 5, name: 'Philippe Leroy', email: 'philippe.leroy@example.com', role: 'Manager', department: 'Technique', status: 'Inactif', lastLogin: '2025-04-30' },
    { id: 6, name: 'Claire Moreau', email: 'claire.moreau@example.com', role: 'Standard', department: 'Ventes', status: 'Actif', lastLogin: '2025-05-07' }
  ];
  
  filteredUsers = [...this.users];
  searchTerm = '';
  roleFilter = 'Tous';
  departmentFilter = 'Tous';
  
  constructor() { }
  
  ngOnInit(): void { }
  
  addUser(): void {
    Swal.fire({
      title: 'Ajouter un utilisateur',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>' +
        '<input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Email</label>' +
        '<input id="swal-email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>' +
        '<select id="swal-role" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '<option value="Admin">Admin</option>' +
        '<option value="Manager">Manager</option>' +
        '<option value="Standard">Standard</option>' +
        '</select>' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Département</label>' +
        '<select id="swal-department" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '<option value="Ventes">Ventes</option>' +
        '<option value="Marketing">Marketing</option>' +
        '<option value="Support">Support</option>' +
        '<option value="Technique">Technique</option>' +
        '</select>' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const role = (document.getElementById('swal-role') as HTMLSelectElement).value;
        const department = (document.getElementById('swal-department') as HTMLSelectElement).value;
        
        if (!name || !email) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage('Veuillez entrer un email valide');
          return false;
        }
        
        return { name, email, role, department };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const today = new Date().toISOString().split('T')[0];
        const newUser = {
          id: this.users.length + 1,
          name: result.value!.name,
          email: result.value!.email,
          role: result.value!.role,
          department: result.value!.department,
          status: 'Actif',
          lastLogin: today
        };
        
        this.users.unshift(newUser);
        this.applyFilters();
        
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur ajouté',
          text: `L'utilisateur ${newUser.name} a été ajouté avec succès.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  deleteUser(id: number): void {
    const user = this.users.find(u => u.id === id);
    
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer l'utilisateur ${user?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(u => u.id !== id);
        this.applyFilters();
        
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur supprimé',
          text: 'L\'utilisateur a été supprimé avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  toggleStatus(id: number): void {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      const newStatus = this.users[userIndex].status === 'Actif' ? 'Inactif' : 'Actif';
      this.users[userIndex].status = newStatus;
      this.applyFilters();
      
      Swal.fire({
        icon: 'success',
        title: 'Statut modifié',
        text: `L'utilisateur est maintenant ${newStatus}.`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
  
  applyFilters(): void {
    let filtered = [...this.users];
    
    // Filtre de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    // Filtre de rôle
    if (this.roleFilter !== 'Tous') {
      filtered = filtered.filter(user => user.role === this.roleFilter);
    }
    
    // Filtre de département
    if (this.departmentFilter !== 'Tous') {
      filtered = filtered.filter(user => user.department === this.departmentFilter);
    }
    
    this.filteredUsers = filtered;
  }
  
  getStatusClass(status: string): string {
    return status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }
  
  getRoleClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Standard':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}