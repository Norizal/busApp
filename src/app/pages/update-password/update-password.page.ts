import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  public type = 'password';
  public type2 = 'password';
  public showPass = false;
  public showPass2 = false;

  password = {
    form: null
  }

  retrypassword = {
    form: null
  }

  constructor(private apiService: ApiService, private router: Router, private alertservice: AlertControllerService) { 
    this.password.form = "";
    this.retrypassword.form = "";
  }

  ngOnInit() {
  }

  updatePassword(form: NgForm) {



    if(form.value.password == null || form.value.password == ""){
      this.alertservice.presentToast("Please fill in your password!");
    }else if(form.value.retrypassword == null || form.value.retrypassword== ""){
      this.alertservice.presentToast("Please fill in your password confirmation!");
    }
    else if (form.value.password != form.value.retrypassword) {
      this.alertservice.presentToast("Password not match!")

    } else {
      this.apiService.updatePassword(form.value.password).subscribe(
        student => {
          if(student['error'] === true){
            this.alertservice.presentToast(student['error_message']);
          }else {
            this.alertservice.presentToast(student['message']);
            this.router.navigate(['']);
            this.password.form = "";
            this.retrypassword.form = "";
          }
        }

        
   
      );
    }

  }

}
