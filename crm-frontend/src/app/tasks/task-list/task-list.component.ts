import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks = [
    { id: 1, title: 'Appeler le client ABC', description: 'Discuter des nouvelles fonctionnalités', priority: 'Haute', dueDate: '2025-05-10', status: 'En cours', assignedTo: 'Jean Dupont', customer: 'Société ABC' },
    { id: 2, title: 'Envoyer proposition XYZ', description: 'Finaliser et envoyer la proposition commerciale', priority: 'Moyenne', dueDate: '2025-05-12', status: 'Nouveau', assignedTo: 'Marie Martin', customer: 'Entreprise XYZ' },
    { id: 3, title: 'Réunion équipe vente', description: 'Préparer la présentation pour la réunion hebdomadaire', priority: 'Haute', dueDate: '2025-05-09', status: 'En cours', assignedTo: 'Jean Dupont', customer: '' },
    { id: 4, title: 'Préparer rapport mensuel', description: 'Compiler les données de vente du mois', priority: 'Basse', dueDate: '2025-05-15', status: 'Nouveau', assignedTo: 'Sophie Dubois', customer: '' },
    { id: 5, title: 'Suivre le paiement DEF', description: 'Vérifier le statut du paiement en attente', priority: 'Moyenne', dueDate: '2025-05-08', status: 'En cours', assignedTo: 'Pierre Durand', customer: 'Société DEF' },
    { id: 6, title: 'Mettre à jour la base de contacts', description: 'Ajouter les nouveaux prospects à la base de données', priority: 'Basse', dueDate: '2025-05-20', status: 'Nouveau', assignedTo: 'Marie Martin', customer: '' }
  ];
  
  filteredTasks = [...this.tasks];
  searchTerm = '';
  statusFilter = 'Tous';
  priorityFilter = 'Tous';
  
  constructor() { }
  
  ngOnInit(): void { }
  
  addTask(): void {
    Swal.fire({
      title: 'Ajouter une tâche',
      html:
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>' +
        '<input id="swal-title" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Description</label>' +
        '<textarea id="swal-description" class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="2"></textarea>' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Client (optionnel)</label>' +
        '<input id="swal-customer" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Date d\'échéance</label>' +
        '<input id="swal-date" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label class="block text-sm font-medium text-gray-700 mb-1">Priorité</label>' +
        '<select id="swal-priority" class="w-full px-3 py-2 border border-gray-300 rounded-md">' +
        '<option value="Haute">Haute</option>' +
        '<option value="Moyenne">Moyenne</option>' +
        '<option value="Basse">Basse</option>' +
        '</select>' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('swal-title') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLTextAreaElement).value;
        const customer = (document.getElementById('swal-customer') as HTMLInputElement).value;
        const dueDate = (document.getElementById('swal-date') as HTMLInputElement).value;
        const priority = (document.getElementById('swal-priority') as HTMLSelectElement).value;
        
        if (!title || !description || !dueDate) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        
        return { title, description, customer, dueDate, priority };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newTask = {
          id: this.tasks.length + 1,
          title: result.value!.title,
          description: result.value!.description,
          customer: result.value!.customer,
          dueDate: result.value!.dueDate,
          priority: result.value!.priority,
          status: 'Nouveau',
          assignedTo: 'Utilisateur actuel'
        };
        
        this.tasks.unshift(newTask);
        this.applyFilters();
        
        Swal.fire({
          icon: 'success',
          title: 'Tâche ajoutée',
          text: `La tâche "${newTask.title}" a été ajoutée avec succès.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  completeTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    
    Swal.fire({
      title: 'Marquer comme terminée?',
      text: `Êtes-vous sûr de vouloir marquer la tâche "${task?.title}" comme terminée?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, terminer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].status = 'Terminé';
          this.applyFilters();
          
          Swal.fire({
            icon: 'success',
            title: 'Tâche terminée',
            text: 'La tâche a été marquée comme terminée.',
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    });
  }
  
  deleteTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer la tâche "${task?.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.applyFilters();
        
        Swal.fire({
          icon: 'success',
          title: 'Tâche supprimée',
          text: 'La tâche a été supprimée avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
  
  applyFilters(): void {
    let filtered = [...this.tasks];
    
    // Filtre de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(term) || 
        task.description.toLowerCase().includes(term) || 
        task.customer.toLowerCase().includes(term) || 
        task.assignedTo.toLowerCase().includes(term)
      );
    }
    
    // Filtre de statut
    if (this.statusFilter !== 'Tous') {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }
    
    // Filtre de priorité
    if (this.priorityFilter !== 'Tous') {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }
    
    this.filteredTasks = filtered;
  }
  
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basse':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Nouveau':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}