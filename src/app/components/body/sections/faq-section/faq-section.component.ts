import {Component} from '@angular/core';
import {faqQuestions, FaqType} from "./faq.types";
import {NgClass} from "@angular/common";
import {SanitizePipe} from "../../../../pipes/sanitize.pipe";

@Component({
    selector: 'offkredyt-faq-section',
    standalone: true,
    imports: [
        NgClass,
        SanitizePipe
    ],
    templateUrl: './faq-section.component.html',
    styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {

    public faqQuestions: FaqType[] = faqQuestions;

    openQuestionSection(idx: number): void {
        const isCurrentlyOpen = this.faqQuestions[idx].open;
        this.faqQuestions.forEach(question => question.open = false);
        if (!isCurrentlyOpen) {
            this.faqQuestions[idx].open = true;
        }

    }
}
