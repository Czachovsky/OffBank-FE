import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Swiper} from "swiper";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

import {SlideModel, slides} from "./slides";

import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LogoComponent} from "../../../logo/logo.component";


@Component({
    selector: 'offkredyt-trust-us',
    standalone: true,
    templateUrl: './trust-us.component.html',
    styleUrl: './trust-us.component.scss',
    imports: [
        LogoComponent
    ],
    animations: [
        trigger('slideAnimation', [
            state('current', style({
                opacity: 1,
                transform: 'translateX(0) scale(1)',
                zIndex: 10
            })),
            state('previous', style({
                opacity: 0,
                transform: 'translateX(-100%) scale(0.8)',
                zIndex: 0
            })),
            state('next', style({
                opacity: 0,
                transform: 'translateX(100%) scale(0.8)',
                zIndex: 0
            })),
            state('hidden', style({
                opacity: 0,
                transform: 'translateX(0) scale(0.8)',
                zIndex: 0
            })),
            transition('* => current', [
                animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            transition('current => previous', [
                animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            transition('current => next', [
                animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            transition('* => hidden', [
                animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ])
        ])
    ]
})
export class TrustUsComponent implements AfterViewInit {
    @ViewChild('swiperContainer') swiperContainer!: ElementRef;
    slides: SlideModel[] = slides;
    currentIndex: number = 0;
    swiper!: Swiper;

    ngAfterViewInit() {
        this.swiper = new Swiper(this.swiperContainer.nativeElement, {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: (e: Swiper) => {
                    this.currentIndex = e.activeIndex
                }
            }
        });
    }

    getAnimationState(index: number): string {

        if (index === this.currentIndex) {
            return 'current';
        } else if (index < this.currentIndex) {
            return 'previous';
        } else if (index > this.currentIndex) {
            return 'next';
        }
        return 'hidden';
    }
}
