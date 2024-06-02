import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';  
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';  
import { map, take } from 'rxjs/operators';  
import { AngularFireAuth } from '@angular/fire/compat/auth';
  
export interface Todo {  
  id?: string;  
  name: string;  
  notes: string;  
}  

export interface Login {  
  userName: string;  
  password: string;  
}  

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private todos: Observable<Todo[]>;  
  private todoCollection: AngularFirestoreCollection<Todo>;
  private logins: Observable<Login[]>;  
  private loginCollection: AngularFirestoreCollection<Login>;  
  
  constructor(private db: AngularFirestore) {  
    this.todoCollection = this.db.collection<Todo>('user'); 
    this.loginCollection = this.db.collection<Login>('register');  
    this.todos = this.todoCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
    this.logins = this.loginCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );  
  }  

  loginTo(loginPayload: Login) {
    return this.loginCollection.add(loginPayload);
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
  
  // addTodo(todo: Todo): Promise<DocumentReference> { 
  //   console.log(todo,'todo checks') 
  //   return this.todoCollection.add(todo);  
  // }  
  
  // updateTodo(todo: Todo): Promise<void> {  
  //   return this.todoCollection.doc(todo.id).update({ name: todo.name, notes: todo.notes });  
  // }  
  
  // deleteTodo(id: string): Promise<void> {  
  //   return this.todoCollection.doc(id).delete();  
  // }  
}