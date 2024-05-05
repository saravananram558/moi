import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  sendMessage(to: string, message: string): Observable<any> {
    return this.http.post(`${environment.url}/events-management/messages`, { to, message });
  }

  getAllEvents(){
    return this.http.get(`${environment.url}/events-management/getAllEvents`); 
  }

  addEvent(data:any){
    return this.http.post(`${environment.url}/events-management/addEvent`,data)
  }

  getAllMembers(id:number){
    return this.http.get(`${environment.url}/events-management/getEventMembers/${id}`); 
  }

  removeEventMember(id:number){
    return this.http.get(`${environment.url}/events-management/removeEventMember/${id}`); 
  }

  removeEvent(id:number){
    return this.http.get(`${environment.url}/events-management/removeEvent/${id}`); 
  }

  removeUser(id:number){
    return this.http.get(`${environment.url}/user-management/removeUser/${id}`); 
  }

  restoreEventMember(id:number){
    return this.http.get(`${environment.url}/events-management/restoreEventMember/${id}`); 
  }

  restoreEvent(id:number){
    return this.http.get(`${environment.url}/events-management/restoreEvent/${id}`); 
  }

  restoreUser(id:number){
    return this.http.get(`${environment.url}/user-management/restoreUser/${id}`); 
  }

  addMember(data:any){
    return this.http.post(`${environment.url}/events-management/addMember`,data)
  }

  updateMember(data:any){
    return this.http.post(`${environment.url}/events-management/updateMember`,data)
  }

  getAllUsers(){
    return this.http.get(`${environment.url}/user-management/getAllUsers`); 
  }

  addUser(data:any){
    return this.http.post(`${environment.url}/user-management/addUser`,data)
  }

  getDeletedUsers(){
    return this.http.get(`${environment.url}/user-management/getDeletedUsers`); 
  }

  getDeletedEvents(){
    return this.http.get(`${environment.url}/events-management/getDeletedEvents`); 
  }

  getDeletedEventmembers(){
    return this.http.get(`${environment.url}/events-management/getDeletedEventmembers`); 
  }

  getAllEventsChart(){
    return this.http.get(`${environment.url}/events-management/getAllEventsChart`); 
  }
}
