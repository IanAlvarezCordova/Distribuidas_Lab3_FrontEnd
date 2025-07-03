import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Log {
  _id?: string;
  action: string;
  userId: number;
  userName: string;
  userEmail: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/api/logs';

  constructor(private http: HttpClient) { }

  // Obtener todos los logs
  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.apiUrl);
  }
}