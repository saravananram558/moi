import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

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
}
