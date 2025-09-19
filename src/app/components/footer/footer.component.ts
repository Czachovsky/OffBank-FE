import {Component} from '@angular/core';

@Component({
    selector: 'offbank-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    public readonly year = new Date().getFullYear();

    public scrollTop(): void {
        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 0);
    }
}
