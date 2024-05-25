import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';  
import { map, take } from 'rxjs/operators';  
  
export interface Todo {  
  id?: string;  
  name: string;  
  notes: string;  
}  

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private todos: Observable<Todo[]>;  
  private todoCollection: AngularFirestoreCollection<Todo>;  
  
  constructor(private db: AngularFirestore) {  
    this.todoCollection = this.db.collection<Todo>('user');  
    this.todos = this.todoCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );  
  }  
  
  getTodos(): Observable<Todo[]> {  
    return this.todos;  
  }  
  
  getTodo(id: string){  
    return this.todoCollection.doc<Todo>(id).valueChanges().pipe(  
      take(1),  
      map(todo => {  
        if(todo){
          todo.id = id;  
          return todo;  
        }
        else{
          return null
        }
       
      })  
    );  
  }  
  
  addTodo(todo: Todo): Promise<DocumentReference> { 
    console.log(todo,'todo checks') 
    return this.todoCollection.add(todo);  
  }  
  
  updateTodo(todo: Todo): Promise<void> {  
    return this.todoCollection.doc(todo.id).update({ name: todo.name, notes: todo.notes });  
  }  
  
  deleteTodo(id: string): Promise<void> {  
    return this.todoCollection.doc(id).delete();  
  }  
}
