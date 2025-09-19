import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
    selector: 'offbank-autoplay-video',
    standalone: true,
    template: `
        <video autoplay loop muted #videoElement>
            <source [src]="videoSrc" type="video/mp4">
            Your browser does not support the video tag.
        </video>`,
    styles: 'video{width:100%}'
})
export class AutoplayVideoComponent implements AfterViewInit {
    @Input() videoSrc: string = '';
    @ViewChild('videoElement', {static: false}) videoElement!: ElementRef<HTMLVideoElement>;

    ngAfterViewInit(): void {
        this.tryAutoplay();

    }

    private async tryAutoplay(): Promise<void> {
        const video = this.videoElement.nativeElement;

        try {
            video.muted = true;
            video.loop = true;
            await video.play();
        } catch (error) {
            // Fallback - czekaj na interakcję użytkownika
            document.addEventListener('click', () => {
                video.play().catch(console.error);
            }, {once: true});
        }
    }
}
