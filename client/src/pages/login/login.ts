import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {HomePage} from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  constructor(public navCtrl: NavController) {}

  onSubmit(username){
    if(username != null){
      username = '';
      this.navCtrl.push(HomePage);
      }
  }

}
