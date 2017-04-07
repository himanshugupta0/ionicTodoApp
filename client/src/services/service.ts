import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class ServicePage{

  constructor(private http: Http){}

  private todoUrl = 'http://localhost:3000/connect';
    
  getTodos(): Observable<any> {
    return this.http.get(this.todoUrl).map(res => res.json());
  }

  addTodo(message): Observable<any> {
    return this.http.post(this.todoUrl, message);
  }

  getTodo(message): Observable<any> {
    return this.http.get('http://localhost:3000/connect/${message._id}');
  }

  editTodo(message): Observable<any> {
    return this.http.put(`http://localhost:3000/connect/${message._id}`, message);
  }

  deleteTodo(message): Observable<any> {
     return this.http.delete(`http://localhost:3000/connect/${message._id}`);
  }

}