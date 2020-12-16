import { animate, animation, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../interfaces/todo';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

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

  //QrCode Fonctionnalité
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://github./madhouny/Angular-TodoList';

  todoTitle!: string;
  //  todos:Todo ={
  //    id:1,
  //    title:'',
  //    completed:false,
  //    editing:false
  //  }

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
     
  }

  addTodo(): void{
    if(this.todoTitle.trim().length === 0){
      return;
    }

    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
    

  }


  //Adding todos with firebase
  // addTodo(): void{
  //   if(this.todos.title.trim().length === 0){
  //     return;
  //   }


  //   this.todoService.addTodo(this.todos);
  //   this.todos.title = '';
  //   this.todos.id++ ;
  // }

}


