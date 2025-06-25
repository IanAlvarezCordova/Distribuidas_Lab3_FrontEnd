import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-crud',
  imports: [CommonModule],
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

}
