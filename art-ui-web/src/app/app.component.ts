import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ChannelService } from './shared/services/channel.service';
import { ChannelData } from './shared/models/channel-data.model';
import { ChannelTypeEnum } from './shared/enums/channel-type.enum';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(
    private router: Router,
    public authService: AuthService) {

    ChannelService.watch().subscribe((message: ChannelData) => {
      if (message) {
        switch (message.type) {
          case ChannelTypeEnum.Unknow:
            break;
          case ChannelTypeEnum.Logout:
            this.authService.logout();
            this.router.navigateByUrl('/pages/login');
            break;
          default:
            break;
        }
      }
    });
  }

  ngOnInit() {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      const body = document.getElementsByTagName('body')[0];
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
        modalBackdrop.remove();
      }
    });
  }
}
