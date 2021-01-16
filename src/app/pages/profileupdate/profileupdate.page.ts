import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.page.html',
  styleUrls: ['./profileupdate.page.scss'],
})
export class ProfileupdatePage implements OnInit {

  name:any;
  email:any;
  gender:any;
  phonenumber:any;
  race:any;
  userType:any;

  nameform = {
    form: null
  }

  emailform = {
    form: null
  }

  phonenumberform = {
    form: null
  }

  raceform = {
    form: null
  }

  genderform = {
    form: null
  }

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private alertservice: AlertControllerService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.name = this.router.getCurrentNavigation().extras.state.name;
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.phonenumber = this.router.getCurrentNavigation().extras.state.phonenumber;
        this.gender = this.router.getCurrentNavigation().extras.state.gender;
        this.race = this.router.getCurrentNavigation().extras.state.race;  
        this.userType = this.router.getCurrentNavigation().extras.state.userType;  
      }
    });
    this.nameform.form = "";
    this.raceform.form = "";
    this.emailform.form = "";
    this.phonenumberform.form = "";
    this.genderform.form = "";

    
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.nameform.form = this.name;
    this.raceform.form = this.race;
    this.emailform.form = this.email;
    this.phonenumberform.form = this.phonenumber;
    this.genderform.form = this.gender;

  }

  checkValueGender(value) {
    this.gender.form = value.srcElement.value;
  }

  checkValueRace(value) {
    this.race.form = value.srcElement.value;
  }

  update(form: NgForm) {

    if(this.userType == 1){
      if(form.value.name == null || form.value.name == ""){
        this.alertservice.presentToast("Please fill in your full name!");
      }else if(form.value.phonenumber == null || form.value.phonenumber == ""){
        this.alertservice.presentToast("Please fill in your phone number!");
      } else {
        console.log("name", form.value.name);
        console.log("phonenumber", form.value.phonenumber);
        
  
        this.apiService.updateProfileOrganization(form.value.name, form.value.phonenumber).subscribe(
          data => {
            if(data['error'] === true){
              this.alertservice.presentToast(data['error_message']);
            }else {
              this.alertservice.presentToast(data['message']);
              this.router.navigate(['profile']);
              this.nameform.form = "";
              this.phonenumberform.form = "";
            }
          }
        );
  
      }

    }else if(this.userType == 2){
      if(form.value.name == null || form.value.name == ""){
        this.alertservice.presentToast("Please fill in your full name!");
      }else if(form.value.phonenumber == null || form.value.phonenumber == ""){
        this.alertservice.presentToast("Please fill in your phone number!");
      }else if(this.genderform.form == null || this.genderform.form == ""){
        this.alertservice.presentToast("Please choose your gender!");
      }else if(this.raceform.form == null || this.raceform.form == ""){
        this.alertservice.presentToast("Please choose your race!");
      } else {
        console.log("name", form.value.name);
        console.log("phonenumber", form.value.phonenumber);
        console.log("race", this.race);
        console.log("gender", this.gender);
  
        this.apiService.updateProfileDriver(form.value.name, form.value.phonenumber, this.genderform.form, this.raceform.form).subscribe(
          data => {
            if(data['error'] === true){
              this.alertservice.presentToast(data['error_message']);
            }else {
              this.alertservice.presentToast(data['message']);
              this.router.navigate(['profile']);
              this.nameform.form = "";
              this.raceform.form = "";
              this.phonenumberform.form = "";
              this.genderform.form = "";
            }
          }
        );
  
      }

    }else {
      if(form.value.name == null || form.value.name == ""){
        this.alertservice.presentToast("Please fill in your full name!");
      }else if(form.value.phonenumber == null || form.value.phonenumber == ""){
        this.alertservice.presentToast("Please fill in your phone number!");
      }else if(this.genderform.form == null || this.genderform.form == ""){
        this.alertservice.presentToast("Please choose your gender!");
      }else if(this.raceform.form == null || this.raceform.form == ""){
        this.alertservice.presentToast("Please choose your race!");
      } else {
        console.log("name", form.value.name);
        console.log("phonenumber", form.value.phonenumber);
        console.log("race", this.race);
        console.log("gender", this.gender);
  
        this.apiService.updateProfilePassenger(form.value.name, form.value.phonenumber, this.genderform.form, this.raceform.form).subscribe(
          data => {
            if(data['error'] === true){
              this.alertservice.presentToast(data['error_message']);
            }else {
              this.alertservice.presentToast(data['message']);
              this.router.navigate(['profile']);
              this.nameform.form = "";
              this.raceform.form = "";
              this.phonenumberform.form = "";
              this.genderform.form = "";
            }
          }
        );
  
      }

    }

    
    }

  

}
