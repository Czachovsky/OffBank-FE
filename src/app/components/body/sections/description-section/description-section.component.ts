import { Component } from '@angular/core';
import {LogoComponent} from "../../../logo/logo.component";

@Component({
  selector: 'offbank-description-section',
  standalone: true,
    imports: [
        LogoComponent
    ],
  templateUrl: './description-section.component.html',
  styleUrl: './description-section.component.scss'
})
export class DescriptionSectionComponent {

}
