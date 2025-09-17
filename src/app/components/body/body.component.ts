import {Component, inject} from '@angular/core';
import {HeroSectionComponent} from "./sections/hero-section/hero-section.component";
import {MovieSectionComponent} from "./sections/movie-section/movie-section.component";
import {WhyUsSectionComponent} from "./sections/why-us-section/why-us-section.component";
import {HowItWorksSectionComponent} from "./sections/how-it-works-section/how-it-works-section.component";
import {YourDecisionSectionComponent} from "./sections/your-decision-section/your-decision-section.component";
import {OpinionsSectionComponent} from "./sections/opinions-section/opinions-section.component";
import {DescriptionSectionComponent} from "./sections/description-section/description-section.component";
import {DownloadSectionComponent} from "./sections/download-section/download-section.component";
import {FaqSectionComponent} from "./sections/faq-section/faq-section.component";
import {ScreenSizeService} from "../../services/screen-size.service";
import {TrustUsComponent} from "./sections/trust-us/trust-us.component";

@Component({
  selector: 'offbank-body',
  standalone: true,
    imports: [
        HeroSectionComponent,
        MovieSectionComponent,
        WhyUsSectionComponent,
        HowItWorksSectionComponent,
        YourDecisionSectionComponent,
        OpinionsSectionComponent,
        DescriptionSectionComponent,
        DownloadSectionComponent,
        FaqSectionComponent,
        TrustUsComponent
    ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  protected readonly screenService = inject(ScreenSizeService);
}
