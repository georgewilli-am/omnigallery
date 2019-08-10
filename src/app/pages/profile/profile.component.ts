import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public username: Observable<string>;
  public logout: () => void;

  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.auth.localAuthSetup();
    this.logout = () => this.auth.logout();
    this.username = this.auth.getUser$().pipe(pluck('nickname'));
  }
}
