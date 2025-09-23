import {Component} from '@angular/core';
import {LogoComponent} from "../../../logo/logo.component";

@Component({
    selector: 'offkredyt-hero-section',
    standalone: true,
    templateUrl: './hero-section.component.html',
    imports: [
        LogoComponent
    ],
    styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
    public scrollToElm(element: HTMLElement, offset = -90): void {
        const scrollHigh: number = element?.getBoundingClientRect().top + window.pageYOffset + offset;
        setTimeout(() => {
            window.scrollTo({top: scrollHigh, behavior: 'smooth'});
        }, 0);
    }

    public goTo(offset = -90, timeout = 0): void {
        setTimeout(() => {
            const sectionElement = document.getElementById('how-it-works');
            this.scrollToElm(sectionElement!, offset);
        }, timeout);
    }
}
