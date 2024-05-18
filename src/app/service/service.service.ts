import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  loginTo(data:any){
    return this.http.post(`${environment.url}/user-management/loginToApp`, data);
  }

  sendMessage(to: string, message: string): Observable<any> {
    return this.http.post(`${environment.url}/events-management/messages`, { to, message });
  }

  sendSMS(to: string, body: any) {
    return this.http.post(`${environment.url}/user-management/send`, { to, body });
  }

  getAllEvents(){
    return this.http.get(`${environment.url}/events-management/getAllEvents`); 
  }

  getEventsSearch(searchTerm : string){
    return this.http.get(`${environment.url}/events-management/getEventsSearch?search=` + searchTerm)
  }

  getEventMembersSearch(searchTerm : string, id:number){
    return this.http.get(`${environment.url}/events-management/getEventMembers/${id}Search?search==${searchTerm}`)
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

  getMemberById(id:number, eId:number){
    return this.http.get(`${environment.url}/events-management/getMemberById/${id}/${eId}`)
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
