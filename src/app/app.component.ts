import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'omni-gallery';

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.localAuthSetup();
  }

  public login() {
    return () => this.auth.login();
  }
}
