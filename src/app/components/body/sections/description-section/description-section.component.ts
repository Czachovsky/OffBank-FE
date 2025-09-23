import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {LogoComponent} from "../../../logo/logo.component";

@Component({
    selector: 'offkredyt-description-section',
    standalone: true,
    imports: [
        LogoComponent
    ],
    templateUrl: './description-section.component.html',
    styleUrl: './description-section.component.scss'
})
export class DescriptionSectionComponent {
    @ViewChildren('parallaxElement') parallaxElements!: QueryList<ElementRef>;

    private maxOffset = 50;

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (!this.parallaxElements) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Oblicz przesunięcie względem centrum
        const deltaX = (event.clientX - centerX) / centerX; // wartość od -1 do 1
        const deltaY = (event.clientY - centerY) / centerY; // wartość od -1 do 1

        this.parallaxElements.forEach((element) => {
            const span = element.nativeElement;
            const value = parseInt(span.getAttribute('data-value') || '0', 10);

            // Ograniczenie zakresu ruchu
            const moveX = Math.max(-this.maxOffset, Math.min(this.maxOffset, deltaX * value));
            const moveY = Math.max(-this.maxOffset, Math.min(this.maxOffset, deltaY * value));

            span.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

}
