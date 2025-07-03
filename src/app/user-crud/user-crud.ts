import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-crud',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-crud.html',
  styleUrl: './user-crud.css'
})
export class UserCrud implements OnInit {
  users: User[] = [];
  formUser: User = { name: '', email: '' };
  editMode = false;
  editId: number | null = null;
  errorMessage: string | null = null; // Nueva variable para mensajes de error

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar lista de usuarios desde el backend
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.errorMessage = null; // Limpiar mensaje de error al cargar exitosamente
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los usuarios: ' + (error.error?.message || 'Error desconocido');
      }
    });
  }

  // Guardar un usuario (Crear o actualizar)
  saveUser(): void {
    if (!this.formUser.name || !this.formUser.email) {
      this.errorMessage = 'El nombre y el email son obligatorios';
      return;
    }
    if (this.editMode && this.editId !== null) {
      // Actualizar usuario existente
      this.userService.updateUser(this.editId, this.formUser).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
          this.errorMessage = null; // Limpiar mensaje de error
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al actualizar el usuario';
        }
      });
    } else {
      // Crear nuevo usuario
      this.userService.createUser(this.formUser).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
          this.errorMessage = null; // Limpiar mensaje de error
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al crear el usuario';
        }
      });
    }
  }

  // Cargar usuario en el form para la edición
  editUser(user: User): void {
    this.formUser = { name: user.name, email: user.email };
    this.editMode = true;
    this.editId = user.id ?? null;
    this.errorMessage = null; // Limpiar mensaje de error al editar
  }

  // Eliminar un usuario
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.errorMessage = null; // Limpiar mensaje de error
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al eliminar el usuario';
      }
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.formUser = { name: '', email: '' };
    this.editMode = false;
    this.editId = null;
    this.errorMessage = null; // Limpiar mensaje de error
  }

  
  openLogsWindow(): void {
    const logsWindow = window.open('/logs', '_blank', 'width=800,height=600');
    if (!logsWindow) {
      this.errorMessage = 'No se pudo abrir la ventana de registros';
    }
  }
  
}