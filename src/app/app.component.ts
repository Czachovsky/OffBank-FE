import {Component, OnInit, Renderer2} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {BodyComponent} from "./components/body/body.component";
import {FooterComponent} from "./components/footer/footer.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        BodyComponent,
        FooterComponent
    ],
    template: `
        <offbank-header></offbank-header>
        <main>
            <offbank-body></offbank-body>
            <offbank-footer id="contact"></offbank-footer>
        </main>`
})
export class AppComponent implements OnInit {
    isLoading: boolean = true;

    constructor(private renderer: Renderer2) {
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
            this.isLoading = false;
         //   this.renderer.removeClass(document.body, '_loading');
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

}
