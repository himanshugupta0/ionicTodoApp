import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  messages = [];
  isLoading = true;
  isEditing = false;
  message: any;
  editMsg = '';

  addTodoForm: FormGroup;
  msg = new FormControl('',Validators.required);

  constructor(public navCtrl: NavController, public servicePage: ServicePage, private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.getTodos();
    this.addTodoForm = this.formBuilder.group({
      msg: this.msg
    });
  }

  getTodos(){
    this.servicePage.getTodos().subscribe(
      data => this.messages = data,
      error => console.log(error)
    );
  }

  addTodo(){
    this.servicePage.addTodo(this.addTodoForm.value).subscribe(
      res => {
        var newMessage = res.json();
        this.messages.push(newMessage);
        this.addTodoForm.reset();
      },
      error => console.log(error)
    );
  }

  enableEditing(message){
    this.isEditing = true;
    this.message = message;
    this.editMsg = message.message;
  }

  cancelEditing() {
    this.isEditing = false;
    this.message = {};
    this.getTodos();
  }

  editTodo(editMsg){
    this.message.message = this.editMsg;
    this.servicePage.editTodo(this.message).subscribe(
      res => {
        this.isEditing = false;
        this.message = editMsg;
      },
      error => console.log(error)
    );
  }

  deleteTodo(message) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.servicePage.deleteTodo(message).subscribe(
        res => {
          var pos = this.messages.map(elem => { return elem._id; }).indexOf(message._id);
          this.messages.splice(pos, 1);
        },
        error => console.log(error)
      );
    }
  }


}
