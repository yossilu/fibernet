import { Pipe, PipeTransform } from "@angular/core";
import { ITask } from "../app/model/task";

@Pipe({
    name: 'todopipe',
  })
export class TodoPipe implements PipeTransform {
  
    transform(objects: ITask[]){
        if(objects) {
            return objects.filter(object => {
                return object.status === 'todo';
            });
        } else {
            return ;
        }
    }
}

@Pipe({
    name: 'progresspipe',
  })
export class ProgressPipe implements PipeTransform {
  
    transform(objects: ITask[]){
        if(objects) {
            return objects.filter(object => {
                return object.status === 'progress';
            });
        } else {
            return ;
        }
    }
}

@Pipe({
    name: 'donepipe',
  })
export class DonePipe implements PipeTransform {
  
    transform(objects: ITask[]){
        if(objects) {
            return objects.filter(object => {
                return object.status === 'done';
            });
        } else {
            return ;
        }
    }
}