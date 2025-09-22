import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
    selector: 'offbank-autoplay-video',
    standalone: true,
    template: `
        <video
                #videoElement
                autoplay
                loop
                muted
                playsinline
                disablePictureInPicture
                [controls]="false"
                [attr.controlsList]="'nodownload nofullscreen noremoteplayback'"
                (loadedmetadata)="onVideoLoaded()"
                (click)="onVideoClick($event)"
                (touchstart)="onTouchStart($event)"
                (touchmove)="onTouchMove($event)"
                (touchend)="onTouchEnd($event)"
                (contextmenu)="onContextMenu($event)">
            <source [src]="videoSrc" type="video/mp4">
            Your browser does not support the video tag.
        </video>`,
    styles: `
      video {
        max-width: 100%;

        /* Ukryj wszystkie kontrolki webkit */
        &::-webkit-media-controls {
          display: none !important;
          -webkit-appearance: none !important;
        }

        &::-webkit-media-controls-enclosure {
          display: none !important;
        }

        &::-webkit-media-controls-panel {
          display: none !important;
        }

        &::-webkit-media-controls-play-button {
          display: none !important;
        }

        &::-webkit-media-controls-start-playback-button {
          display: none !important;
        }

        &::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }

        &::-webkit-media-controls-timeline {
          display: none !important;
        }

        &::-webkit-media-controls-current-time-display {
          display: none !important;
        }

        &::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }

        &::-webkit-media-controls-volume-slider {
          display: none !important;
        }

        /* Blokuj selekcję ale pozwól na scroll */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        /* Usuń outline */
        &:focus {
          outline: none !important;
        }

        /* Pozwól na scrollowanie */
        touch-action: pan-y pan-x;
        -webkit-tap-highlight-color: transparent;
      }

      /* Dodatkowe ukrycie kontrolek dla różnych przeglądarek */
      video::-moz-media-controls {
        display: none !important;
      }

      video::-ms-media-controls {
        display: none !important;
      }
    `
})
export class AutoplayVideoComponent implements AfterViewInit {
    @Input() videoSrc: string = '';
    @ViewChild('videoElement', {static: false}) videoElement!: ElementRef<HTMLVideoElement>;

    private needsUserInteraction = false;
    private touchStartY = 0;
    private touchStartX = 0;
    private touchStartTime = 0;
    private isScrolling = false;

    ngAfterViewInit(): void {
        this.setupVideo();
        this.tryAutoplay();
    }

    private setupVideo(): void {
        const video = this.videoElement.nativeElement;

        // Wymuś brak kontrolek
        video.controls = false;
        video.removeAttribute('controls');

        // Dodatkowe ustawienia dla mobilnych
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('x-webkit-airplay', 'deny');
        video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');

        // Blokowanie fullscreen
        video.addEventListener('webkitbeginfullscreen', this.preventFullscreen);
        video.addEventListener('fullscreenchange', this.preventFullscreen);
        video.addEventListener('webkitfullscreenchange', this.preventFullscreen);

        // Blokowanie pokazywania kontrolek (bez preventDefault)
        video.addEventListener('loadstart', this.hideControls, { passive: true });
        video.addEventListener('loadeddata', this.hideControls, { passive: true });
        video.addEventListener('loadedmetadata', this.hideControls, { passive: true });
        video.addEventListener('progress', this.hideControls, { passive: true });
        video.addEventListener('canplay', this.hideControls, { passive: true });
        video.addEventListener('canplaythrough', this.hideControls, { passive: true });

        // Dodatkowe zabezpieczenia dla iOS
        if (this.isIOS()) {
            video.setAttribute('autoplay', 'true');
            video.setAttribute('muted', 'true');
            video.muted = true;

            // Dodatkowe blokowanie kontrolek na iOS
            video.addEventListener('webkitpresentationmodechanged', this.preventFullscreen);
        }
    }

    private hideControls = (): void => {
        const video = this.videoElement.nativeElement;
        video.controls = false;
        video.removeAttribute('controls');
    }

    private preventFullscreen = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();

        const video = this.videoElement.nativeElement;

        if (document.fullscreenElement === video) {
            document.exitFullscreen();
        }

        if ((document as any).webkitFullscreenElement === video) {
            (document as any).webkitExitFullscreen();
        }

        if ((video as any).webkitPresentationMode === 'fullscreen') {
            (video as any).webkitSetPresentationMode('inline');
        }
    }

    private async tryAutoplay(): Promise<void> {
        const video = this.videoElement.nativeElement;

        try {
            video.muted = true;
            video.loop = true;

            if (this.isMobile()) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            await video.play();
            console.log('Autoplay successful');
        } catch (error) {
            console.log('Autoplay failed, will try on user interaction:', error);
            this.needsUserInteraction = true;

            if (this.isMobile()) {
                this.addMobilePlayHandler();
            }
        }
    }

    private addMobilePlayHandler(): void {
        const playVideo = async () => {
            try {
                await this.videoElement.nativeElement.play();
                this.needsUserInteraction = false;
                document.removeEventListener('touchstart', playVideo);
                document.removeEventListener('click', playVideo);
            } catch (error) {
                console.error('Mobile play failed:', error);
            }
        };

        document.addEventListener('touchstart', playVideo, { once: true, passive: true });
        document.addEventListener('click', playVideo, { once: true, passive: true });
    }

    onVideoLoaded(): void {
        this.hideControls();

        if (this.isMobile()) {
            setTimeout(() => {
                this.tryAutoplay();
            }, 50);
        }
    }

    onTouchStart(event: TouchEvent): void {
        // Zapisz pozycję startową i czas
        const touch = event.touches[0];
        this.touchStartY = touch.clientY;
        this.touchStartX = touch.clientX;
        this.touchStartTime = Date.now();
        this.isScrolling = false;

        // Ukryj kontrolki ale NIE blokuj eventu
        this.hideControls();
    }

    onTouchMove(event: TouchEvent): void {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const deltaY = Math.abs(touch.clientY - this.touchStartY);
            const deltaX = Math.abs(touch.clientX - this.touchStartX);

            // Jeśli ruch jest większy niż 10px, to prawdopodobnie scrollowanie
            if (deltaY > 10 || deltaX > 10) {
                this.isScrolling = true;
            }
        }
    }

    onTouchEnd(event: TouchEvent): void {
        const touchDuration = Date.now() - this.touchStartTime;

        // Jeśli nie było scrollowania i dotyk był krótki (< 300ms), to może być tap
        if (!this.isScrolling && touchDuration < 300) {
            // Tylko wtedy spróbuj odtworzyć video
            if (this.needsUserInteraction) {
                event.preventDefault(); // Blokuj tylko w tym przypadku
                this.videoElement.nativeElement.play().catch(console.error);
                this.needsUserInteraction = false;
            }
        }

        // Reset
        this.isScrolling = false;
    }

    onVideoClick(event: Event): void {
        // Dla kliknięć myszką (desktop)
        this.hideControls();

        if (this.needsUserInteraction) {
            event.preventDefault();
            this.videoElement.nativeElement.play().catch(console.error);
            this.needsUserInteraction = false;
        }
    }

    onContextMenu(event: Event): boolean {
        // Blokuj menu kontekstowe
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    private isIOS(): boolean {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
}
