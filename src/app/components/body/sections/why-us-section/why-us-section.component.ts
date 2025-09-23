import {Component, Input} from '@angular/core';
import {comparisonData} from "./why-us.types";
import {SanitizePipe} from "../../../../pipes/sanitize.pipe";

@Component({
    selector: 'offkredyt-why-us-section',
    standalone: true,
    imports: [
        SanitizePipe
    ],
    templateUrl: './why-us-section.component.html',
    styleUrl: './why-us-section.component.scss'
})
export class WhyUsSectionComponent {
    @Input({ required: true }) isMobile: boolean | undefined;
    protected readonly comparisonData = comparisonData;
}
