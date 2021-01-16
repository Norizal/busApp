import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AlertControllerService } from 'src/app/service/alert-controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profiles:any;
  name:any;
  email:any;
  gender:any;
  phonenumber:any;
  race:any;
  userType:any;


  constructor(private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getProfile();

  }

  getProfile(){
    this.apiService.getProfile().subscribe(
      data => {
        if (data) {

          this.userType = data["userType"];
          
          if(data["userType"] == 1){
            this.profiles = data["data"]

            this.name = data["data"]['name'];
            this.email = data["data"]['email'];
            this.phonenumber = data["data"]['phonenumber'];
          
          }else if(data["userType"] == 2){
            this.profiles = data["data"]

            this.name = data["data"]['name'];
            this.email = data["data"]['email'];
            this.phonenumber = data["data"]['phonenumber'];
            this.gender = data["data"]['gender'];
            this.race = data["data"]['race'];

          }else if(data["userType"] == 3){
            this.profiles = data["data"]

            this.name = data["data"]['name'];
            this.email = data["data"]['email'];
            this.phonenumber = data["data"]['phonenumber'];
            this.gender = data["data"]['gender'];
            this.race = data["data"]['race'];


            // this.profiles.map(value =>{
            //   this.name = value.name;
            //   this.email = value.email;
            //   this.phonenumber = value.phonenumber;
            //   this.gender = value.gender;
            //   this.race = value.race;
            // });
          }
        }
      });
  }

  update(){

    let navigationExtras: NavigationExtras = {
      state: {
        name: this.name,
        email: this.email,
        phonenumber: this.phonenumber,
        gender: this.gender,
        race: this.race,
        userType: this.userType
      }
    };
    this.router.navigate(['profileupdate'], navigationExtras);
  }

  updatePassword(){
    this.router.navigate(['profilepassword']);
  }

}
