import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { EnvService } from "./env.service";
import { AlertController } from "@ionic/angular";
import { AlertControllerService } from "./alert-controller.service";
import { Router } from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  data = [];
  isLoggedIn = false;
  token: any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private alertController: AlertController,
    private alertService: AlertControllerService,
    private router: Router
  ) {}

  ////Register API part /////

  register(
    name: string,
    email: string,
    phonenumber: string,
    gender: string,
    race: string,
    password: string
  ) {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "registerUser",
        {
          name: name,
          email: email,
          phonenumber: phonenumber,
          gender: gender,
          race: race,
          password: password,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log(data);
          return data;
        }),
        catchError((e) => {
          console.log("error register", e);
          let status = e.status;
          if (status === 401) {
            // this.showAlert(e['statusText']);
            this.router.navigate(["register"]);
            this.alertService.presentToast(
              e["error"]["error_message"]["email"]
            );
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Login API part //////
  login(email: string, password: string) {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "loginUser",
        {
          email: email,
          password: password,
        },
        { headers: headers }
      )
      .pipe(
        tap((token) => {
          console.log(token);
          if (token["error"] == true) {
            this.alertService.presentToast(token["error_message"]);
          } else {
            this.storage.setItem("token", token).then(
              () => {
                console.log("Token Stored");
                console.log("token", token["message"]);
              },
              (error) => console.log("Error storing item", error)
            );
            this.token = token;
            this.isLoggedIn = true;

            return token;
          }
        }),
        catchError((e) => {
          console.log("error login", e);
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }

  ///Logout part //////

  logout() {
    this.storage.remove("token");
    this.isLoggedIn = false;
    this.storage.clear();
    delete this.token;
  }

  ///Store token part //////

  getToken() {
    return this.storage.getItem("token").then(
      (data) => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      (error) => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

  ///Barcode part //////

  loginQR($qrCode) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "loginQr",
        {
          qrCode: $qrCode,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Search Barcode Number part //////

  searchQR() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "searchQr", { headers: headers })
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Barcode part //////

  loginQRSOS($qrCode) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "loginQrSOS",
        {
          qrCode: $qrCode,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Update password part //////

  updatePassword($password) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "updatePassword",
        {
          password: $password,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Update profile passenger //////

  updateProfilePassenger($name, $gender, $race, $phonenumber) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "updateProfileUser",
        {
          name: $name,
          gender: $gender,
          race: $race,
          phonenumber: "+60" + $phonenumber,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            //this.showAlert(e['statusText']);
            // this.router.navigate(['profile']);
            // this.alertService.presentToast(e['error']['error_message']['email']);
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Update profile driver //////

  updateProfileDriver($name, $gender, $race, $phonenumber) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "updateProfileUser",
        {
          name: $name,
          gender: $gender,
          race: $race,
          phonenumber: "+60" + $phonenumber,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            //this.showAlert(e['statusText']);
            // this.router.navigate(['profile']);
            // this.alertService.presentToast(e['error']['error_message']['email']);
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Update profile organization //////

  updateProfileOrganization($name, $phonenumber) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "updateProfileUser",
        {
          name: $name,
          phonenumber: "+60" + $phonenumber,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            //this.showAlert(e['statusText']);
            // this.router.navigate(['profile']);
            // this.alertService.presentToast(e['error']['error_message']['email']);
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///get Profile//////

  getProfile() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "getProfileUser", { headers: headers })
      .pipe(
        tap((data) => {
          console.log("Data", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///send Message to Telegram //////

  sendMessage(
    $organizationName,
    $driverName,
    $tripFrom,
    $tripTo,
    $tripStartTime,
    $tripEndTime,
    $plateNumber,
    $location,
    $message
  ) {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        "https://api.telegram.org/bot929620432:AAHlc9F_cDmhYr9TM4WgaueQEfrAcAvegIc/sendMessage?chat_id=-330297074&text=" +
          "From <b>" +
          this.token["message"]["name"] +
          "</b> phonenumber <b>" +
          this.token["message"]["phonenumber"] +
          "</b>. Location gps <b>" +
          $location +
          "</b>. Reported Message <b>" +
          $message +
          "</b>. Company <b>" +
          $organizationName +
          "</b> plate number <b>" +
          $plateNumber +
          "</b> on driver <b>" +
          $driverName +
          "</b>. Trip from " +
          $tripFrom +
          " at " +
          $tripStartTime +
          " to " +
          $tripTo +
          " expected arrive on " +
          $tripEndTime +
          "&parse_mode=html",
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Driver question //////

  getDriverQuestion() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "getQuestionDriver", { headers: headers })
      .pipe(
        tap((data) => {
          console.log("List Question", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Organization question //////

  getOrganizationQuestion() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "getQuestionOrganization", { headers: headers })
      .pipe(
        tap((data) => {
          console.log("List Question", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Driver question //////

  getPassengerQuestion() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "getQuestionPassenger", { headers: headers })
      .pipe(
        tap((data) => {
          console.log("List Question", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///send result Passenger//

  sendresultPassenger(
    q1: number,
    q2: number,
    q3: number,
    q4: number,
    q5: number,
    q6: number,

    a1: number,
    a2: number,
    a3: number,
    a4: number,
    a5: number,
    a6: number,

    tripId: string
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "submitResultPassenger",
        {
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5: q5,
          q6: q6,
          a1: a1,
          a2: a2,
          a3: a3,
          a4: a4,
          a5: a5,
          a6: a6,
          tripId: tripId,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///send result Driver//

  sendresultDriver(
    q1: number,
    q2: number,
    q3: number,
    q4: number,
    q5: number,
    q6: number,

    a1: number,
    a2: number,
    a3: number,
    a4: number,
    a5: number,
    a6: number,

    tripId: string
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "submitResultDriver",
        {
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5: q5,
          q6: q6,

          a1: a1,
          a2: a2,
          a3: a3,
          a4: a4,
          a5: a5,
          a6: a6,

          tripId: tripId,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///send result Organization//

  sendresultOrganization(
    q1: number,
    q2: number,
    q3: number,
    q4: number,
    q5: number,
    q6: number,
    q7: number,
    q8: number,
    q9: number,
    q10: number,

    a1: number,
    a2: number,
    a3: number,
    a4: number,
    a5: number,
    a6: number,
    a7: number,
    a8: number,
    a9: number,
    a10: number,
    tripId: string
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .post(
        this.env.API_URL + "submitResultOrganization",
        {
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5: q5,
          q6: q6,
          q7: q7,
          q8: q8,
          q9: q9,
          q10: q10,

          a1: a1,
          a2: a2,
          a3: a3,
          a4: a4,
          a5: a5,
          a6: a6,
          a7: a7,
          a8: a8,
          a9: a9,
          a10: a10,

          tripId: tripId,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("result", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Result //////

  getResult() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });

    if (this.token["message"]["type"] == 1) {
      return this.http
        .get(this.env.API_URL + "getResultOrganization", { headers: headers })
        .pipe(
          tap((data) => {
            console.log("List History", data);
            return data;
          }),
          catchError((e) => {
            let status = e.status;
            if (status === 401) {
              this.showAlert(e["statusText"]);
              this.router.navigate(["login"]);
              this.logout();
            }
            if (status === 0) {
              this.alertService.presentToast("Connection error");
            }
            throw new Error(e);
          })
        );
    } else if (this.token["message"]["type"] == 2) {
      return this.http
        .get(this.env.API_URL + "getResultDriver", { headers: headers })
        .pipe(
          tap((data) => {
            console.log("List History", data);
            return data;
          }),
          catchError((e) => {
            let status = e.status;
            if (status === 401) {
              this.showAlert(e["statusText"]);
              this.router.navigate(["login"]);
              this.logout();
            }
            if (status === 0) {
              this.alertService.presentToast("Connection error");
            }
            throw new Error(e);
          })
        );
    } else {
      return this.http
        .get(this.env.API_URL + "getResultPassenger", { headers: headers })
        .pipe(
          tap((data) => {
            console.log("List History", data);
            return data;
          }),
          catchError((e) => {
            let status = e.status;
            if (status === 401) {
              this.showAlert(e["statusText"]);
              this.router.navigate(["login"]);
              this.logout();
            }
            if (status === 0) {
              this.alertService.presentToast("Connection error");
            }
            throw new Error(e);
          })
        );
    }
  }

  ///Result Detail Organization //////

  getResultDetailOrganization($statusOrganizationId) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(
        this.env.API_URL +
          "getResultOrganizationDetail/" +
          $statusOrganizationId,
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Data", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Result Detail Driver //////

  getResultDetailDriver($statusDriverId) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(this.env.API_URL + "getResultDriverDetail/" + $statusDriverId, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          console.log("Data", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }

  ///Result Detail Driver //////

  getResultDetailPassenger($statusPassengerId) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token["message"]["token"],
      "Content-type": "application/json",
      Accept: "application/json",
    });
    return this.http
      .get(
        this.env.API_URL + "getResultPassengerDetail/" + $statusPassengerId,
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log("Data", data);
          return data;
        }),
        catchError((e) => {
          let status = e.status;
          if (status === 401) {
            this.showAlert(e["statusText"]);
            this.router.navigate(["login"]);
            this.logout();
          }
          if (status === 0) {
            this.alertService.presentToast("Connection error");
          }
          throw new Error(e);
        })
      );
  }
}
