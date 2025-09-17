import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
export class OpinionsSectionComponent implements AfterViewInit {
    @ViewChild('swiperContainer') swiperContainer!: ElementRef;
    @ViewChild('swiperPagination') swiperPagination!: ElementRef;
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

    getStarsArray(rating: number): boolean[] {
        return Array.from({length: 5}, (_, i) => i < rating);
    }
}
