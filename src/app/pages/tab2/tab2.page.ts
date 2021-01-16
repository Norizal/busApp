import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AlertControllerService } from 'src/app/service/alert-controller.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  historyData:[];
  userType:any;

  constructor(private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.historyResult();

  }

  historyResult(){

    this.apiService.getResult().subscribe(
      data => {
        if (data) {
          if (data["error"] == true) {
            this.alertService.presentToast(data['error_message']);

          } else {
            this.historyData = data["data"]
            this.userType = data["userType"]
            console.log(this.historyData)
          }
        }
      });
  }

  viewInfo(item){
    if(this.userType == 1){
      let navigationExtras: NavigationExtras = {
        state: {
          userType: this.userType,
          statusOrganizationId: item.statusOrganizationId
        }
      };
  
      this.router.navigate(['result'], navigationExtras);

    }else if(this.userType == 2){
      let navigationExtras: NavigationExtras = {
        state: {
          userType: this.userType,
          statusDriverId: item.statusDriverId
        }
      };
  
      this.router.navigate(['resultdriver'], navigationExtras);
    }else{
      let navigationExtras: NavigationExtras = {
        state: {
          userType: this.userType,
          statusPassengerId: item.statusPassengerId
        }
      };
  
      this.router.navigate(['resultpassenger'], navigationExtras);
    }

  }

}
