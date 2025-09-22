import {AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {BodyComponent} from "./components/body/body.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LogoComponent} from "./components/logo/logo.component";
import {ScreenSizeService} from "./services/screen-size.service";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        BodyComponent,
        FooterComponent,
        LogoComponent
    ],
    template: `
        <div class="logo_loader" style="display: none;" #logoLoader>
            <offbank-logo
                    animationPath="/assets/logo_animation_loader.json"
                    [width]="'100%'"
                    [height]="'100%'"
                    [playOnce]="true"
                    [loop]="false"
                    [playOnViewport]="false"
                    [autoplay]="true">
            </offbank-logo>
        </div>
        <offbank-header></offbank-header>
        <main>
            <offbank-body></offbank-body>
            <offbank-footer id="contact"></offbank-footer>
        </main>`
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('logoLoader', {static: false}) logoLoaderRef!: ElementRef;
    private readonly screen: ScreenSizeService = inject(ScreenSizeService);
    private renderer: Renderer2 = inject(Renderer2);

    ngAfterViewInit(): void {

        if (this.logoLoaderRef) {
            const element = this.logoLoaderRef.nativeElement;
            this.renderer.setStyle(element, 'transform', this.calculateCenterTransform());
            this.renderer.setStyle(element, 'display', 'block');
        }
    }

    ngOnInit(): void {
        this.initializeApp();
    }


    private async initializeApp(): Promise<void> {
        try {

            await this.loadApp();

            await this.delay(1000);

        } catch (error) {
            console.error('Błąd ładowania:', error);
        } finally {
            if (this.screen.screenSize() <= 1279) {
                this.renderer.setStyle(this.logoLoaderRef.nativeElement, 'opacity', '0');
                await this.delay(400);
                this.renderer.addClass(document.body, 'hide');
                await this.delay(200);
                this.renderer.setStyle(this.logoLoaderRef.nativeElement, 'display', 'none');
            } else {
                this.renderer.setStyle(this.logoLoaderRef.nativeElement, 'width', '115px');
                this.renderer.setStyle(this.logoLoaderRef.nativeElement, 'transform', this.calculateLogoAnimationTransform(this.getLogoPositionAndSize())?.topLeft.transform);
                await this.delay(1000);
                this.renderer.addClass(document.body, 'hide');
                await this.delay(200);
                this.renderer.setStyle(this.logoLoaderRef.nativeElement, 'display', 'none');
            }
            this.renderer.removeClass(document.body, '_loading');
        }
    }

    private async loadApp(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {

                console.log('Aplikacja załadowana');
                resolve();
            }, 800);
        });
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getLogoPositionAndSize() {
        const logoElement = document.querySelector('.hero-logo') as HTMLElement;

        if (!logoElement) {
            console.warn('Element z klasą "logo" nie został znaleziony');
            return null;
        }

        const rect = logoElement.getBoundingClientRect();

        return {
            x: rect.left,
            y: rect.top,
            absoluteX: rect.left + window.scrollX,
            absoluteY: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
            rect: rect
        };
    }

    private calculateLogoAnimationTransform(targetElementInfo: any) {
        const logoInfo = this.getLogoPositionAndSize();

        if (!logoInfo || !targetElementInfo) {
            return null;
        }

        const logoTargetXTopLeft = targetElementInfo.x - 17;
        const logoTargetYTopLeft = targetElementInfo.y - 17;


        return {
            topLeft: {
                x: logoTargetXTopLeft,
                y: logoTargetYTopLeft,
                transform: `translate(${logoTargetXTopLeft}px, ${logoTargetYTopLeft}px)`
            },
        };
    }

    private calculateCenterTransform() {
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const logoHalfWidth = 150;
        const logoHalfHeight = 150;

        return `translate(${screenCenterX - logoHalfWidth}px, ${screenCenterY - logoHalfHeight}px)`;
    }

}
