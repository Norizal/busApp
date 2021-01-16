import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 
  subscribe:any;
  public type = 'password';
  public showPass = false;

  email = {
    form:null
  }
  password = {
    form:null
  }
  constructor(
    private apiService: ApiService,
    private alertService: AlertControllerService,
    private router: Router,
    public menu: MenuController,
    private statusBar: StatusBar,
    private platform: Platform,
  ) 
  { 
    this.email.form = "";
    this.password.form = "";
 }

  ngOnInit() {
  }

  ngAfterViewInit() { 
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
   }
  
  ngOnDestroy() { 
    this.backButtonSubscription.unsubscribe();
  }

  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
   }

   ionViewWillEnter() {
    this.statusBar.styleBlackTranslucent();  
    this.menu.enable(false);
  }
   

   register(){
    this.router.navigate(['register']);
  }

  
login(form: NgForm) {

  if(this.email.form == "" || this.email.form == null){
    this.alertService.presentToast("Sila masukkan email anda")
  }else if(this.password.form == "" || this.password.form == null){
    this.alertService.presentToast("Sila masukkan kata laluan")
  }else{
    
    console.log(form.value.email, form.value.password);
    this.apiService.login(form.value.email, form.value.password).subscribe(
      user => {

        if(user['error'] == true){
          this.alertService.presentToast(user['error_message']);
        }else {
          if(user['message']['update_password'] == 0){
            this.alertService.presentToast("Please update your password first");
            this.router.navigate(['update-password']);

          }else{
            this.alertService.presentToast("Sign in Successfully");
            this.router.navigate(['']);
            console.log("Login ", user['message']['type']);

          }
        }
        
      },
      error => {
        console.log(error);
      },
    );


  }
 
}

  

}
