import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {OPINIONS, Opinions} from "./opinions.types";
import {Swiper} from "swiper";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

@Component({
    selector: 'offbank-opinions-section',
    standalone: true,
    imports: [],
    templateUrl: './opinions-section.component.html',
    styleUrl: './opinions-section.component.scss'
})
export class OpinionsSectionComponent implements AfterViewInit, OnDestroy {
    @ViewChild('swiperContainer') swiperContainer!: ElementRef;
    @ViewChild('swiperPagination') swiperPagination!: ElementRef;
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

    public readonly opinions: Opinions[] = OPINIONS;
    swiper!: Swiper;

    ngAfterViewInit() {
        this.swiper = new Swiper(this.swiperContainer.nativeElement, {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 15000,
                disableOnInteraction: false,
            },
            pagination: {
                el: this.swiperPagination.nativeElement,
                clickable: true,
            }
        });

    }

    ngOnDestroy() {

    }

    getStarsArray(rating: number): boolean[] {
        return Array.from({length: 5}, (_, i) => i < rating);
    }


}
