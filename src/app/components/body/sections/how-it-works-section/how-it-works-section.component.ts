import {Component} from '@angular/core';
import {HowItWorks, howItWorksSection} from "./how-it-works.types";
import {comparisonData} from "../why-us-section/why-us.types";
import {SanitizePipe} from "../../../../pipes/sanitize.pipe";
import {NgClass} from "@angular/common";

@Component({
    selector: 'offbank-how-it-works-section',
    standalone: true,
    imports: [
        SanitizePipe,
        NgClass
    ],
    templateUrl: './how-it-works-section.component.html',
    styleUrl: './how-it-works-section.component.scss'
})
export class HowItWorksSectionComponent {
    public readonly howItWorks: HowItWorks[] = howItWorksSection;
}
