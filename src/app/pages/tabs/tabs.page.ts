import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.apiService.getToken().then(() => {
      if(this.apiService.isLoggedIn == false) {
        this.router.navigate(['login']);
      }
    });
  }

}
