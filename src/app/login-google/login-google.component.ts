import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
//declare const gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent {
  private clientId:string = '883827901969-js7iesmagmu16ume2c5gnq6p2iohhmov.apps.googleusercontent.com';
  public auth2: any;
  public name: string;
  public imageUrl: string;
  public email: string;
  public isLoggedIn: boolean;

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  ngOnInit() {
      this.loadApi();
  }

  public loadApi() {
      let gapi = window['gapi'];
      gapi.load('auth2', () => {
          this.zone.run(() => {
              this.auth2 = gapi.auth2.init({
                  client_id: this.clientId,
                  cookiepolicy: 'single_host_origin',
                  scope: 'profile'
              });
              this.signIn(this.element.nativeElement.firstChild);
          })
      });
  }

  public signIn(element) {
      this.zone.run(() => {
          this.auth2.attachClickHandler(element, {}, (googleUser) => {
              let that = this;
              let profile = googleUser.getBasicProfile();
              this.name = profile.getName();
              this.imageUrl = profile.getImageUrl();
              this.email = profile.getEmail();
              if(that.name)
                 this.isLoggedIn = true;
          }, (error) => {
            console.log(JSON.stringify(error, undefined, 2));
          });
        });
  }

}
