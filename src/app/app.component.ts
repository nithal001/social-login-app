import { Component, NgZone } from '@angular/core';

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
        window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    }

    onSignIn(googleUser) {
      let profile = googleUser.getBasicProfile();
      this.name = profile.getName();
      this.imageUrl = profile.getImageUrl();
      this.email = profile.getEmail();
      if(this.name) {
          this.checkLogin = true;
      }
    }

    signOut() {
     //signout here
    }
}
