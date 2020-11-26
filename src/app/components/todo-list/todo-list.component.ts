import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoTitle: string = '';
  idForTodo: number = 0;
  todos : Todo[] = [];
  beforeEditCache :string = '';
  filter: string = '';

  constructor() { }

  ngOnInit(): void {
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.filter = 'all';
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

  //Adding todos
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

  // Edit Todo by Double Click
    editTodo(todo: Todo) : void{
      this.beforeEditCache = todo.title;
      todo.editing = true;
    }

    doneEdit(todo:Todo):void{

      //case Of empty String
      if(todo.title.trim().length === 0){
        todo.title = this.beforeEditCache;
      }

      todo.editing = false;
    }

    // Cancel edit when we tap Echap
    cancelEdit(todo:Todo):void{
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }

  //Delete Todos using filter function to create a new todos array without Id passed on parametre
    deleteTodo(id: number): void{
     this.todos = this.todos.filter(todo => todo.id !== id);
    }

  //update Items left
    remaining(): number {
      return this.todos.filter(todo => !todo.completed).length;
    }

  //Display or not Clear Completed button
  atLeastOneItemCompleted() : boolean{
    return this.todos.filter(todo => todo.completed).length> 0;
  }

  //Clear Completed button functionnality
  clearCompleted() :void{
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  //Check All Items button functionnality
  clearAllTodos() :void{
    this.todos.forEach(todo => todo.completed = 
      (<HTMLInputElement> event?.target).checked)
  }

  //Todos Filtered { all , active, completed}
  todosFiltered(): Todo[]{
    if(this.filter === 'all'){
      return this.todos;
    }else if(this.filter === 'active'){
      return this.todos.filter(todo => !todo.completed)
    }else if(this.filter === 'completed'){
      return this.todos.filter(todo => todo.completed)
    }

    return this.todos;
  }

}


