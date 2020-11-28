import { animate, animation, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers:[TodoService],
  animations: [ 
    trigger('fade', [

      // Animations when we add a todo
      transition(':enter', [
        style({opacity: 0, transform:'translateY(30px)' }),
        animate(1000, style ({ opacity: 1, transform:'translateY(0px)'} ))
      ]),

      // Animations when we delete a todo
      transition(':leave', [
        animate(1000, style ({ opacity: 1, transform:'translateY(30px)'} ))
      ]),
    ])
  ]
})
export class TodoListComponent implements OnInit {
   todoTitle!: string;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
     this.todoTitle = '';
  }

  //Adding todos
  addTodo(): void{
    if(this.todoTitle.trim().length === 0){
      return;
    }

    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
}


