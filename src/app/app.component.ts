import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    name: string;
    imageUrl: string;
    email: string;
    checkLogin: boolean;

    constructor(private ngZone: NgZone) {
    }

    ngOnInit() {
        this.windowSignIn();
        this.windowSignOut();
    }

    windowSignIn() {
        window['onSignIn'] = (user) => this.ngZone.run(() => this.onSignIn(user));
    }

    windowSignOut() {
        window['signOut'] = () => this.ngZone.run(() => this.signOut());
    }

    onSignIn(googleUser) {
      let profile = googleUser.getBasicProfile();
      this.name = profile.getName();
      this.imageUrl = profile.getImageUrl();
      this.email = profile.getEmail();
      if(this.name)
          this.checkLogin = true;
    }

    signOut() {
      let gapi = window['gapi'];
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.disconnect();
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    }
}
