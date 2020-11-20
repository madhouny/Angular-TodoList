import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoTitle: string = '';
  idForTodo: number = 0;
  todos : object[] = [];
  constructor() { }

  ngOnInit(): void {
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Finish Angular Screencast',
        'completed': false,
        'editing':false 
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing':false 
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing':false 
      },
    ];
  }

  addTodo(): void{
    if(this.todoTitle.trim().length === 0){
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed:false,
      editing:false
    })

    //Clear input and increment IDS
    this.todoTitle = '';
    this.idForTodo++;
  
  }
}
