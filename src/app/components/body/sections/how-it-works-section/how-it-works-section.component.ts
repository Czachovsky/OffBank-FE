import { Component} from '@angular/core';
import {HowItWorks, howItWorksSection} from "./how-it-works.types";
import {SanitizePipe} from "../../../../pipes/sanitize.pipe";
import {NgClass} from "@angular/common";
import {AutoplayVideoComponent} from "../../../autoplay-video/autoplay-video.component";

@Component({
    selector: 'offkredyt-how-it-works-section',
    standalone: true,
    imports: [
        SanitizePipe,
        NgClass,
        AutoplayVideoComponent
    ],
    templateUrl: './how-it-works-section.component.html',
    styleUrl: './how-it-works-section.component.scss'
})
export class HowItWorksSectionComponent{
    public readonly howItWorks: HowItWorks[] = howItWorksSection;

}
