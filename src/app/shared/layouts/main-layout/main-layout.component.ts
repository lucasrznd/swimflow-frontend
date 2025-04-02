import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from "../../components/sidemenu/sidemenu.component";

@Component({
    selector: 'app-main-layout',
    imports: [SidemenuComponent, CommonModule, RouterModule],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
}
