import { Component } from '@angular/core';
import {AutoplayVideoComponent} from "../../../autoplay-video/autoplay-video.component";

@Component({
  selector: 'offbank-your-decision-section',
  standalone: true,
    imports: [
        AutoplayVideoComponent
    ],
  templateUrl: './your-decision-section.component.html',
  styleUrl: './your-decision-section.component.scss'
})
export class YourDecisionSectionComponent {

}
