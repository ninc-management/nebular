/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, forwardRef, HostBinding, HostListener, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { ENTER, ESCAPE } from '../cdk/keycodes/keycodes';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { NbKeyManagerActiveItemMode, } from '../cdk/a11y/descendant-key-manager';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-position";
import * as i4 from "../cdk/a11y/descendant-key-manager";
/**
 * The `NbAutocompleteDirective` provides a capability to expand input with
 * `NbAutocompleteComponent` overlay containing options to select and fill input with.
 *
 * @stacked-example(Showcase, autocomplete/autocomplete-showcase.component)
 *
 * ### Installation
 *
 * Import `NbAutocompleteModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAutocompleteModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * You can bind control with form controls or ngModel.
 *
 * @stacked-example(Autocomplete form binding, autocomplete/autocomplete-form.component)
 *
 * Options in the autocomplete may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, autocomplete/autocomplete-group.component)
 *
 * Autocomplete may change selected option value via provided function.
 *
 * @stacked-example(Custom display, autocomplete/autocomplete-custom-display.component)
 *
 * Also, autocomplete may make first option in option list active automatically.
 *
 * @stacked-example(Active first, autocomplete/autocomplete-active-first.component)
 *
 * */
export class NbAutocompleteDirective {
    constructor(hostRef, overlay, cd, triggerStrategyBuilder, positionBuilder, activeDescendantKeyManagerFactory, renderer) {
        this.hostRef = hostRef;
        this.overlay = overlay;
        this.cd = cd;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.positionBuilder = positionBuilder;
        this.activeDescendantKeyManagerFactory = activeDescendantKeyManagerFactory;
        this.renderer = renderer;
        this.destroy$ = new Subject();
        this._onChange = () => { };
        this._onTouched = () => { };
        /**
         * Determines options overlay offset (in pixels).
         **/
        this.overlayOffset = 8;
        /**
         * Determines options overlay scroll strategy.
         **/
        this.scrollStrategy = 'block';
        this.role = 'combobox';
        this.ariaAutocomplete = 'list';
        this.hasPopup = 'true';
    }
    /**
     * Determines is autocomplete overlay opened.
     * */
    get isOpen() {
        return this.overlayRef && this.overlayRef.hasAttached();
    }
    /**
     * Determines is autocomplete overlay closed.
     * */
    get isClosed() {
        return !this.isOpen;
    }
    /**
     * Provides autocomplete component.
     * */
    get autocomplete() {
        return this._autocomplete;
    }
    set autocomplete(autocomplete) {
        this._autocomplete = autocomplete;
    }
    get top() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.TOP;
    }
    get bottom() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.BOTTOM;
    }
    get ariaExpanded() {
        return this.isOpen && this.isOpen.toString();
    }
    get ariaOwns() {
        return this.isOpen ? this.autocomplete.id : null;
    }
    get ariaActiveDescendant() {
        return this.isOpen && this.keyManager.activeItem ? this.keyManager.activeItem.id : null;
    }
    ngAfterViewInit() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnTriggers();
    }
    ngOnDestroy() {
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
        if (this.positionStrategy) {
            this.positionStrategy.dispose();
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    handleInput() {
        const currentValue = this.hostRef.nativeElement.value;
        this._onChange(currentValue);
        this.setHostInputValue(this.getDisplayValue(currentValue));
        this.show();
    }
    handleKeydown() {
        this.show();
    }
    handleBlur() {
        this._onTouched();
    }
    show() {
        if (this.shouldShow()) {
            this.attachToOverlay();
            this.setActiveItem();
        }
    }
    hide() {
        if (this.isOpen) {
            this.overlayRef.detach();
            // Need to update class via @HostBinding
            this.cd.markForCheck();
        }
    }
    writeValue(value) {
        this.handleInputValueUpdate(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.renderer.setProperty(this.hostRef.nativeElement, 'disabled', disabled);
    }
    subscribeOnOptionClick() {
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.autocomplete.options.changes
            .pipe(tap(() => this.setActiveItem()), startWith(this.autocomplete.options), switchMap((options) => {
            return merge(...options.map((option) => option.click));
        }), takeUntil(this.destroy$))
            .subscribe((clickedOption) => this.handleInputValueUpdate(clickedOption.value, true));
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange.pipe(takeUntil(this.destroy$)).subscribe((position) => {
            this.autocomplete.overlayPosition = position;
            this.cd.detectChanges();
        });
    }
    getActiveItem() {
        return this.keyManager.activeItem;
    }
    setupAutocomplete() {
        this.autocomplete.setHost(this.customOverlayHost || this.hostRef);
    }
    getDisplayValue(value) {
        const displayFn = this.autocomplete.handleDisplayFn;
        return displayFn ? displayFn(value) : value;
    }
    getContainer() {
        return (this.overlayRef &&
            this.isOpen &&
            {
                location: {
                    nativeElement: this.overlayRef.overlayElement,
                },
            });
    }
    handleInputValueUpdate(value, focusInput = false) {
        this.setHostInputValue(value ?? '');
        this._onChange(value);
        if (focusInput) {
            this.hostRef.nativeElement.focus();
        }
        this.autocomplete.emitSelected(value);
        this.hide();
    }
    subscribeOnTriggers() {
        this.triggerStrategy.show$.pipe(filter(() => this.isClosed)).subscribe(() => this.show());
        this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(() => this.hide());
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(() => this.getContainer())
            .build();
    }
    createKeyManager() {
        this.keyManager = this.activeDescendantKeyManagerFactory.create(this.autocomplete.options);
    }
    setHostInputValue(value) {
        this.hostRef.nativeElement.value = this.getDisplayValue(value);
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.customOverlayHost || this.hostRef)
            .position(NbPosition.BOTTOM)
            .offset(this.overlayOffset)
            .adjustment(NbAdjustment.VERTICAL);
    }
    subscribeOnOverlayKeys() {
        this.overlayRef
            .keydownEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            if (event.keyCode === ESCAPE && this.isOpen) {
                event.preventDefault();
                this.hostRef.nativeElement.focus();
                this.hide();
            }
            else if (event.keyCode === ENTER) {
                event.preventDefault();
                const activeItem = this.getActiveItem();
                if (!activeItem) {
                    return;
                }
                this.handleInputValueUpdate(activeItem.value, true);
            }
            else {
                this.keyManager.onKeydown(event);
            }
        });
    }
    setActiveItem() {
        // If autocomplete has activeFirst input set to true,
        // keyManager set first option active, otherwise - reset active option.
        const mode = this.autocomplete.activeFirst
            ? NbKeyManagerActiveItemMode.FIRST_ACTIVE
            : NbKeyManagerActiveItemMode.RESET_ACTIVE;
        this.keyManager.setActiveItem(mode);
        this.cd.detectChanges();
    }
    attachToOverlay() {
        if (!this.overlayRef) {
            this.setupAutocomplete();
            this.initOverlay();
        }
        this.overlayRef.attach(this.autocomplete.portal);
    }
    createOverlay() {
        const scrollStrategy = this.createScrollStrategy();
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy,
            panelClass: this.autocomplete.optionsPanelClass,
        });
    }
    initOverlay() {
        this.positionStrategy = this.createPositionStrategy();
        this.createKeyManager();
        this.subscribeOnPositionChange();
        this.subscribeOnOptionClick();
        this.checkOverlayVisibility();
        this.createOverlay();
        this.subscribeOnOverlayKeys();
    }
    checkOverlayVisibility() {
        this.autocomplete.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (!this.autocomplete.options.length) {
                this.hide();
            }
        });
    }
    createScrollStrategy() {
        return this.overlay.scrollStrategies[this.scrollStrategy]();
    }
    shouldShow() {
        return this.isClosed && this.autocomplete.options.length > 0;
    }
}
NbAutocompleteDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbAutocompleteDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbOverlayService }, { token: i0.ChangeDetectorRef }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbPositionBuilderService }, { token: i4.NbActiveDescendantKeyManagerFactoryService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NbAutocompleteDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: NbAutocompleteDirective, selector: "input[nbAutocomplete], textarea[nbAutocomplete]", inputs: { autocomplete: ["nbAutocomplete", "autocomplete"], overlayOffset: "overlayOffset", scrollStrategy: "scrollStrategy", customOverlayHost: "customOverlayHost" }, host: { listeners: { "input": "handleInput()", "keydown.arrowDown": "handleKeydown()", "keydown.arrowUp": "handleKeydown()", "blur": "handleBlur()" }, properties: { "class.nb-autocomplete-position-top": "this.top", "class.nb-autocomplete-position-bottom": "this.bottom", "attr.role": "this.role", "attr.aria-autocomplete": "this.ariaAutocomplete", "attr.haspopup": "this.hasPopup", "attr.aria-expanded": "this.ariaExpanded", "attr.aria-owns": "this.ariaOwns", "attr.aria-activedescendant": "this.ariaActiveDescendant" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NbAutocompleteDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nbAutocomplete], textarea[nbAutocomplete]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbAutocompleteDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NbOverlayService }, { type: i0.ChangeDetectorRef }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbPositionBuilderService }, { type: i4.NbActiveDescendantKeyManagerFactoryService }, { type: i0.Renderer2 }]; }, propDecorators: { autocomplete: [{
                type: Input,
                args: ['nbAutocomplete']
            }], overlayOffset: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], customOverlayHost: [{
                type: Input
            }], top: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-top']
            }], bottom: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-bottom']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaAutocomplete: [{
                type: HostBinding,
                args: ['attr.aria-autocomplete']
            }], hasPopup: [{
                type: HostBinding,
                args: ['attr.haspopup']
            }], ariaExpanded: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], ariaOwns: [{
                type: HostBinding,
                args: ['attr.aria-owns']
            }], ariaActiveDescendant: [{
                type: HostBinding,
                args: ['attr.aria-activedescendant']
            }], handleInput: [{
                type: HostListener,
                args: ['input']
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown.arrowDown']
            }, {
                type: HostListener,
                args: ['keydown.arrowUp']
            }], handleBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUlMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUUsT0FBTyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUdMLDBCQUEwQixHQUMzQixNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFLNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9DSztBQVdMLE1BQU0sT0FBTyx1QkFBdUI7SUErRmxDLFlBQ1ksT0FBbUIsRUFDbkIsT0FBeUIsRUFDekIsRUFBcUIsRUFDckIsc0JBQXVELEVBQ3ZELGVBQXlDLEVBQ3pDLGlDQUFtRyxFQUNuRyxRQUFtQjtRQU5uQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLE9BQUUsR0FBRixFQUFFLENBQW1C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WUFBWTt1QkFBQyxtQkFBbUI7O3NCQUNoQyxZQUFZO3VCQUFDLGlCQUFpQjtnQkFNL0IsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYk92ZXJsYXlSZWYsIE5iU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iVHJpZ2dlciwgTmJUcmlnZ2VyU3RyYXRlZ3ksIE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXRyaWdnZXInO1xuaW1wb3J0IHsgTmJPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktc2VydmljZSc7XG5pbXBvcnQgeyBFTlRFUiwgRVNDQVBFIH0gZnJvbSAnLi4vY2RrL2tleWNvZGVzL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE5iQWRqdXN0bWVudCxcbiAgTmJQb3NpdGlvbixcbiAgTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxufSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXBvc2l0aW9uJztcbmltcG9ydCB7XG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIsXG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5U2VydmljZSxcbiAgTmJLZXlNYW5hZ2VyQWN0aXZlSXRlbU1vZGUsXG59IGZyb20gJy4uL2Nkay9hMTF5L2Rlc2NlbmRhbnQta2V5LW1hbmFnZXInO1xuaW1wb3J0IHsgTmJTY3JvbGxTdHJhdGVnaWVzIH0gZnJvbSAnLi4vY2RrL2FkYXB0ZXIvYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LWFkYXB0ZXInO1xuaW1wb3J0IHsgTmJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9vcHRpb24vb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhlIGBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZWAgcHJvdmlkZXMgYSBjYXBhYmlsaXR5IHRvIGV4cGFuZCBpbnB1dCB3aXRoXG4gKiBgTmJBdXRvY29tcGxldGVDb21wb25lbnRgIG92ZXJsYXkgY29udGFpbmluZyBvcHRpb25zIHRvIHNlbGVjdCBhbmQgZmlsbCBpbnB1dCB3aXRoLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQXV0b2NvbXBsZXRlTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkF1dG9jb21wbGV0ZU1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogWW91IGNhbiBiaW5kIGNvbnRyb2wgd2l0aCBmb3JtIGNvbnRyb2xzIG9yIG5nTW9kZWwuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShBdXRvY29tcGxldGUgZm9ybSBiaW5kaW5nLCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWZvcm0uY29tcG9uZW50KVxuICpcbiAqIE9wdGlvbnMgaW4gdGhlIGF1dG9jb21wbGV0ZSBtYXkgYmUgZ3JvdXBlZCB1c2luZyBgbmItb3B0aW9uLWdyb3VwYCBjb21wb25lbnQuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShHcm91cGluZywgYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1ncm91cC5jb21wb25lbnQpXG4gKlxuICogQXV0b2NvbXBsZXRlIG1heSBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uIHZhbHVlIHZpYSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKEN1c3RvbSBkaXNwbGF5LCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWN1c3RvbS1kaXNwbGF5LmNvbXBvbmVudClcbiAqXG4gKiBBbHNvLCBhdXRvY29tcGxldGUgbWF5IG1ha2UgZmlyc3Qgb3B0aW9uIGluIG9wdGlvbiBsaXN0IGFjdGl2ZSBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQWN0aXZlIGZpcnN0LCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWFjdGl2ZS1maXJzdC5jb21wb25lbnQpXG4gKlxuICogKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25iQXV0b2NvbXBsZXRlXSwgdGV4dGFyZWFbbmJBdXRvY29tcGxldGVdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKipcbiAgICogTmJBdXRvY29tcGxldGVDb21wb25lbnQgaW5zdGFuY2UgcGFzc2VkIHZpYSBpbnB1dC5cbiAgICogKi9cbiAgcHJvdGVjdGVkIF9hdXRvY29tcGxldGU6IE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIHN0cmF0ZWd5IHVzZWQgYnkgb3ZlcmxheS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiAqL1xuICBwcm90ZWN0ZWQgdHJpZ2dlclN0cmF0ZWd5OiBOYlRyaWdnZXJTdHJhdGVneTtcblxuICBwcm90ZWN0ZWQgcG9zaXRpb25TdHJhdGVneTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICBwcm90ZWN0ZWQgb3ZlcmxheVJlZjogTmJPdmVybGF5UmVmO1xuXG4gIHByb3RlY3RlZCBrZXlNYW5hZ2VyOiBOYkFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5iT3B0aW9uQ29tcG9uZW50PFQ+PjtcblxuICBwcm90ZWN0ZWQgZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCBfb25DaGFuZ2U6ICh2YWx1ZTogVCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaXMgYXV0b2NvbXBsZXRlIG92ZXJsYXkgb3BlbmVkLlxuICAgKiAqL1xuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpcyBhdXRvY29tcGxldGUgb3ZlcmxheSBjbG9zZWQuXG4gICAqICovXG4gIGdldCBpc0Nsb3NlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNPcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGF1dG9jb21wbGV0ZSBjb21wb25lbnQuXG4gICAqICovXG4gIEBJbnB1dCgnbmJBdXRvY29tcGxldGUnKVxuICBnZXQgYXV0b2NvbXBsZXRlKCk6IE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b2NvbXBsZXRlO1xuICB9XG4gIHNldCBhdXRvY29tcGxldGUoYXV0b2NvbXBsZXRlOiBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudDxUPikge1xuICAgIHRoaXMuX2F1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIG9wdGlvbnMgb3ZlcmxheSBvZmZzZXQgKGluIHBpeGVscykuXG4gICAqKi9cbiAgQElucHV0KCkgb3ZlcmxheU9mZnNldDogbnVtYmVyID0gODtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBvcHRpb25zIG92ZXJsYXkgc2Nyb2xsIHN0cmF0ZWd5LlxuICAgKiovXG4gIEBJbnB1dCgpIHNjcm9sbFN0cmF0ZWd5OiBOYlNjcm9sbFN0cmF0ZWdpZXMgPSAnYmxvY2snO1xuXG4gIEBJbnB1dCgpIGN1c3RvbU92ZXJsYXlIb3N0OiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItYXV0b2NvbXBsZXRlLXBvc2l0aW9uLXRvcCcpXG4gIGdldCB0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuICYmIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoICYmIHRoaXMuYXV0b2NvbXBsZXRlLm92ZXJsYXlQb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5UT1A7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLWF1dG9jb21wbGV0ZS1wb3NpdGlvbi1ib3R0b20nKVxuICBnZXQgYm90dG9tKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmxlbmd0aCAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vdmVybGF5UG9zaXRpb24gPT09IE5iUG9zaXRpb24uQk9UVE9NO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICByb2xlOiBzdHJpbmcgPSAnY29tYm9ib3gnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWF1dG9jb21wbGV0ZScpXG4gIGFyaWFBdXRvY29tcGxldGU6IHN0cmluZyA9ICdsaXN0JztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaGFzcG9wdXAnKVxuICBoYXNQb3B1cDogc3RyaW5nID0gJ3RydWUnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgZ2V0IGFyaWFFeHBhbmRlZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmlzT3Blbi50b1N0cmluZygpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtb3ducycpXG4gIGdldCBhcmlhT3ducygpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gPyB0aGlzLmF1dG9jb21wbGV0ZS5pZCA6IG51bGw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50JylcbiAgZ2V0IGFyaWFBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSA/IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtLmlkIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBob3N0UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXI6IE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uQnVpbGRlcjogTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlckZhY3Rvcnk6IE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5U2VydmljZTxOYk9wdGlvbkNvbXBvbmVudDxUPj4sXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25UcmlnZ2VycygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMudHJpZ2dlclN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb25TdHJhdGVneSkge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JylcbiAgaGFuZGxlSW5wdXQoKSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgdGhpcy5fb25DaGFuZ2UoY3VycmVudFZhbHVlKTtcbiAgICB0aGlzLnNldEhvc3RJbnB1dFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd0Rvd24nKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93VXAnKVxuICBoYW5kbGVLZXlkb3duKCkge1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLnNob3VsZFNob3coKSkge1xuICAgICAgdGhpcy5hdHRhY2hUb092ZXJsYXkoKTtcbiAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAvLyBOZWVkIHRvIHVwZGF0ZSBjbGFzcyB2aWEgQEhvc3RCaW5kaW5nXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUlucHV0VmFsdWVVcGRhdGUodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25PcHRpb25DbGljaygpIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgdXNlciBjaGFuZ2VzIHByb3ZpZGVkIG9wdGlvbnMgbGlzdCBpbiB0aGUgcnVudGltZSB3ZSBoYXZlIHRvIGhhbmRsZSB0aGlzXG4gICAgICogYW5kIHJlc3Vic2NyaWJlIG9uIG9wdGlvbnMgc2VsZWN0aW9uIGNoYW5nZXMgZXZlbnQuXG4gICAgICogT3RoZXJ3aXNlLCB0aGUgdXNlciB3aWxsIG5vdCBiZSBhYmxlIHRvIHNlbGVjdCBuZXcgb3B0aW9ucy5cbiAgICAgKiAqL1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnNldEFjdGl2ZUl0ZW0oKSksXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKSxcbiAgICAgICAgc3dpdGNoTWFwKChvcHRpb25zOiBRdWVyeUxpc3Q8TmJPcHRpb25Db21wb25lbnQ8VD4+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5jbGljaykpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZE9wdGlvbjogTmJPcHRpb25Db21wb25lbnQ8VD4pID0+IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZVVwZGF0ZShjbGlja2VkT3B0aW9uLnZhbHVlLCB0cnVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25Qb3NpdGlvbkNoYW5nZSgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucG9zaXRpb25DaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgocG9zaXRpb246IE5iUG9zaXRpb24pID0+IHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm92ZXJsYXlQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QWN0aXZlSXRlbSgpOiBOYk9wdGlvbkNvbXBvbmVudDxUPiB7XG4gICAgcmV0dXJuIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldHVwQXV0b2NvbXBsZXRlKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldEhvc3QodGhpcy5jdXN0b21PdmVybGF5SG9zdCB8fCB0aGlzLmhvc3RSZWYpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGlzcGxheUZuID0gdGhpcy5hdXRvY29tcGxldGUuaGFuZGxlRGlzcGxheUZuO1xuICAgIHJldHVybiBkaXNwbGF5Rm4gPyBkaXNwbGF5Rm4odmFsdWUpIDogdmFsdWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29udGFpbmVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLm92ZXJsYXlSZWYgJiZcbiAgICAgIHRoaXMuaXNPcGVuICYmXG4gICAgICA8Q29tcG9uZW50UmVmPGFueT4+e1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUlucHV0VmFsdWVVcGRhdGUodmFsdWU6IFQsIGZvY3VzSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuc2V0SG9zdElucHV0VmFsdWUodmFsdWUgPz8gJycpO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpZiAoZm9jdXNJbnB1dCkge1xuICAgICAgdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgdGhpcy5hdXRvY29tcGxldGUuZW1pdFNlbGVjdGVkKHZhbHVlKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVPblRyaWdnZXJzKCkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LnNob3ckLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuaXNDbG9zZWQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zaG93KCkpO1xuXG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuaGlkZSQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5pc09wZW4pKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpOiBOYlRyaWdnZXJTdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlclN0cmF0ZWd5QnVpbGRlclxuICAgICAgLnRyaWdnZXIoTmJUcmlnZ2VyLkZPQ1VTKVxuICAgICAgLmhvc3QodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAuY29udGFpbmVyKCgpID0+IHRoaXMuZ2V0Q29udGFpbmVyKCkpXG4gICAgICAuYnVpbGQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVLZXlNYW5hZ2VyKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlciA9IHRoaXMuYWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5LmNyZWF0ZSh0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRIb3N0SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25CdWlsZGVyXG4gICAgICAuY29ubmVjdGVkVG8odGhpcy5jdXN0b21PdmVybGF5SG9zdCB8fCB0aGlzLmhvc3RSZWYpXG4gICAgICAucG9zaXRpb24oTmJQb3NpdGlvbi5CT1RUT00pXG4gICAgICAub2Zmc2V0KHRoaXMub3ZlcmxheU9mZnNldClcbiAgICAgIC5hZGp1c3RtZW50KE5iQWRqdXN0bWVudC5WRVJUSUNBTCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25PdmVybGF5S2V5cygpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlSZWZcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLmdldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dFZhbHVlVXBkYXRlKGFjdGl2ZUl0ZW0udmFsdWUsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBY3RpdmVJdGVtKCkge1xuICAgIC8vIElmIGF1dG9jb21wbGV0ZSBoYXMgYWN0aXZlRmlyc3QgaW5wdXQgc2V0IHRvIHRydWUsXG4gICAgLy8ga2V5TWFuYWdlciBzZXQgZmlyc3Qgb3B0aW9uIGFjdGl2ZSwgb3RoZXJ3aXNlIC0gcmVzZXQgYWN0aXZlIG9wdGlvbi5cbiAgICBjb25zdCBtb2RlID0gdGhpcy5hdXRvY29tcGxldGUuYWN0aXZlRmlyc3RcbiAgICAgID8gTmJLZXlNYW5hZ2VyQWN0aXZlSXRlbU1vZGUuRklSU1RfQUNUSVZFXG4gICAgICA6IE5iS2V5TWFuYWdlckFjdGl2ZUl0ZW1Nb2RlLlJFU0VUX0FDVElWRTtcbiAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShtb2RlKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhdHRhY2hUb092ZXJsYXkoKSB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuc2V0dXBBdXRvY29tcGxldGUoKTtcbiAgICAgIHRoaXMuaW5pdE92ZXJsYXkoKTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLmF1dG9jb21wbGV0ZS5wb3J0YWwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU92ZXJsYXkoKSB7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICBzY3JvbGxTdHJhdGVneSxcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnNQYW5lbENsYXNzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRPdmVybGF5KCkge1xuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpO1xuXG4gICAgdGhpcy5jcmVhdGVLZXlNYW5hZ2VyKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbk9wdGlvbkNsaWNrKCk7XG4gICAgdGhpcy5jaGVja092ZXJsYXlWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbk92ZXJsYXlLZXlzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2hlY2tPdmVybGF5VmlzaWJpbGl0eSgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk6IE5iU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llc1t0aGlzLnNjcm9sbFN0cmF0ZWd5XSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNob3VsZFNob3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDbG9zZWQgJiYgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5sZW5ndGggPiAwO1xuICB9XG59XG4iXX0=