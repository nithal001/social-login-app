import { Component, OnInit, ElementRef, NgZone, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements AfterViewInit {
  private clientId:string = '883827901969-js7iesmagmu16ume2c5gnq6p2iohhmov.apps.googleusercontent.com';
  private scope = [
      'profile ',
      'email ',
  ].join('');
  public auth2: any;
  public name: string;
  public imageUrl: string;
  public email: string;
  public isLoggedIn: boolean = false;

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  ngOnInit() {
      this.windowSignOut();
  }

  ngAfterViewInit() {
      this.loadApi();
  }

  public windowSignOut() {
      window['signOut'] = () => this.zone.run(() => this.signOut());
  }

  public loadApi() {
      let gapi = window['gapi'];
      gapi.load('auth2', () => {
          this.zone.run(() => {
              this.auth2 = gapi.auth2.init({
                  client_id: this.clientId,
                  scope: this.scope
              });
              let googleBtn = document.getElementById('customBtn');
              this.signIn(googleBtn);
          });
      });
  }

  public signIn(element) {
      this.zone.run(() => {
          this.auth2.attachClickHandler(element, {}, (googleUser) => {
              let profile = googleUser.getBasicProfile();
              this.name = profile.getName();
              this.imageUrl = profile.getImageUrl();
              this.email = profile.getEmail();
              if(this.name)
                 this.isLoggedIn = true;
          }, (error) => {
            console.log(JSON.stringify(error, undefined, 2));
          });
        });
  }

  public signOut() {
      let gapi = window['gapi'];
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
         console.log('User signed out.');
      });
      this.isLoggedIn = false;
  }

}
