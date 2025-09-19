import { Component } from '@angular/core';
import {LogoComponent} from "../../../logo/logo.component";

@Component({
    selector: 'offbank-hero-section',
    standalone: true,
    templateUrl: './hero-section.component.html',
    imports: [
        LogoComponent
    ],
    styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
