/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { NbComponentPortal } from '../cdk/overlay/mapping';
import { patch } from '../cdk/overlay/overlay-service';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';
import { NB_DOCUMENT } from '../../theme.options';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-position";
import * as i3 from "../cdk/overlay/position-helper";
import * as i4 from "./toastr-config";
export class NbToastRef {
    constructor(toastContainer, toast) {
        this.toastContainer = toastContainer;
        this.toast = toast;
    }
    close() {
        this.toastContainer.destroy(this.toast);
    }
    onClose() {
        return this.toastInstance.destroy.asObservable();
    }
    onClick() {
        return this.toastInstance.toastClick.asObservable();
    }
}
export class NbToastContainer {
    constructor(position, containerRef, positionHelper) {
        this.position = position;
        this.containerRef = containerRef;
        this.positionHelper = positionHelper;
        this.toasts = [];
        this.toastDuplicateCompareFunc = (t1, t2) => {
            return t1.message === t2.message && t1.title === t2.title && t1.config.status === t2.config.status;
        };
    }
    get nativeElement() {
        return this.containerRef.location.nativeElement;
    }
    attach(toast) {
        if (toast.config.preventDuplicates && this.isDuplicate(toast)) {
            return undefined;
        }
        this.removeToastIfLimitReached(toast);
        const toastComponent = this.attachToast(toast);
        if (toast.config.destroyByClick) {
            this.subscribeOnClick(toastComponent, toast);
        }
        if (toast.config.duration) {
            this.setDestroyTimeout(toast);
        }
        this.prevToast = toast;
        const toastRef = new NbToastRef(this, toast);
        toastRef.toastInstance = toastComponent;
        return toastRef;
    }
    destroy(toast) {
        if (this.prevToast === toast) {
            this.prevToast = null;
        }
        this.toasts = this.toasts.filter((t) => t !== toast);
        this.updateContainer();
    }
    isDuplicate(toast) {
        return toast.config.duplicatesBehaviour === 'previous'
            ? this.isDuplicatePrevious(toast)
            : this.isDuplicateAmongAll(toast);
    }
    isDuplicatePrevious(toast) {
        return this.prevToast && this.toastDuplicateCompareFunc(this.prevToast, toast);
    }
    isDuplicateAmongAll(toast) {
        return this.toasts.some((t) => this.toastDuplicateCompareFunc(t, toast));
    }
    removeToastIfLimitReached(toast) {
        if (!toast.config.limit || this.toasts.length < toast.config.limit) {
            return;
        }
        if (this.positionHelper.isTopPosition(toast.config.position)) {
            this.toasts.pop();
        }
        else {
            this.toasts.shift();
        }
    }
    attachToast(toast) {
        if (this.positionHelper.isTopPosition(toast.config.position)) {
            return this.attachToTop(toast);
        }
        else {
            return this.attachToBottom(toast);
        }
    }
    attachToTop(toast) {
        this.toasts.unshift(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.first;
    }
    attachToBottom(toast) {
        this.toasts.push(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.last;
    }
    setDestroyTimeout(toast) {
        setTimeout(() => this.destroy(toast), toast.config.duration);
    }
    subscribeOnClick(toastComponent, toast) {
        toastComponent.toastClick
            .pipe(filter(() => toast.config.destroyByClick), takeUntil(toastComponent.destroy))
            .subscribe(() => this.destroy(toast));
    }
    updateContainer() {
        patch(this.containerRef, { content: this.toasts, position: this.position });
    }
}
export class NbToastrContainerRegistry {
    constructor(overlay, positionBuilder, positionHelper, cfr, document) {
        this.overlay = overlay;
        this.positionBuilder = positionBuilder;
        this.positionHelper = positionHelper;
        this.cfr = cfr;
        this.document = document;
        this.overlays = new Map();
    }
    get(position) {
        const logicalPosition = this.positionHelper.toLogicalPosition(position);
        const overlayWithContainer = this.overlays.get(logicalPosition);
        if (!overlayWithContainer || !this.existsInDom(overlayWithContainer.toastrContainer)) {
            if (overlayWithContainer) {
                overlayWithContainer.overlayRef.dispose();
            }
            this.instantiateContainer(logicalPosition);
        }
        return this.overlays.get(logicalPosition).toastrContainer;
    }
    instantiateContainer(position) {
        const toastrOverlayWithContainer = this.createContainer(position);
        this.overlays.set(position, toastrOverlayWithContainer);
    }
    createContainer(position) {
        const positionStrategy = this.positionBuilder.global().position(position);
        const ref = this.overlay.create({ positionStrategy });
        this.addClassToOverlayHost(ref);
        const containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent, null, null, this.cfr));
        return {
            overlayRef: ref,
            toastrContainer: new NbToastContainer(position, containerRef, this.positionHelper),
        };
    }
    addClassToOverlayHost(overlayRef) {
        overlayRef.hostElement.classList.add('toastr-overlay-container');
    }
    existsInDom(toastContainer) {
        return this.document.body.contains(toastContainer.nativeElement);
    }
}
NbToastrContainerRegistry.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrContainerRegistry, deps: [{ token: i1.NbOverlayService }, { token: i2.NbPositionBuilderService }, { token: i3.NbPositionHelper }, { token: i0.ComponentFactoryResolver }, { token: NB_DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
NbToastrContainerRegistry.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrContainerRegistry });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrContainerRegistry, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NbOverlayService }, { type: i2.NbPositionBuilderService }, { type: i3.NbPositionHelper }, { type: i0.ComponentFactoryResolver }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }]; } });
/**
 * The `NbToastrService` provides a capability to build toast notifications.
 *
 * @stacked-example(Showcase, toastr/toastr-showcase.component)
 *
 * `NbToastrService.show(message, title, config)` accepts three params, title and config are optional.
 *
 * ### Installation
 *
 * Import `NbToastrModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbToastrModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * Calling `NbToastrService.show(...)` will render new toast and return `NbToastrRef` with
 * help of which you may close newly created toast by calling `close` method.
 *
 * ```ts
 * const toastRef: NbToastRef = this.toastrService.show(...);
 * toastRef.close();
 * ```
 *
 * Config accepts following options:
 *
 * `position` - determines where on the screen toast will be rendered.
 * Default is `top-end`.
 *
 * @stacked-example(Position, toastr/toastr-positions.component)
 *
 * `status` - coloring and icon of the toast.
 * Default is `basic`.
 *
 * @stacked-example(Status, toastr/toastr-statuses.component)
 *
 * `duration` - the time after which the toast will be destroyed.
 * `0` means endless toast, that may be destroyed by click only.
 * Default is 3000 ms.
 *
 * @stacked-example(Duration, toastr/toastr-duration.component)
 *
 * `destroyByClick` - provides a capability to destroy toast by click.
 * Default is true.
 *
 * @stacked-example(Destroy by click, toastr/toastr-destroy-by-click.component)
 *
 * `preventDuplicates` - don't create new toast if it has the same title, message and status.
 * Default is false.
 *
 * @stacked-example(Prevent duplicates, toastr/toastr-prevent-duplicates.component)
 *
 * `duplicatesBehaviour` - determines how to treat the toasts duplication.
 * Compare with the previous message `previous`
 * or with all visible messages `all`.
 *
 * @stacked-example(Prevent duplicates behaviour , toastr/toastr-prevent-duplicates-behaviour.component)
 *
 * `limit` - the number of visible toasts in the toast container. The number of toasts is unlimited by default.
 *
 * @stacked-example(Prevent duplicates behaviour , toastr/toastr-limit.component)
 *
 * `hasIcon` - if true then render toast icon.
 * `icon` - you can pass icon class that will be applied into the toast.
 *
 * @stacked-example(Has icon, toastr/toastr-icon.component)
 * */
export class NbToastrService {
    constructor(globalConfig, containerRegistry) {
        this.globalConfig = globalConfig;
        this.containerRegistry = containerRegistry;
    }
    /**
     * Shows toast with message, title and user config.
     * */
    show(message, title, userConfig) {
        const config = new NbToastrConfig({ ...this.globalConfig, ...userConfig });
        const container = this.containerRegistry.get(config.position);
        const toast = { message, title, config };
        return container.attach(toast);
    }
    /**
     * Shows success toast with message, title and user config.
     * */
    success(message, title, config) {
        return this.show(message, title, { ...config, status: 'success' });
    }
    /**
     * Shows info toast with message, title and user config.
     * */
    info(message, title, config) {
        return this.show(message, title, { ...config, status: 'info' });
    }
    /**
     * Shows warning toast with message, title and user config.
     * */
    warning(message, title, config) {
        return this.show(message, title, { ...config, status: 'warning' });
    }
    /**
     * Shows primary toast with message, title and user config.
     * */
    primary(message, title, config) {
        return this.show(message, title, { ...config, status: 'primary' });
    }
    /**
     * Shows danger toast with message, title and user config.
     * */
    danger(message, title, config) {
        return this.show(message, title, { ...config, status: 'danger' });
    }
    /**
     * Shows default toast with message, title and user config.
     * */
    default(message, title, config) {
        return this.show(message, title, { ...config, status: 'basic' });
    }
    /**
     * Shows control toast with message, title and user config.
     * */
    control(message, title, config) {
        return this.default(message, title, { ...config, status: 'control' });
    }
}
NbToastrService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrService, deps: [{ token: NB_TOASTR_CONFIG }, { token: NbToastrContainerRegistry }], target: i0.ɵɵFactoryTarget.Injectable });
NbToastrService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i4.NbToastrConfig, decorators: [{
                    type: Inject,
                    args: [NB_TOASTR_CONFIG]
                }] }, { type: NbToastrContainerRegistry }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvdG9hc3RyL3RvYXN0ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQTBDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFDekUsT0FBTyxFQUFvQixLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUd6RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFbEQsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBb0IsY0FBZ0MsRUFBVSxLQUFjO1FBQXhELG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVM7SUFBRyxDQUFDO0lBRWhGLEtBQUs7UUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBUTNCLFlB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QUFPLENBQUMsT0FBTyxFQUFFLEtBQU0sRUFBRSxNQUFnQztRQUN2RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7OzZHQS9EVSxlQUFlLGtCQUVoQixnQkFBZ0I7aUhBRmYsZUFBZTs0RkFBZixlQUFlO2tCQUQzQixVQUFVOzswQkFHTixNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5iQ29tcG9uZW50UG9ydGFsLCBOYk92ZXJsYXlSZWYgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iT3ZlcmxheVNlcnZpY2UsIHBhdGNoIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktcG9zaXRpb24nO1xuaW1wb3J0IHsgTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24sIE5iR2xvYmFsUG9zaXRpb24sIE5iUG9zaXRpb25IZWxwZXIgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9wb3NpdGlvbi1oZWxwZXInO1xuaW1wb3J0IHsgTmJUb2FzdHJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0ci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5CX1RPQVNUUl9DT05GSUcsIE5iVG9hc3RyQ29uZmlnIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcbmltcG9ydCB7IE5iVG9hc3QgfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IE5iVG9hc3RDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOQl9ET0NVTUVOVCB9IGZyb20gJy4uLy4uL3RoZW1lLm9wdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgTmJUb2FzdFJlZiB7XG4gIHRvYXN0SW5zdGFuY2U6IE5iVG9hc3RDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b2FzdENvbnRhaW5lcjogTmJUb2FzdENvbnRhaW5lciwgcHJpdmF0ZSB0b2FzdDogTmJUb2FzdCkge31cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnRvYXN0Q29udGFpbmVyLmRlc3Ryb3kodGhpcy50b2FzdCk7XG4gIH1cblxuICBvbkNsb3NlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRvYXN0SW5zdGFuY2UuZGVzdHJveS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uQ2xpY2soKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudG9hc3RJbnN0YW5jZS50b2FzdENsaWNrLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOYlRvYXN0Q29udGFpbmVyIHtcbiAgcHJvdGVjdGVkIHRvYXN0czogTmJUb2FzdFtdID0gW107XG4gIHByb3RlY3RlZCBwcmV2VG9hc3Q6IE5iVG9hc3Q7XG5cbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb246IE5iR2xvYmFsUG9zaXRpb24sXG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPE5iVG9hc3RyQ29udGFpbmVyQ29tcG9uZW50PixcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25IZWxwZXI6IE5iUG9zaXRpb25IZWxwZXIsXG4gICkge31cblxuICBhdHRhY2godG9hc3Q6IE5iVG9hc3QpOiBOYlRvYXN0UmVmIHtcbiAgICBpZiAodG9hc3QuY29uZmlnLnByZXZlbnREdXBsaWNhdGVzICYmIHRoaXMuaXNEdXBsaWNhdGUodG9hc3QpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlVG9hc3RJZkxpbWl0UmVhY2hlZCh0b2FzdCk7XG4gICAgY29uc3QgdG9hc3RDb21wb25lbnQ6IE5iVG9hc3RDb21wb25lbnQgPSB0aGlzLmF0dGFjaFRvYXN0KHRvYXN0KTtcblxuICAgIGlmICh0b2FzdC5jb25maWcuZGVzdHJveUJ5Q2xpY2spIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlT25DbGljayh0b2FzdENvbXBvbmVudCwgdG9hc3QpO1xuICAgIH1cblxuICAgIGlmICh0b2FzdC5jb25maWcuZHVyYXRpb24pIHtcbiAgICAgIHRoaXMuc2V0RGVzdHJveVRpbWVvdXQodG9hc3QpO1xuICAgIH1cblxuICAgIHRoaXMucHJldlRvYXN0ID0gdG9hc3Q7XG5cbiAgICBjb25zdCB0b2FzdFJlZiA9IG5ldyBOYlRvYXN0UmVmKHRoaXMsIHRvYXN0KTtcbiAgICB0b2FzdFJlZi50b2FzdEluc3RhbmNlID0gdG9hc3RDb21wb25lbnQ7XG5cbiAgICByZXR1cm4gdG9hc3RSZWY7XG4gIH1cblxuICBkZXN0cm95KHRvYXN0OiBOYlRvYXN0KSB7XG4gICAgaWYgKHRoaXMucHJldlRvYXN0ID09PSB0b2FzdCkge1xuICAgICAgdGhpcy5wcmV2VG9hc3QgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudG9hc3RzID0gdGhpcy50b2FzdHMuZmlsdGVyKCh0KSA9PiB0ICE9PSB0b2FzdCk7XG4gICAgdGhpcy51cGRhdGVDb250YWluZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0R1cGxpY2F0ZSh0b2FzdDogTmJUb2FzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0b2FzdC5jb25maWcuZHVwbGljYXRlc0JlaGF2aW91ciA9PT0gJ3ByZXZpb3VzJ1xuICAgICAgPyB0aGlzLmlzRHVwbGljYXRlUHJldmlvdXModG9hc3QpXG4gICAgICA6IHRoaXMuaXNEdXBsaWNhdGVBbW9uZ0FsbCh0b2FzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEdXBsaWNhdGVQcmV2aW91cyh0b2FzdDogTmJUb2FzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByZXZUb2FzdCAmJiB0aGlzLnRvYXN0RHVwbGljYXRlQ29tcGFyZUZ1bmModGhpcy5wcmV2VG9hc3QsIHRvYXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0R1cGxpY2F0ZUFtb25nQWxsKHRvYXN0OiBOYlRvYXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudG9hc3RzLnNvbWUoKHQpID0+IHRoaXMudG9hc3REdXBsaWNhdGVDb21wYXJlRnVuYyh0LCB0b2FzdCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRvYXN0RHVwbGljYXRlQ29tcGFyZUZ1bmMgPSAodDE6IE5iVG9hc3QsIHQyOiBOYlRvYXN0KTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHQxLm1lc3NhZ2UgPT09IHQyLm1lc3NhZ2UgJiYgdDEudGl0bGUgPT09IHQyLnRpdGxlICYmIHQxLmNvbmZpZy5zdGF0dXMgPT09IHQyLmNvbmZpZy5zdGF0dXM7XG4gIH07XG5cbiAgcHJvdGVjdGVkIHJlbW92ZVRvYXN0SWZMaW1pdFJlYWNoZWQodG9hc3Q6IE5iVG9hc3QpIHtcbiAgICBpZiAoIXRvYXN0LmNvbmZpZy5saW1pdCB8fCB0aGlzLnRvYXN0cy5sZW5ndGggPCB0b2FzdC5jb25maWcubGltaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucG9zaXRpb25IZWxwZXIuaXNUb3BQb3NpdGlvbih0b2FzdC5jb25maWcucG9zaXRpb24pKSB7XG4gICAgICB0aGlzLnRvYXN0cy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b2FzdHMuc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXR0YWNoVG9hc3QodG9hc3Q6IE5iVG9hc3QpOiBOYlRvYXN0Q29tcG9uZW50IHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbkhlbHBlci5pc1RvcFBvc2l0aW9uKHRvYXN0LmNvbmZpZy5wb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dGFjaFRvVG9wKHRvYXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoVG9Cb3R0b20odG9hc3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhdHRhY2hUb1RvcCh0b2FzdDogTmJUb2FzdCk6IE5iVG9hc3RDb21wb25lbnQge1xuICAgIHRoaXMudG9hc3RzLnVuc2hpZnQodG9hc3QpO1xuICAgIHRoaXMudXBkYXRlQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLnRvYXN0cy5maXJzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhdHRhY2hUb0JvdHRvbSh0b2FzdDogTmJUb2FzdCk6IE5iVG9hc3RDb21wb25lbnQge1xuICAgIHRoaXMudG9hc3RzLnB1c2godG9hc3QpO1xuICAgIHRoaXMudXBkYXRlQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLnRvYXN0cy5sYXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldERlc3Ryb3lUaW1lb3V0KHRvYXN0OiBOYlRvYXN0KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRlc3Ryb3kodG9hc3QpLCB0b2FzdC5jb25maWcuZHVyYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uQ2xpY2sodG9hc3RDb21wb25lbnQ6IE5iVG9hc3RDb21wb25lbnQsIHRvYXN0OiBOYlRvYXN0KSB7XG4gICAgdG9hc3RDb21wb25lbnQudG9hc3RDbGlja1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB0b2FzdC5jb25maWcuZGVzdHJveUJ5Q2xpY2spLFxuICAgICAgICB0YWtlVW50aWwodG9hc3RDb21wb25lbnQuZGVzdHJveSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGVzdHJveSh0b2FzdCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUNvbnRhaW5lcigpIHtcbiAgICBwYXRjaCh0aGlzLmNvbnRhaW5lclJlZiwgeyBjb250ZW50OiB0aGlzLnRvYXN0cywgcG9zaXRpb246IHRoaXMucG9zaXRpb24gfSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIE5iVG9hc3RyT3ZlcmxheVdpdGhDb250YWluZXIge1xuICBvdmVybGF5UmVmOiBOYk92ZXJsYXlSZWY7XG4gIHRvYXN0ckNvbnRhaW5lcjogTmJUb2FzdENvbnRhaW5lcjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iVG9hc3RyQ29udGFpbmVyUmVnaXN0cnkge1xuICBwcm90ZWN0ZWQgb3ZlcmxheXM6IE1hcDxOYkdsb2JhbFBvc2l0aW9uLCBOYlRvYXN0ck92ZXJsYXlXaXRoQ29udGFpbmVyPiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3ZlcmxheTogTmJPdmVybGF5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uSGVscGVyOiBOYlBvc2l0aW9uSGVscGVyLFxuICAgIHByb3RlY3RlZCBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KE5CX0RPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSxcbiAgKSB7fVxuXG4gIGdldChwb3NpdGlvbjogTmJHbG9iYWxQb3NpdGlvbik6IE5iVG9hc3RDb250YWluZXIge1xuICAgIGNvbnN0IGxvZ2ljYWxQb3NpdGlvbjogTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uSGVscGVyLnRvTG9naWNhbFBvc2l0aW9uKHBvc2l0aW9uKTtcblxuICAgIGNvbnN0IG92ZXJsYXlXaXRoQ29udGFpbmVyID0gdGhpcy5vdmVybGF5cy5nZXQobG9naWNhbFBvc2l0aW9uKTtcbiAgICBpZiAoIW92ZXJsYXlXaXRoQ29udGFpbmVyIHx8ICF0aGlzLmV4aXN0c0luRG9tKG92ZXJsYXlXaXRoQ29udGFpbmVyLnRvYXN0ckNvbnRhaW5lcikpIHtcbiAgICAgIGlmIChvdmVybGF5V2l0aENvbnRhaW5lcikge1xuICAgICAgICBvdmVybGF5V2l0aENvbnRhaW5lci5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5zdGFudGlhdGVDb250YWluZXIobG9naWNhbFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cy5nZXQobG9naWNhbFBvc2l0aW9uKS50b2FzdHJDb250YWluZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5zdGFudGlhdGVDb250YWluZXIocG9zaXRpb246IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKSB7XG4gICAgY29uc3QgdG9hc3RyT3ZlcmxheVdpdGhDb250YWluZXIgPSB0aGlzLmNyZWF0ZUNvbnRhaW5lcihwb3NpdGlvbik7XG4gICAgdGhpcy5vdmVybGF5cy5zZXQocG9zaXRpb24sIHRvYXN0ck92ZXJsYXlXaXRoQ29udGFpbmVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb250YWluZXIocG9zaXRpb246IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKTogTmJUb2FzdHJPdmVybGF5V2l0aENvbnRhaW5lciB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMucG9zaXRpb25CdWlsZGVyLmdsb2JhbCgpLnBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICBjb25zdCByZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHsgcG9zaXRpb25TdHJhdGVneSB9KTtcbiAgICB0aGlzLmFkZENsYXNzVG9PdmVybGF5SG9zdChyZWYpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IHJlZi5hdHRhY2gobmV3IE5iQ29tcG9uZW50UG9ydGFsKE5iVG9hc3RyQ29udGFpbmVyQ29tcG9uZW50LCBudWxsLCBudWxsLCB0aGlzLmNmcikpO1xuICAgIHJldHVybiB7XG4gICAgICBvdmVybGF5UmVmOiByZWYsXG4gICAgICB0b2FzdHJDb250YWluZXI6IG5ldyBOYlRvYXN0Q29udGFpbmVyKHBvc2l0aW9uLCBjb250YWluZXJSZWYsIHRoaXMucG9zaXRpb25IZWxwZXIpLFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQ2xhc3NUb092ZXJsYXlIb3N0KG92ZXJsYXlSZWY6IE5iT3ZlcmxheVJlZikge1xuICAgIG92ZXJsYXlSZWYuaG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndG9hc3RyLW92ZXJsYXktY29udGFpbmVyJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZXhpc3RzSW5Eb20odG9hc3RDb250YWluZXI6IE5iVG9hc3RDb250YWluZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRvYXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGBOYlRvYXN0clNlcnZpY2VgIHByb3ZpZGVzIGEgY2FwYWJpbGl0eSB0byBidWlsZCB0b2FzdCBub3RpZmljYXRpb25zLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIHRvYXN0ci90b2FzdHItc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqIGBOYlRvYXN0clNlcnZpY2Uuc2hvdyhtZXNzYWdlLCB0aXRsZSwgY29uZmlnKWAgYWNjZXB0cyB0aHJlZSBwYXJhbXMsIHRpdGxlIGFuZCBjb25maWcgYXJlIG9wdGlvbmFsLlxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iVG9hc3RyTW9kdWxlLmZvclJvb3QoKWAgdG8geW91ciBhcHAgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYlRvYXN0ck1vZHVsZS5mb3JSb290KGNvbmZpZyksXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiAqIGBgYFxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIENhbGxpbmcgYE5iVG9hc3RyU2VydmljZS5zaG93KC4uLilgIHdpbGwgcmVuZGVyIG5ldyB0b2FzdCBhbmQgcmV0dXJuIGBOYlRvYXN0clJlZmAgd2l0aFxuICogaGVscCBvZiB3aGljaCB5b3UgbWF5IGNsb3NlIG5ld2x5IGNyZWF0ZWQgdG9hc3QgYnkgY2FsbGluZyBgY2xvc2VgIG1ldGhvZC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgdG9hc3RSZWY6IE5iVG9hc3RSZWYgPSB0aGlzLnRvYXN0clNlcnZpY2Uuc2hvdyguLi4pO1xuICogdG9hc3RSZWYuY2xvc2UoKTtcbiAqIGBgYFxuICpcbiAqIENvbmZpZyBhY2NlcHRzIGZvbGxvd2luZyBvcHRpb25zOlxuICpcbiAqIGBwb3NpdGlvbmAgLSBkZXRlcm1pbmVzIHdoZXJlIG9uIHRoZSBzY3JlZW4gdG9hc3Qgd2lsbCBiZSByZW5kZXJlZC5cbiAqIERlZmF1bHQgaXMgYHRvcC1lbmRgLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoUG9zaXRpb24sIHRvYXN0ci90b2FzdHItcG9zaXRpb25zLmNvbXBvbmVudClcbiAqXG4gKiBgc3RhdHVzYCAtIGNvbG9yaW5nIGFuZCBpY29uIG9mIHRoZSB0b2FzdC5cbiAqIERlZmF1bHQgaXMgYGJhc2ljYC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFN0YXR1cywgdG9hc3RyL3RvYXN0ci1zdGF0dXNlcy5jb21wb25lbnQpXG4gKlxuICogYGR1cmF0aW9uYCAtIHRoZSB0aW1lIGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGJlIGRlc3Ryb3llZC5cbiAqIGAwYCBtZWFucyBlbmRsZXNzIHRvYXN0LCB0aGF0IG1heSBiZSBkZXN0cm95ZWQgYnkgY2xpY2sgb25seS5cbiAqIERlZmF1bHQgaXMgMzAwMCBtcy5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKER1cmF0aW9uLCB0b2FzdHIvdG9hc3RyLWR1cmF0aW9uLmNvbXBvbmVudClcbiAqXG4gKiBgZGVzdHJveUJ5Q2xpY2tgIC0gcHJvdmlkZXMgYSBjYXBhYmlsaXR5IHRvIGRlc3Ryb3kgdG9hc3QgYnkgY2xpY2suXG4gKiBEZWZhdWx0IGlzIHRydWUuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShEZXN0cm95IGJ5IGNsaWNrLCB0b2FzdHIvdG9hc3RyLWRlc3Ryb3ktYnktY2xpY2suY29tcG9uZW50KVxuICpcbiAqIGBwcmV2ZW50RHVwbGljYXRlc2AgLSBkb24ndCBjcmVhdGUgbmV3IHRvYXN0IGlmIGl0IGhhcyB0aGUgc2FtZSB0aXRsZSwgbWVzc2FnZSBhbmQgc3RhdHVzLlxuICogRGVmYXVsdCBpcyBmYWxzZS5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFByZXZlbnQgZHVwbGljYXRlcywgdG9hc3RyL3RvYXN0ci1wcmV2ZW50LWR1cGxpY2F0ZXMuY29tcG9uZW50KVxuICpcbiAqIGBkdXBsaWNhdGVzQmVoYXZpb3VyYCAtIGRldGVybWluZXMgaG93IHRvIHRyZWF0IHRoZSB0b2FzdHMgZHVwbGljYXRpb24uXG4gKiBDb21wYXJlIHdpdGggdGhlIHByZXZpb3VzIG1lc3NhZ2UgYHByZXZpb3VzYFxuICogb3Igd2l0aCBhbGwgdmlzaWJsZSBtZXNzYWdlcyBgYWxsYC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFByZXZlbnQgZHVwbGljYXRlcyBiZWhhdmlvdXIgLCB0b2FzdHIvdG9hc3RyLXByZXZlbnQtZHVwbGljYXRlcy1iZWhhdmlvdXIuY29tcG9uZW50KVxuICpcbiAqIGBsaW1pdGAgLSB0aGUgbnVtYmVyIG9mIHZpc2libGUgdG9hc3RzIGluIHRoZSB0b2FzdCBjb250YWluZXIuIFRoZSBudW1iZXIgb2YgdG9hc3RzIGlzIHVubGltaXRlZCBieSBkZWZhdWx0LlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoUHJldmVudCBkdXBsaWNhdGVzIGJlaGF2aW91ciAsIHRvYXN0ci90b2FzdHItbGltaXQuY29tcG9uZW50KVxuICpcbiAqIGBoYXNJY29uYCAtIGlmIHRydWUgdGhlbiByZW5kZXIgdG9hc3QgaWNvbi5cbiAqIGBpY29uYCAtIHlvdSBjYW4gcGFzcyBpY29uIGNsYXNzIHRoYXQgd2lsbCBiZSBhcHBsaWVkIGludG8gdGhlIHRvYXN0LlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoSGFzIGljb24sIHRvYXN0ci90b2FzdHItaWNvbi5jb21wb25lbnQpXG4gKiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iVG9hc3RyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTkJfVE9BU1RSX0NPTkZJRykgcHJvdGVjdGVkIGdsb2JhbENvbmZpZzogTmJUb2FzdHJDb25maWcsXG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lclJlZ2lzdHJ5OiBOYlRvYXN0ckNvbnRhaW5lclJlZ2lzdHJ5LFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRvYXN0IHdpdGggbWVzc2FnZSwgdGl0bGUgYW5kIHVzZXIgY29uZmlnLlxuICAgKiAqL1xuICBzaG93KG1lc3NhZ2UsIHRpdGxlPywgdXNlckNvbmZpZz86IFBhcnRpYWw8TmJUb2FzdHJDb25maWc+KTogTmJUb2FzdFJlZiB7XG4gICAgY29uc3QgY29uZmlnID0gbmV3IE5iVG9hc3RyQ29uZmlnKHsgLi4udGhpcy5nbG9iYWxDb25maWcsIC4uLnVzZXJDb25maWcgfSk7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJSZWdpc3RyeS5nZXQoY29uZmlnLnBvc2l0aW9uKTtcbiAgICBjb25zdCB0b2FzdCA9IHsgbWVzc2FnZSwgdGl0bGUsIGNvbmZpZyB9O1xuICAgIHJldHVybiBjb250YWluZXIuYXR0YWNoKHRvYXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBzdWNjZXNzIHRvYXN0IHdpdGggbWVzc2FnZSwgdGl0bGUgYW5kIHVzZXIgY29uZmlnLlxuICAgKiAqL1xuICBzdWNjZXNzKG1lc3NhZ2UsIHRpdGxlPywgY29uZmlnPzogUGFydGlhbDxOYlRvYXN0ckNvbmZpZz4pOiBOYlRvYXN0UmVmIHtcbiAgICByZXR1cm4gdGhpcy5zaG93KG1lc3NhZ2UsIHRpdGxlLCB7IC4uLmNvbmZpZywgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgaW5mbyB0b2FzdCB3aXRoIG1lc3NhZ2UsIHRpdGxlIGFuZCB1c2VyIGNvbmZpZy5cbiAgICogKi9cbiAgaW5mbyhtZXNzYWdlLCB0aXRsZT8sIGNvbmZpZz86IFBhcnRpYWw8TmJUb2FzdHJDb25maWc+KTogTmJUb2FzdFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvdyhtZXNzYWdlLCB0aXRsZSwgeyAuLi5jb25maWcsIHN0YXR1czogJ2luZm8nIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHdhcm5pbmcgdG9hc3Qgd2l0aCBtZXNzYWdlLCB0aXRsZSBhbmQgdXNlciBjb25maWcuXG4gICAqICovXG4gIHdhcm5pbmcobWVzc2FnZSwgdGl0bGU/LCBjb25maWc/OiBQYXJ0aWFsPE5iVG9hc3RyQ29uZmlnPik6IE5iVG9hc3RSZWYge1xuICAgIHJldHVybiB0aGlzLnNob3cobWVzc2FnZSwgdGl0bGUsIHsgLi4uY29uZmlnLCBzdGF0dXM6ICd3YXJuaW5nJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBwcmltYXJ5IHRvYXN0IHdpdGggbWVzc2FnZSwgdGl0bGUgYW5kIHVzZXIgY29uZmlnLlxuICAgKiAqL1xuICBwcmltYXJ5KG1lc3NhZ2UsIHRpdGxlPywgY29uZmlnPzogUGFydGlhbDxOYlRvYXN0ckNvbmZpZz4pOiBOYlRvYXN0UmVmIHtcbiAgICByZXR1cm4gdGhpcy5zaG93KG1lc3NhZ2UsIHRpdGxlLCB7IC4uLmNvbmZpZywgc3RhdHVzOiAncHJpbWFyeScgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGFuZ2VyIHRvYXN0IHdpdGggbWVzc2FnZSwgdGl0bGUgYW5kIHVzZXIgY29uZmlnLlxuICAgKiAqL1xuICBkYW5nZXIobWVzc2FnZSwgdGl0bGU/LCBjb25maWc/OiBQYXJ0aWFsPE5iVG9hc3RyQ29uZmlnPik6IE5iVG9hc3RSZWYge1xuICAgIHJldHVybiB0aGlzLnNob3cobWVzc2FnZSwgdGl0bGUsIHsgLi4uY29uZmlnLCBzdGF0dXM6ICdkYW5nZXInIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRlZmF1bHQgdG9hc3Qgd2l0aCBtZXNzYWdlLCB0aXRsZSBhbmQgdXNlciBjb25maWcuXG4gICAqICovXG4gIGRlZmF1bHQobWVzc2FnZSwgdGl0bGU/LCBjb25maWc/OiBQYXJ0aWFsPE5iVG9hc3RyQ29uZmlnPik6IE5iVG9hc3RSZWYge1xuICAgIHJldHVybiB0aGlzLnNob3cobWVzc2FnZSwgdGl0bGUsIHsgLi4uY29uZmlnLCBzdGF0dXM6ICdiYXNpYycgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgY29udHJvbCB0b2FzdCB3aXRoIG1lc3NhZ2UsIHRpdGxlIGFuZCB1c2VyIGNvbmZpZy5cbiAgICogKi9cbiAgY29udHJvbChtZXNzYWdlLCB0aXRsZT8sIGNvbmZpZz86IFBhcnRpYWw8TmJUb2FzdHJDb25maWc+KTogTmJUb2FzdFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdChtZXNzYWdlLCB0aXRsZSwgeyAuLi5jb25maWcsIHN0YXR1czogJ2NvbnRyb2wnIH0pO1xuICB9XG59XG4iXX0=