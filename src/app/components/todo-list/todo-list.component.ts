import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoTitle: string = '';
  todos : object[] = [];
  constructor() { }

  ngOnInit(): void {
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

  addTodo(){
    this.todos.push({
      id: 4,
      title: this.todoTitle,
      completed:false,
      editing:false
    })
  }

}
