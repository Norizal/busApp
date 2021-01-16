import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { AlertControllerService } from "src/app/service/alert-controller.service";
import { Router } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-tab3",
  templateUrl: "./tab3.page.html",
  styleUrls: ["./tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  scannedCode: any;
  trip: any;

  organizationName: any;
  driverName: any;
  tripFrom: any;
  tripTo: any;
  tripStartTime: any;
  tripEndTime: any;
  plateNumber: any;

  qrCodeform = {
    form: null,
  };

  locationform = {
    form: null,
  };

  messageform = {
    form: null,
  };
  public isItemAvailable;

  items: any[] = [];

  constructor(
    private apiService: ApiService,
    private alertService: AlertControllerService,
    private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation
  ) {
    this.qrCodeform.form = "";
    this.locationform.form = "";
    this.messageform.form = "";
  }

  ngOnInit() {}

  scanCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.qrCodeform.form = barcodeData["text"];

      this.enterQr(this.qrCodeform.form);

      //this.qrCode = this.qrCodeform.form;
      // this.alertService.presentToast(barcodeData['text']);
      //this.loginQrBar();
    });
  }

  ionViewWillEnter() {
    this.qrCodeform.form = "";
    this.locationform.form = "";
    this.messageform.form = "";
    this.trip = "";
    this.organizationName = "";
    this.driverName = "";
    this.tripFrom = "";
    this.tripTo = "";
    this.tripStartTime = "";
    this.tripEndTime = "";
    this.plateNumber = "";

    this.initializeItems();
    this.isItemAvailable = false;
  }

  enterQr(form: NgForm) {
    // console.log("Qr code1", form.value.qrCode);
    // console.log("Qr code2", this.qrCodeform.form);
    // console.log("Qr code3", this.qrCode);

    if (this.qrCodeform.form == "" || this.qrCodeform.form == null) {
      this.alertService.presentToast("Please enter QR code number");
    } else {
      // console.log("Qr code", this.qrCode);

      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude

          this.locationform.form =
            resp.coords.latitude + "," + resp.coords.longitude;
        })
        .catch((error) => {
          console.log("Error getting location", error);
        });
      this.apiService.loginQRSOS(this.qrCodeform.form).subscribe(
        (data) => {
          if (data["error"] == false) {
            this.alertService.presentToast(data["message"]);
            this.trip = data["tripInfo"];
            this.trip.map((value) => {
              this.organizationName = value.organizationName;
              this.driverName = value.driverName;
              this.tripFrom = value.tripFrom;
              this.tripTo = value.tripTo;
              this.tripStartTime = value.tripStartTime;
              this.tripEndTime = value.tripEndTime;
              this.plateNumber = value.plateNumber;
            });
            console.log("trip", this.trip);
          } else {
            this.alertService.presentToast(data["error_message"]);
          }
        },
        (error) => {
          this.alertService.presentToast("error");
          console.log(error);
        }
      );
    }
  }

  sendMessage() {
    if (this.qrCodeform.form == "" || this.qrCodeform.form == null) {
      this.alertService.presentToast("Please enter QR code number");
    } else if (this.messageform.form == "" || this.messageform.form == null) {
      this.alertService.presentToast("Please enter your message");
    } else {
      this.apiService.loginQRSOS(this.qrCodeform.form).subscribe(
        (data) => {
          if (data["error"] == false) {
            this.apiService
              .sendMessage(
                this.organizationName,
                this.driverName,
                this.tripFrom,
                this.tripTo,
                this.tripStartTime,
                this.tripEndTime,
                this.plateNumber,
                this.locationform.form,
                this.messageform.form
              )
              .subscribe(
                (data) => {
                  if (data) {
                    this.alertService.presentToast("Message sent successfully");
                    this.qrCodeform.form = "";
                    this.locationform.form = "";
                    this.messageform.form = "";
                    this.trip = "";
                    this.organizationName = "";
                    this.driverName = "";
                    this.tripFrom = "";
                    this.tripTo = "";
                    this.tripStartTime = "";
                    this.tripEndTime = "";
                    this.plateNumber = "";

                    this.ionViewWillEnter();
                  }
                },
                (error) => {
                  this.alertService.presentToast("error");
                  console.log(error);
                }
              );
          } else {
            this.alertService.presentToast(data["error_message"]);
          }
        },
        (error) => {
          this.alertService.presentToast("error");
          console.log(error);
        }
      );
    }
  }

  initializeItems() {
    this.apiService.searchQR().subscribe((data) => {
      this.items = data["message"];
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return item.qrCode.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.ionViewWillEnter();
    }
  }

  qrcode(qrCode) {
    this.qrCodeform.form = qrCode;
    this.isItemAvailable = false;
    this.enterQr(this.qrCodeform.form);
  }
}
