import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 importa FormsModule


@Component({
  selector: 'app-user-crud',
  imports: [CommonModule, FormsModule], // 👈 agrega FormsModule a imports
  templateUrl: './user-crud.html',
  styleUrl: './user-crud.css'
})
export class UserCrud implements OnInit{
  users: User[] = [];
  formUser: User = { name: '', email: '' };
  editMode= false;
  editId: number | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Lógica de inicialización
    this.loadUsers();
  }

  //Cargar lista de usuarios desde el backend
  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  //Guardar un usuario (Crear o actualizar)
  saveUser(): void {
    if (this.editMode && this.editId !== null) {
      // Actualizar usuario existente
      this.userService.updateUser(this.editId, this.formUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      // Crear nuevo usuario
      this.userService.createUser(this.formUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  //Cargar usuario en el form para la edicion
  editUser(user: User): void {
    this.formUser = { name: user.name, email: user.email }; // Copia el usuario a formUser
    this.editMode = true; // Cambia a modo edición
    this.editId = user.id ?? null; // Guarda el ID del usuario para actualizar
  }
  //Eliminar un usuario
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }


  resetForm(): void {
    this.formUser = {name: '', email: ''};
    this.editMode = false;
    this.editId = null;
  }

}
