import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({ 
  providedIn: 'root'
})
export class TodoService {

  todoTitle: string='';
  idForTodo: number= 0;
  beforeEditCache :string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  //todosCollection!: AngularFirestoreCollection<Todo>;
  //todoDoc!: AngularFirestoreDocument<Todo>;

  todos: Todo[] = [];
  

  constructor() {
    // recuperer les todos via localStorage
    this.todos = JSON.parse(localStorage.getItem('todos')|| '{}');
    this.idForTodo++;

    // Initialisation with firebase
    /*
     this.todosCollection = this.afs.collection('Todos');
     this.todos = this.getTodos();
     */
   }
 
   // Get Todos from Firebase
   /*
   getTodos(): any{
    this.afs.collection('Todos').valueChanges().subscribe((res:any) =>{
      this.todos = res; 
    });
   }*/

  
  //Adding todos with firebase
  /*
  addTodo(todo:Todo) {
      todo.id = this.idForTodo;
      this.todosCollection.add(todo);
      this.idForTodo++;
    }
    */

 

  //Add Todos with LocalStorage
  addTodo(todoTitle:string): void{
    if(todoTitle.trim().length === 0){
      return;
    }
    
    if(localStorage.getItem('todos') == null){
      
      this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed:false,
      editing:false
    })
    localStorage.setItem('todos', JSON.stringify(this.todos));
    } else{
      this.todos = JSON.parse(localStorage.getItem('todos')|| '{}');
      this.todos.push({
        id: this.idForTodo,
        title: todoTitle,
        completed:false,
        editing:false
      })
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    this.idForTodo++;
  }
  

  // Edit Todo by Double Click
    editTodo(todo: Todo) : void{
      this.beforeEditCache = todo.title;
      todo.editing = true;
    }

    // Upgrade Todos with localStorage
    doneEdit(todo:Todo):void{

      //case Of empty String
      if(todo.title.trim().length === 0){
        todo.title = this.beforeEditCache;
      }
      
      this.anyRemainingModel = this.anyRemaining();
      todo.editing = false;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Cancel edit when we tap Echap
    cancelEdit(todo:Todo):void{
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }

  //Delete Todos  using filter function to create a new todos array without Id passed on parametre
    deleteTodo(id:number){
       this.todos = this.todos.filter((todo)=>todo.id !== id)
       localStorage.setItem('todos', JSON.stringify(this.todos));
      // this.todoDoc = this.afs.doc(`Todos/${id}`);
      // this.todoDoc.delete();

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

  anyRemaining(): boolean {
    return this.remaining() !== 0;
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
