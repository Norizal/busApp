import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private apiService : ApiService, 
    private alertService: AlertControllerService, 
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.apiService.logout(); 
    this.alertService.presentToast("Sign Out Successfully");
    this.router.navigate(['login']);
  }

  detail(){
    this.router.navigate(['profile']);

  }

  about(){
    this.router.navigate(['about']);
  }

  contact(){
    this.router.navigate(['contact']);
  }
}
