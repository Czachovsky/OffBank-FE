import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';

@Component({
    selector: 'offbank-movie-section',
    standalone: true,
    imports: [],
    templateUrl: './movie-section.component.html',
    styleUrl: './movie-section.component.scss'
})
export class MovieSectionComponent implements AfterViewInit, OnDestroy {
    isPlaying: boolean = false;
    isLoading: boolean = false;
    isMuted: boolean = true;
    hasUserInteracted: boolean = false;
    readonly videoSrc = 'assets/img/example-video.mp4';
    readonly posterSrc = 'assets/img/b_und_l.webp';
    readonly title = 'OffBank';
    private intersectionObserver?: IntersectionObserver;
    private video?: HTMLVideoElement;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.video = this.elementRef.nativeElement.querySelector('.movie-video');
        this.setupIntersectionObserver();

        if (this.video) {
            this.video.muted = this.isMuted;
        }
    }

    ngOnDestroy(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }

    private setupIntersectionObserver(): void {
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        this.autoPlay();
                    } else if (!entry.isIntersecting) {
                        this.autoPause();
                    }
                });
            },
            {
                threshold: 0.6,
                rootMargin: '-50px'
            }
        );

        this.intersectionObserver.observe(this.elementRef.nativeElement);
    }

    private autoPlay(): void {
        if (this.video && !this.isPlaying && !this.hasUserInteracted) {
            this.isLoading = true;
            this.video.muted = true;
            this.isMuted = true;

            this.video.play().then(() => {
                this.isPlaying = true;
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            });
        }
    }

    private autoPause(): void {
        if (this.video && this.isPlaying && !this.hasUserInteracted) {
            this.video.pause();
            this.isPlaying = false;
        }
    }

    onPlayClick(): void {
        this.hasUserInteracted = true;

        if (this.video) {
            if (this.isPlaying) {
                this.video.pause();
                this.isPlaying = false;
            } else {
                this.isLoading = true;
                // Gdy użytkownik klika, włącz dźwięk
                this.video.muted = false;
                this.isMuted = false;

                this.video.play().then(() => {
                    this.isPlaying = true;
                    this.isLoading = false;
                }).catch(() => {
                    this.isLoading = false;
                });
            }
        }
    }

    onMuteToggle(): void {
        if (this.video) {
            this.video.muted = !this.video.muted;
            this.isMuted = this.video.muted;
        }
    }

    onVideoEnded(): void {
        this.isPlaying = false;
        this.hasUserInteracted = false; // Reset aby móc ponownie auto-odtwarzać
    }

    onVideoLoadStart(): void {
        this.isLoading = true;
    }

    onVideoCanPlay(): void {
        this.isLoading = false;
    }
}
