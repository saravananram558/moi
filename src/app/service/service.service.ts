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

  addMember(data:any){
    return this.http.post(`${environment.url}/events-management/addMember`,data)
  }

  getAllUsers(){
    return this.http.get(`${environment.url}/user-management/getAllUsers`); 
  }

  addUser(data:any){
    return this.http.post(`${environment.url}/user-management/addUser`,data)
  }
}
