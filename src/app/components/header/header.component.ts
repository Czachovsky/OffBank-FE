import {Component, inject} from '@angular/core';
import {HeaderElements, HeaderProps, MenuElementsType} from "./header.types";
import {SanitizePipe} from "../../pipes/sanitize.pipe";
import {NgClass} from "@angular/common";
import {ScreenSizeService} from "../../services/screen-size.service";

@Component({
    selector: 'offbank-header',
    standalone: true,
    imports: [
        SanitizePipe,
        NgClass
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    public screen: ScreenSizeService = inject(ScreenSizeService);
    public readonly menuItems: HeaderProps[] = HeaderElements;
    public readonly MenuElementsType = MenuElementsType;
    public mobileMenuState: boolean = false;

    public openMobileMenu(): void {
        this.mobileMenuState = !this.mobileMenuState;
    }

    public scrollToElm(element: HTMLElement, offset = -90): void {
        const scrollHigh: number = element?.getBoundingClientRect().top + window.pageYOffset + offset;
        setTimeout(() => {
            window.scrollTo({top: scrollHigh, behavior: 'smooth'});
        }, 0);
    }

    public goTo(sectionKey: string, offset = -90, timeout = 0): void {
        setTimeout(() => {
            if (this.screen.isMobile()) {
                this.mobileMenuState = false;
            }
            const sectionElement = document.getElementById(`${sectionKey}`);
            this.scrollToElm(sectionElement!, offset);
        }, timeout);
    }
}
