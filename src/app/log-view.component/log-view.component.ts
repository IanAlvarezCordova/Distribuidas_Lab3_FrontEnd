import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService, Log } from '../log.service';

@Component({
  selector: 'app-log-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit {
  logs: Log[] = [];
  errorMessage: string | null = null;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al cargar los logs';
      }
    });
  }
}