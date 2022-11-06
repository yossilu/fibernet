import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../model/task';

const TASK_URL = 'http://localhost:5000/api/task/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<ITask[]>(
      TASK_URL + 'getAll',
      httpOptions
    );
  }

  addTask(description: string, isDone: boolean, status: string): Observable<any> {
    return this.http.post<ITask>(
      TASK_URL + 'add',
      {
        description,
        isDone,
        status
      },
      httpOptions
    );
  }

  updateList(status: string, task: ITask){
    return this.http.post<ITask>(
      TASK_URL + 'updateList',
      {
        status,
        task
      },
      httpOptions
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.post<ITask>(
      TASK_URL + 'delete',
      {
        id
      },
      httpOptions
    );
  }

  updateTask(id: string, description: string): Observable<any> {
    return this.http.post<ITask>(
      TASK_URL + 'update',
      {
        id,
        description
      },
      httpOptions
    );
  }

  updateTaskStatus(id: string, status: string): Observable<any> {
    return this.http.post<ITask>(
      TASK_URL + 'updateStatus',
      {
        id,
        status
      },
      httpOptions
    );
  }

}
