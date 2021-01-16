import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { ApiService } from 'src/app/service/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public type = 'password';
  public type2 = 'password';
  public showPass = false;
  public showPass2 = false;

  

  name = {
    form: null
  }

  email = {
    form: null
  }

  phonenumber = {
    form: null
  }

  race = {
    form: null
  }

  gender = {
    form: null
  }
  password = {
    form: null
  }

  retrypassword = {
    form: null
  }

  constructor(private apiService: ApiService, private router: Router, private alertservice: AlertControllerService) { 
    this.name.form = "";
    this.password.form = "";
    this.race.form = "";
    this.email.form = "";
    this.retrypassword.form = "";
    this.phonenumber.form = "";
    this.gender.form = "";
  }

  ngOnInit() {
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  showPassword2() {
    this.showPass2 = !this.showPass2;
    if (this.showPass2) {
      this.type2 = 'text';
    } else {
      this.type2 = 'password';
    }
  }

  checkValueGender(value) {
    this.gender.form = value.srcElement.value;
  }

  checkValueRace(value) {
    this.race.form = value.srcElement.value;
  }

  register(form: NgForm) {



    if(form.value.name == null || form.value.name == ""){
      this.alertservice.presentToast("Please fill in your full name!");
    }else if(form.value.email == null || form.value.email == ""){
      this.alertservice.presentToast("Please fill in your email!");
    }else if(form.value.phonenumber == null || form.value.phonenumber == ""){
      this.alertservice.presentToast("Please fill in your phone number!");
    }else if(this.gender.form == null || this.gender.form == ""){
      this.alertservice.presentToast("Please choose your gender!");
    }else if(this.race.form == null || this.race.form == ""){
      this.alertservice.presentToast("Please choose your race!");
    }else if(form.value.password == null || form.value.password == ""){
      this.alertservice.presentToast("Please fill in your password!");
    }else if(form.value.retrypassword == null || form.value.retrypassword== ""){
      this.alertservice.presentToast("Please fill in your password confirmation!");
    }
    else if (form.value.password != form.value.retrypassword) {
      this.alertservice.presentToast("Password not match!")

    } else {
      // console.log("name", form.value.name);
      // console.log("email", form.value.email);
      // console.log("phonenumber", form.value.phonenumber);
      // console.log("race", this.race);
      // console.log("gender", this.gender);
    

    

      this.apiService.register(form.value.name, form.value.email, form.value.phonenumber, this.gender.form, this.race.form, form.value.password).subscribe(
        student => {
          if(student['error'] === true){
            this.alertservice.presentToast(student['error_message']);
          }else {
            this.alertservice.presentToast(student['message']);
            this.router.navigate(['login']);
            this.name.form = "";
            this.password.form = "";
            this.race.form = "";
            this.email.form = "";
            this.retrypassword.form = "";
            this.phonenumber.form = "";
            this.gender.form = "";
          }
        }

        
   
      );
    }

  }

}
