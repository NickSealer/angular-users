import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  apiUrl = 'http://localhost:3000/api/v1/';
  headers:any = null;
  userLogged:any = null;

  constructor(private http: HttpClient) { }

  createHeaders(){
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userLogged.api_token,
      })
    };
  }

  list(){
   // this.createHeaders();
   return this.http.get(this.apiUrl + 'users');
  }

  show(id: string){
    // this.createHeaders();
    return this.http.get(this.apiUrl + 'users/' + id);
  }

  delete(id: string){
    // this.createHeaders();
    return this.http.delete(this.apiUrl + 'users/' + id);
  }

  store(user){
    // this.createHeaders();
    return this.http.post(this.apiUrl + 'users', user);
  }

  update(user){
    // this.createHeaders();
    return this.http.put(this.apiUrl + 'users/' + user.id, user);
  }

  edit(id :string){
    return this.http.get(this.apiUrl + 'users/' + id + '/edit');
  }

}
