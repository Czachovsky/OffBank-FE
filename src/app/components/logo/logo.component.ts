import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import lottie, {AnimationItem} from 'lottie-web';

@Component({
    selector: 'offbank-logo',
    standalone: true,
    template: `
        <div #lottieContainer
             [style.width.px]="width"
             [style.height.px]="height">
        </div>
    `
})
export class LogoComponent implements OnInit, OnDestroy {
    @ViewChild('lottieContainer', {static: true}) container!: ElementRef;

    @Input() animationPath?: string;
    @Input() animationData?: any;
    @Input() width = 300;
    @Input() height = 300;
    @Input() autoplay = true;
    @Input() loop = true;
    @Input() playOnViewport = false; // Nowa opcja!
    @Input() viewportThreshold = 0.5; // 50% widoczności
    @Input() playOnce = false; // Czy ma się odegrać tylko raz

    private animation?: AnimationItem;
    private observer?: IntersectionObserver;
    private hasPlayedOnce = false;

    ngOnInit() {
        this.loadAnimation();

        if (this.playOnViewport) {
            this.setupIntersectionObserver();
        }
    }

    ngOnDestroy() {
        this.animation?.destroy();
        this.observer?.disconnect();
    }

    private loadAnimation() {
        const config: any = {
            container: this.container.nativeElement,
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.playOnViewport ? false : this.autoplay // Jeśli playOnViewport=true, nie autoplay
        };

        if (this.animationPath) {
            config.path = this.animationPath;
        } else if (this.animationData) {
            config.animationData = this.animationData;
        }

        this.animation = lottie.loadAnimation(config);
    }

    private setupIntersectionObserver() {
        const options = {
            threshold: this.viewportThreshold,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element jest widoczny w viewport
                    if (this.playOnce && this.hasPlayedOnce) {
                        return; // Nie odgrywaj ponownie
                    }

                    this.play();
                    this.hasPlayedOnce = true;

                    console.log('Animacja uruchomiona - element w viewport!');

                    // Jeśli playOnce=true, przestań obserwować
                    if (this.playOnce) {
                        this.observer?.unobserve(this.container.nativeElement);
                    }
                } else {
                    // Element nie jest widoczny
                    if (!this.playOnce) {
                        this.pause(); // Zatrzymaj gdy element wyjdzie z viewport
                    }
                }
            });
        }, options);

        this.observer.observe(this.container.nativeElement);
    }

    play() {
        this.animation?.play();
    }

    pause() {
        this.animation?.pause();
    }

    stop() {
        this.animation?.stop();
    }
}
