import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ITask } from '../model/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  content?: string;
  todoForm !: FormGroup;
  tasks: ITask[] = [];
  isEditEnabled: boolean = false;
  updatedIndex!: number;
  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })

    this.taskService.getAll().subscribe({
      next: (data: ITask[]) => {
        this.tasks = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = err.message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    })
  }

  addTask(){
    const description = this.todoForm.value.item;

    this.taskService.addTask(description, false, 'todo').subscribe({
      next: data => {
        const newTask: ITask = data;
        this.tasks.push(newTask);
        this.tasks = this.tasks;
        this.reloadCurrentRoute();
        this.todoForm.reset();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = err.message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  deleteTask(task: ITask){
    const taskId = task._id;
    this.deleteApi(taskId);  
  }

  deleteApi(taskId: string){
    this.taskService.deleteTask(taskId).subscribe({
      next: data => {
        this.tasks = data;
        this.ngOnInit();
        // this.reloadCurrentRoute();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = err.message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }


  changeTaskStatus(task: ITask, direction: string){
    const currStatus = task.status;
    if(direction === 'forward'){
      task.status = currStatus === 'todo'? 'progress' : 'done';
    } else {
      task.status = currStatus === 'done'? 'progress' : 'todo';
    }
    
    this.taskService.updateTaskStatus(task._id, task.status).subscribe({
      next: data => {
        this.reloadCurrentRoute();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = err.message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    })
  }

  updateTask(){
    const description = this.todoForm.value.item;
    this.taskService.updateTask(this.tasks[this.updatedIndex]._id, description).subscribe({
      next: data => {
        this.tasks[this.updatedIndex].description = data.description;
        this.tasks[this.updatedIndex].isDone = false;
        this.todoForm.reset();
        this.updatedIndex = 0;
        this.isEditEnabled = false;
        this.reloadCurrentRoute();
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = err.message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  editTask(item:ITask, i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.isEditEnabled = true;
    this.updatedIndex = i;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
