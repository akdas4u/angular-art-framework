import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material';
import { LoginService } from 'app/pages/shared/login.service';
@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ],
    providers: [
        LoginService
    ]
})

export class NavbarModule {}
