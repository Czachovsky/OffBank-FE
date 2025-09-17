import {Injectable, signal, computed, DestroyRef, inject} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

export interface BreakpointConfig {
    mobile: number;
    tablet: number;
    desktop: number;
}

@Injectable({
    providedIn: 'root'
})
export class ScreenSizeService {
    private destroyRef = inject(DestroyRef);

    private readonly defaultBreakpoints: BreakpointConfig = {
        mobile: 992,
        tablet: 1024,
        desktop: 1200
    };

    private screenWidth = signal<number>(this.getCurrentWidth());

    readonly isMobile = computed(() =>
        this.screenWidth() < this.defaultBreakpoints.mobile
    );

    readonly isTablet = computed(() =>
        this.screenWidth() >= this.defaultBreakpoints.mobile &&
        this.screenWidth() < this.defaultBreakpoints.desktop
    );

    readonly isDesktop = computed(() =>
        this.screenWidth() >= this.defaultBreakpoints.desktop
    );

    constructor() {
        this.initializeResizeListener();
    }

    private initializeResizeListener(): void {
        if (typeof window !== 'undefined') {
            fromEvent(window, 'resize')
                .pipe(
                    debounceTime(10),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(() => {
                    this.screenWidth.set(this.getCurrentWidth());
                });
        }
    }

    private getCurrentWidth(): number {
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
        return 0;
    }
}
