import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { LoginService } from 'app/pages/shared/login.service';
import { SessionService } from 'app/shared/services/session.service';
import { Router } from '@angular/router';
import { ChannelService } from 'app/shared/services/channel.service';
import { ChannelData } from 'app/shared/models/channel-data.model';
import { ChannelTypeEnum } from 'app/shared/enums/channel-type.enum';
import { AuthService } from 'app/shared/services/auth.service';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
    path: '/unidades-medida',
    title: 'Unidades Medida',
    type: 'link',
    icontype: 'assignment'
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public loggedUser: any;
    public userName: string;

    constructor(
        public authService: AuthService,
        public sessionService: SessionService) {
        this.loggedUser = this.sessionService.getLoggedUser();
        this.userName = this.authService.userName();
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout() {
        const message = new ChannelData(ChannelTypeEnum.Logout);
        ChannelService.broadcast(message);
    }
}
