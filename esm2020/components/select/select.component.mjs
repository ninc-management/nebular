/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject, BehaviorSubject, from } from 'rxjs';
import { startWith, switchMap, takeUntil, filter, map, finalize, take } from 'rxjs/operators';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { ESCAPE } from '../cdk/keycodes/keycodes';
import { NB_DOCUMENT } from '../../theme.options';
import { NbOptionComponent } from '../option/option.component';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';
import { NbFormFieldControl, NbFormFieldControlConfig } from '../form-field/form-field-control';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-position";
import * as i3 from "../cdk/overlay/overlay-trigger";
import * as i4 from "../cdk/a11y/focus-key-manager";
import * as i5 from "../cdk/a11y/a11y.module";
import * as i6 from "../../services/status.service";
import * as i7 from "@angular/common";
import * as i8 from "../cdk/overlay/mapping";
import * as i9 from "../icon/icon.component";
import * as i10 from "../option/option-list.component";
export class NbSelectLabelComponent {
}
NbSelectLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSelectLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NbSelectLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NbSelectLabelComponent, selector: "nb-select-label", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSelectLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-select-label',
                    template: '<ng-content></ng-content>',
                }]
        }] });
export function nbSelectFormFieldControlConfigFactory() {
    const config = new NbFormFieldControlConfig();
    config.supportsSuffix = false;
    return config;
}
/**
 * The `NbSelectComponent` provides a capability to select one of the passed items.
 *
 * @stacked-example(Showcase, select/select-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSelectModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSelectModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean the selection. Both `null` and `undefined` values will also clean the selection.
 *
 * @stacked-example(Clean selection, select/select-clean.component)
 *
 * Select may be bounded using `selected` input:
 *
 * ```html
 * <nb-select [(selected)]="selected"></nb-selected>
 * ```
 *
 * Or you can bind control with form controls or ngModel:
 *
 * @stacked-example(Select form binding, select/select-form.component)
 *
 * Options in the select may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, select/select-groups.component)
 *
 * Select may have a placeholder that will be shown when nothing selected:
 *
 * @stacked-example(Placeholder, select/select-placeholder.component)
 *
 * You can disable select, options and whole groups.
 *
 * @stacked-example(Disabled select, select/select-disabled.component)
 *
 * Also, the custom label may be provided in select.
 * This custom label will be used for instead placeholder when something selected.
 *
 * @stacked-example(Custom label, select/select-label.component)
 *
 * Default `nb-select` size is `medium` and status is `basic`.
 * Select is available in multiple colors using `status` property:
 *
 * @stacked-example(Select statuses, select/select-status.component)
 *
 * There are five select sizes:
 *
 * @stacked-example(Select sizes, select/select-sizes.component)
 *
 * And two additional style types - `filled`:
 *
 * @stacked-example(Filled select, select/select-filled.component)
 *
 * and `hero`:
 *
 * @stacked-example(Select colors, select/select-hero.component)
 *
 * Select is available in different shapes, that could be combined with the other properties:
 *
 * @stacked-example(Select shapes, select/select-shapes.component)
 *
 * By default, the component selects options whose values are strictly equal (`===`) with the select value.
 * To change such behavior, pass a custom comparator function to the `compareWith` attribute.
 *
 * @stacked-example(Select custom comparator, select/select-compare-with.component)
 *
 * You can add an additional icon to the select via the `nb-form-field` component:
 * @stacked-example(Select with icon, select/select-icon.component)
 *
 * @additional-example(Interactive, select/select-interactive.component)
 *
 * @styles
 *
 * select-cursor:
 * select-disabled-cursor:
 * select-min-width:
 * select-outline-width:
 * select-outline-color:
 * select-icon-offset:
 * select-text-font-family:
 * select-placeholder-text-font-family:
 * select-tiny-text-font-size:
 * select-tiny-text-font-weight:
 * select-tiny-text-line-height:
 * select-tiny-placeholder-text-font-size:
 * select-tiny-placeholder-text-font-weight:
 * select-tiny-max-width:
 * select-small-text-font-size:
 * select-small-text-font-weight:
 * select-small-text-line-height:
 * select-small-placeholder-text-font-size:
 * select-small-placeholder-text-font-weight:
 * select-small-max-width:
 * select-medium-text-font-size:
 * select-medium-text-font-weight:
 * select-medium-text-line-height:
 * select-medium-placeholder-text-font-size:
 * select-medium-placeholder-text-font-weight:
 * select-medium-max-width:
 * select-large-text-font-size:
 * select-large-text-font-weight:
 * select-large-text-line-height:
 * select-large-placeholder-text-font-size:
 * select-large-placeholder-text-font-weight:
 * select-large-max-width:
 * select-giant-text-font-size:
 * select-giant-text-font-weight:
 * select-giant-text-line-height:
 * select-giant-placeholder-text-font-size:
 * select-giant-placeholder-text-font-weight:
 * select-giant-max-width:
 * select-rectangle-border-radius:
 * select-semi-round-border-radius:
 * select-round-border-radius:
 * select-outline-border-style:
 * select-outline-border-width:
 * select-outline-tiny-padding:
 * select-outline-small-padding:
 * select-outline-medium-padding:
 * select-outline-large-padding:
 * select-outline-giant-padding:
 * select-outline-basic-icon-color:
 * select-outline-basic-text-color:
 * select-outline-basic-placeholder-text-color:
 * select-outline-basic-background-color:
 * select-outline-basic-border-color:
 * select-outline-basic-focus-background-color:
 * select-outline-basic-focus-border-color:
 * select-outline-basic-hover-background-color:
 * select-outline-basic-hover-border-color:
 * select-outline-basic-disabled-background-color:
 * select-outline-basic-disabled-border-color:
 * select-outline-basic-disabled-icon-color:
 * select-outline-basic-disabled-text-color:
 * select-outline-primary-icon-color:
 * select-outline-primary-text-color:
 * select-outline-primary-placeholder-text-color:
 * select-outline-primary-background-color:
 * select-outline-primary-border-color:
 * select-outline-primary-focus-background-color:
 * select-outline-primary-focus-border-color:
 * select-outline-primary-hover-background-color:
 * select-outline-primary-hover-border-color:
 * select-outline-primary-disabled-background-color:
 * select-outline-primary-disabled-border-color:
 * select-outline-primary-disabled-icon-color:
 * select-outline-primary-disabled-text-color:
 * select-outline-success-icon-color:
 * select-outline-success-text-color:
 * select-outline-success-placeholder-text-color:
 * select-outline-success-background-color:
 * select-outline-success-border-color:
 * select-outline-success-focus-background-color:
 * select-outline-success-focus-border-color:
 * select-outline-success-hover-background-color:
 * select-outline-success-hover-border-color:
 * select-outline-success-disabled-background-color:
 * select-outline-success-disabled-border-color:
 * select-outline-success-disabled-icon-color:
 * select-outline-success-disabled-text-color:
 * select-outline-info-icon-color:
 * select-outline-info-text-color:
 * select-outline-info-placeholder-text-color:
 * select-outline-info-background-color:
 * select-outline-info-border-color:
 * select-outline-info-focus-background-color:
 * select-outline-info-focus-border-color:
 * select-outline-info-hover-background-color:
 * select-outline-info-hover-border-color:
 * select-outline-info-disabled-background-color:
 * select-outline-info-disabled-border-color:
 * select-outline-info-disabled-icon-color:
 * select-outline-info-disabled-text-color:
 * select-outline-warning-icon-color:
 * select-outline-warning-text-color:
 * select-outline-warning-placeholder-text-color:
 * select-outline-warning-background-color:
 * select-outline-warning-border-color:
 * select-outline-warning-focus-background-color:
 * select-outline-warning-focus-border-color:
 * select-outline-warning-hover-background-color:
 * select-outline-warning-hover-border-color:
 * select-outline-warning-disabled-background-color:
 * select-outline-warning-disabled-border-color:
 * select-outline-warning-disabled-icon-color:
 * select-outline-warning-disabled-text-color:
 * select-outline-danger-icon-color:
 * select-outline-danger-text-color:
 * select-outline-danger-placeholder-text-color:
 * select-outline-danger-background-color:
 * select-outline-danger-border-color:
 * select-outline-danger-focus-background-color:
 * select-outline-danger-focus-border-color:
 * select-outline-danger-hover-background-color:
 * select-outline-danger-hover-border-color:
 * select-outline-danger-disabled-background-color:
 * select-outline-danger-disabled-border-color:
 * select-outline-danger-disabled-icon-color:
 * select-outline-danger-disabled-text-color:
 * select-outline-control-icon-color:
 * select-outline-control-text-color:
 * select-outline-control-placeholder-text-color:
 * select-outline-control-background-color:
 * select-outline-control-border-color:
 * select-outline-control-focus-background-color:
 * select-outline-control-focus-border-color:
 * select-outline-control-hover-background-color:
 * select-outline-control-hover-border-color:
 * select-outline-control-disabled-background-color:
 * select-outline-control-disabled-border-color:
 * select-outline-control-disabled-icon-color:
 * select-outline-control-disabled-text-color:
 * select-outline-adjacent-border-style:
 * select-outline-adjacent-border-width:
 * select-outline-basic-open-border-color:
 * select-outline-basic-adjacent-border-color:
 * select-outline-primary-open-border-color:
 * select-outline-primary-adjacent-border-color:
 * select-outline-success-open-border-color:
 * select-outline-success-adjacent-border-color:
 * select-outline-info-open-border-color:
 * select-outline-info-adjacent-border-color:
 * select-outline-warning-open-border-color:
 * select-outline-warning-adjacent-border-color:
 * select-outline-danger-open-border-color:
 * select-outline-danger-adjacent-border-color:
 * select-outline-control-open-border-color:
 * select-outline-control-adjacent-border-color:
 * select-filled-border-style:
 * select-filled-border-width:
 * select-filled-tiny-padding:
 * select-filled-small-padding:
 * select-filled-medium-padding:
 * select-filled-large-padding:
 * select-filled-giant-padding:
 * select-filled-basic-background-color:
 * select-filled-basic-border-color:
 * select-filled-basic-icon-color:
 * select-filled-basic-text-color:
 * select-filled-basic-placeholder-text-color:
 * select-filled-basic-focus-background-color:
 * select-filled-basic-focus-border-color:
 * select-filled-basic-hover-background-color:
 * select-filled-basic-hover-border-color:
 * select-filled-basic-disabled-background-color:
 * select-filled-basic-disabled-border-color:
 * select-filled-basic-disabled-icon-color:
 * select-filled-basic-disabled-text-color:
 * select-filled-primary-background-color:
 * select-filled-primary-border-color:
 * select-filled-primary-icon-color:
 * select-filled-primary-text-color:
 * select-filled-primary-placeholder-text-color:
 * select-filled-primary-focus-background-color:
 * select-filled-primary-focus-border-color:
 * select-filled-primary-hover-background-color:
 * select-filled-primary-hover-border-color:
 * select-filled-primary-disabled-background-color:
 * select-filled-primary-disabled-border-color:
 * select-filled-primary-disabled-icon-color:
 * select-filled-primary-disabled-text-color:
 * select-filled-success-background-color:
 * select-filled-success-border-color:
 * select-filled-success-icon-color:
 * select-filled-success-text-color:
 * select-filled-success-placeholder-text-color:
 * select-filled-success-focus-background-color:
 * select-filled-success-focus-border-color:
 * select-filled-success-hover-background-color:
 * select-filled-success-hover-border-color:
 * select-filled-success-disabled-background-color:
 * select-filled-success-disabled-border-color:
 * select-filled-success-disabled-icon-color:
 * select-filled-success-disabled-text-color:
 * select-filled-info-background-color:
 * select-filled-info-border-color:
 * select-filled-info-icon-color:
 * select-filled-info-text-color:
 * select-filled-info-placeholder-text-color:
 * select-filled-info-focus-background-color:
 * select-filled-info-focus-border-color:
 * select-filled-info-hover-background-color:
 * select-filled-info-hover-border-color:
 * select-filled-info-disabled-background-color:
 * select-filled-info-disabled-border-color:
 * select-filled-info-disabled-icon-color:
 * select-filled-info-disabled-text-color:
 * select-filled-warning-background-color:
 * select-filled-warning-border-color:
 * select-filled-warning-icon-color:
 * select-filled-warning-text-color:
 * select-filled-warning-placeholder-text-color:
 * select-filled-warning-focus-background-color:
 * select-filled-warning-focus-border-color:
 * select-filled-warning-hover-background-color:
 * select-filled-warning-hover-border-color:
 * select-filled-warning-disabled-background-color:
 * select-filled-warning-disabled-border-color:
 * select-filled-warning-disabled-icon-color:
 * select-filled-warning-disabled-text-color:
 * select-filled-danger-background-color:
 * select-filled-danger-border-color:
 * select-filled-danger-icon-color:
 * select-filled-danger-text-color:
 * select-filled-danger-placeholder-text-color:
 * select-filled-danger-focus-background-color:
 * select-filled-danger-focus-border-color:
 * select-filled-danger-hover-background-color:
 * select-filled-danger-hover-border-color:
 * select-filled-danger-disabled-background-color:
 * select-filled-danger-disabled-border-color:
 * select-filled-danger-disabled-icon-color:
 * select-filled-danger-disabled-text-color:
 * select-filled-control-background-color:
 * select-filled-control-border-color:
 * select-filled-control-icon-color:
 * select-filled-control-text-color:
 * select-filled-control-placeholder-text-color:
 * select-filled-control-focus-background-color:
 * select-filled-control-focus-border-color:
 * select-filled-control-hover-background-color:
 * select-filled-control-hover-border-color:
 * select-filled-control-disabled-background-color:
 * select-filled-control-disabled-border-color:
 * select-filled-control-disabled-icon-color:
 * select-filled-control-disabled-text-color:
 * select-hero-tiny-padding:
 * select-hero-small-padding:
 * select-hero-medium-padding:
 * select-hero-large-padding:
 * select-hero-giant-padding:
 * select-hero-basic-left-background-color:
 * select-hero-basic-right-background-color:
 * select-hero-basic-icon-color:
 * select-hero-basic-text-color:
 * select-hero-basic-placeholder-text-color:
 * select-hero-basic-focus-left-background-color:
 * select-hero-basic-focus-right-background-color:
 * select-hero-basic-hover-left-background-color:
 * select-hero-basic-hover-right-background-color:
 * select-hero-basic-disabled-background-color:
 * select-hero-basic-disabled-icon-color:
 * select-hero-basic-disabled-text-color:
 * select-hero-primary-left-background-color:
 * select-hero-primary-right-background-color:
 * select-hero-primary-icon-color:
 * select-hero-primary-text-color:
 * select-hero-primary-placeholder-text-color:
 * select-hero-primary-focus-left-background-color:
 * select-hero-primary-focus-right-background-color:
 * select-hero-primary-hover-left-background-color:
 * select-hero-primary-hover-right-background-color:
 * select-hero-primary-disabled-background-color:
 * select-hero-primary-disabled-icon-color:
 * select-hero-primary-disabled-text-color:
 * select-hero-success-left-background-color:
 * select-hero-success-right-background-color:
 * select-hero-success-icon-color:
 * select-hero-success-text-color:
 * select-hero-success-placeholder-text-color:
 * select-hero-success-focus-left-background-color:
 * select-hero-success-focus-right-background-color:
 * select-hero-success-hover-left-background-color:
 * select-hero-success-hover-right-background-color:
 * select-hero-success-disabled-background-color:
 * select-hero-success-disabled-icon-color:
 * select-hero-success-disabled-text-color:
 * select-hero-info-left-background-color:
 * select-hero-info-right-background-color:
 * select-hero-info-icon-color:
 * select-hero-info-text-color:
 * select-hero-info-placeholder-text-color:
 * select-hero-info-focus-left-background-color:
 * select-hero-info-focus-right-background-color:
 * select-hero-info-hover-left-background-color:
 * select-hero-info-hover-right-background-color:
 * select-hero-info-disabled-background-color:
 * select-hero-info-disabled-icon-color:
 * select-hero-info-disabled-text-color:
 * select-hero-warning-left-background-color:
 * select-hero-warning-right-background-color:
 * select-hero-warning-icon-color:
 * select-hero-warning-text-color:
 * select-hero-warning-placeholder-text-color:
 * select-hero-warning-focus-left-background-color:
 * select-hero-warning-focus-right-background-color:
 * select-hero-warning-hover-left-background-color:
 * select-hero-warning-hover-right-background-color:
 * select-hero-warning-disabled-background-color:
 * select-hero-warning-disabled-icon-color:
 * select-hero-warning-disabled-text-color:
 * select-hero-danger-left-background-color:
 * select-hero-danger-right-background-color:
 * select-hero-danger-icon-color:
 * select-hero-danger-text-color:
 * select-hero-danger-placeholder-text-color:
 * select-hero-danger-focus-left-background-color:
 * select-hero-danger-focus-right-background-color:
 * select-hero-danger-hover-left-background-color:
 * select-hero-danger-hover-right-background-color:
 * select-hero-danger-disabled-background-color:
 * select-hero-danger-disabled-icon-color:
 * select-hero-danger-disabled-text-color:
 * select-hero-control-left-background-color:
 * select-hero-control-right-background-color:
 * select-hero-control-icon-color:
 * select-hero-control-text-color:
 * select-hero-control-placeholder-text-color:
 * select-hero-control-focus-left-background-color:
 * select-hero-control-focus-right-background-color:
 * select-hero-control-hover-left-background-color:
 * select-hero-control-hover-right-background-color:
 * select-hero-control-disabled-background-color:
 * select-hero-control-disabled-icon-color:
 * select-hero-control-disabled-text-color:
 * */
export class NbSelectComponent {
    constructor(document, overlay, hostRef, positionBuilder, triggerStrategyBuilder, cd, focusKeyManagerFactoryService, focusMonitor, renderer, zone, statusService) {
        this.document = document;
        this.overlay = overlay;
        this.hostRef = hostRef;
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.cd = cd;
        this.focusKeyManagerFactoryService = focusKeyManagerFactoryService;
        this.focusMonitor = focusMonitor;
        this.renderer = renderer;
        this.zone = zone;
        this.statusService = statusService;
        /**
         * Select size, available sizes:
         * `tiny`, `small`, `medium` (default), `large`, `giant`
         */
        this.size = 'medium';
        /**
         * Select status (adds specific styles):
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.status = 'basic';
        /**
         * Select shapes: `rectangle` (default), `round`, `semi-round`
         */
        this.shape = 'rectangle';
        /**
         * Select appearances: `outline` (default), `filled`, `hero`
         */
        this.appearance = 'outline';
        this._fullWidth = false;
        /**
         * Renders select placeholder if nothing selected.
         * */
        this.placeholder = '';
        this._compareWith = (v1, v2) => v1 === v2;
        this._multiple = false;
        /**
         * Determines options overlay offset (in pixels).
         **/
        this.optionsOverlayOffset = 8;
        /**
         * Determines options overlay scroll strategy.
         **/
        this.scrollStrategy = 'block';
        /**
         * Will be emitted when selected value changes.
         * */
        this.selectedChange = new EventEmitter();
        /**
         * List of selected options.
         * */
        this.selectionModel = [];
        /**
         * Current overlay position because of we have to toggle overlayPosition
         * in [ngClass] direction and this directive can use only string.
         */
        this.overlayPosition = '';
        this.alive = true;
        this.destroy$ = new Subject();
        /**
         * Function passed through control value accessor to propagate changes.
         * */
        this.onChange = () => { };
        this.onTouched = () => { };
        /*
         * @docs-private
         **/
        this.status$ = new BehaviorSubject(this.status);
        /*
         * @docs-private
         **/
        this.size$ = new BehaviorSubject(this.size);
        /*
         * @docs-private
         **/
        this.focused$ = new BehaviorSubject(false);
        /*
         * @docs-private
         **/
        this.disabled$ = new BehaviorSubject(this.disabled);
        /*
         * @docs-private
         **/
        this.fullWidth$ = new BehaviorSubject(this.fullWidth);
    }
    /**
     * Specifies width (in pixels) to be set on `nb-option`s container (`nb-option-list`)
     * */
    get optionsWidth() {
        return this._optionsWidth ?? this.hostWidth;
    }
    set optionsWidth(value) {
        this._optionsWidth = value;
    }
    /**
     * Adds `outline` styles
     */
    get outline() {
        return this.appearance === 'outline';
    }
    set outline(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'outline';
        }
    }
    /**
     * Adds `filled` styles
     */
    get filled() {
        return this.appearance === 'filled';
    }
    set filled(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'filled';
        }
    }
    /**
     * Adds `hero` styles
     */
    get hero() {
        return this.appearance === 'hero';
    }
    set hero(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'hero';
        }
    }
    /**
     * Disables the select
     */
    get disabled() {
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    /**
     * If set element will fill its container
     */
    get fullWidth() {
        return this._fullWidth;
    }
    set fullWidth(value) {
        this._fullWidth = convertToBoolProperty(value);
    }
    /**
     * A function to compare option value with selected value.
     * By default, values are compared with strict equality (`===`).
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        if (typeof fn !== 'function') {
            return;
        }
        this._compareWith = fn;
        if (this.selectionModel.length && this.canSelectValue()) {
            this.setSelection(this.selected);
        }
    }
    /**
     * Accepts selected item or array of selected items.
     * */
    set selected(value) {
        this.writeValue(value);
    }
    get selected() {
        return this.multiple ? this.selectionModel.map((o) => o.value) : this.selectionModel[0].value;
    }
    /**
     * Gives capability just write `multiple` over the element.
     * */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = convertToBoolProperty(value);
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    /**
     * Determines is select opened.
     * */
    get isOpen() {
        return this.ref && this.ref.hasAttached();
    }
    /**
     * Determines is select hidden.
     * */
    get isHidden() {
        return !this.isOpen;
    }
    /**
     * Returns width of the select button.
     * */
    get hostWidth() {
        return this.button.nativeElement.getBoundingClientRect().width;
    }
    get selectButtonClasses() {
        const classes = [];
        if (!this.selectionModel.length) {
            classes.push('placeholder');
        }
        if (!this.selectionModel.length && !this.placeholder) {
            classes.push('empty');
        }
        if (this.isOpen) {
            classes.push(this.overlayPosition);
        }
        return classes;
    }
    /**
     * Content rendered in the label.
     * */
    get selectionView() {
        if (this.selectionModel.length > 1) {
            return this.selectionModel.map((option) => option.content).join(', ');
        }
        return this.selectionModel[0].content;
    }
    ngOnChanges({ disabled, status, size, fullWidth }) {
        if (disabled) {
            this.disabled$.next(disabled.currentValue);
        }
        if (status) {
            this.status$.next(status.currentValue);
        }
        if (size) {
            this.size$.next(size.currentValue);
        }
        if (fullWidth) {
            this.fullWidth$.next(this.fullWidth);
        }
    }
    ngAfterContentInit() {
        this.options.changes
            .pipe(startWith(this.options), filter(() => this.queue != null && this.canSelectValue()), 
        // Call 'writeValue' when current change detection run is finished.
        // When writing is finished, change detection starts again, since
        // microtasks queue is empty.
        // Prevents ExpressionChangedAfterItHasBeenCheckedError.
        switchMap((options) => from(Promise.resolve(options))), takeUntil(this.destroy$))
            .subscribe(() => this.writeValue(this.queue));
    }
    ngAfterViewInit() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnButtonFocus();
        this.subscribeOnTriggers();
        this.subscribeOnOptionClick();
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.hostRef.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this.alive = false;
        this.destroy$.next();
        this.destroy$.complete();
        if (this.ref) {
            this.ref.dispose();
        }
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    }
    show() {
        if (this.shouldShow()) {
            this.attachToOverlay();
            this.positionStrategy.positionChange.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
                this.setActiveOption();
            });
            this.cd.markForCheck();
        }
    }
    hide() {
        if (this.isOpen) {
            this.ref.detach();
            this.cd.markForCheck();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    }
    writeValue(value) {
        if (!this.alive) {
            return;
        }
        if (this.canSelectValue() && value != null) {
            this.setSelection(value);
            if (this.selectionModel.length) {
                this.queue = null;
            }
        }
        else {
            this.queue = value;
        }
    }
    /**
     * Selects option or clear all selected options if value is null.
     * */
    handleOptionClick(option) {
        this.queue = null;
        if (option.value == null) {
            this.reset();
        }
        else {
            this.selectOption(option);
        }
        this.cd.markForCheck();
    }
    /**
     * Deselect all selected options.
     * */
    reset() {
        this.selectionModel.forEach((option) => option.deselect());
        this.selectionModel = [];
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(this.multiple ? [] : null);
    }
    /**
     * Determines how to select option as multiple or single.
     * */
    selectOption(option) {
        if (this.multiple) {
            this.handleMultipleSelect(option);
        }
        else {
            this.handleSingleSelect(option);
        }
    }
    /**
     * Select single option.
     * */
    handleSingleSelect(option) {
        const selected = this.selectionModel.pop();
        if (selected && !this._compareWith(selected.value, option.value)) {
            selected.deselect();
        }
        this.selectionModel = [option];
        option.select();
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(option.value);
    }
    /**
     * Select for multiple options.
     * */
    handleMultipleSelect(option) {
        if (option.selected) {
            this.selectionModel = this.selectionModel.filter((s) => !this._compareWith(s.value, option.value));
            option.deselect();
        }
        else {
            this.selectionModel.push(option);
            option.select();
        }
        this.emitSelected(this.selectionModel.map((opt) => opt.value));
    }
    attachToOverlay() {
        if (!this.ref) {
            this.createOverlay();
            this.subscribeOnPositionChange();
            this.createKeyManager();
            this.subscribeOnOverlayKeys();
        }
        this.ref.attach(this.portal);
    }
    setActiveOption() {
        if (this.selectionModel.length) {
            this.keyManager.setActiveItem(this.selectionModel[0]);
        }
        else {
            this.keyManager.setFirstItemActive();
        }
    }
    createOverlay() {
        const scrollStrategy = this.createScrollStrategy();
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy,
            panelClass: this.optionsPanelClass,
        });
    }
    createKeyManager() {
        this.keyManager = this.focusKeyManagerFactoryService.create(this.options).withTypeAhead(200);
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.button)
            .position(NbPosition.BOTTOM)
            .offset(this.optionsOverlayOffset)
            .adjustment(NbAdjustment.VERTICAL);
    }
    createScrollStrategy() {
        return this.overlay.scrollStrategies[this.scrollStrategy]();
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.CLICK)
            .host(this.hostRef.nativeElement)
            .container(() => this.getContainer())
            .build();
    }
    subscribeOnTriggers() {
        this.triggerStrategy.show$.subscribe(() => this.show());
        this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(($event) => {
            this.hide();
            if (!this.isClickedWithinComponent($event)) {
                this.onTouched();
            }
        });
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange.pipe(takeUntil(this.destroy$)).subscribe((position) => {
            this.overlayPosition = position;
            this.cd.detectChanges();
        });
    }
    subscribeOnOptionClick() {
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.options.changes
            .pipe(startWith(this.options), switchMap((options) => {
            return merge(...options.map((option) => option.click));
        }), takeUntil(this.destroy$))
            .subscribe((clickedOption) => this.handleOptionClick(clickedOption));
    }
    subscribeOnOverlayKeys() {
        this.ref
            .keydownEvents()
            .pipe(filter(() => this.isOpen), takeUntil(this.destroy$))
            .subscribe((event) => {
            if (event.keyCode === ESCAPE) {
                this.button.nativeElement.focus();
                this.hide();
            }
            else {
                this.keyManager.onKeydown(event);
            }
        });
        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.hide();
            this.onTouched();
        });
    }
    subscribeOnButtonFocus() {
        this.focusMonitor
            .monitor(this.button)
            .pipe(map((origin) => !!origin), finalize(() => this.focusMonitor.stopMonitoring(this.button)), takeUntil(this.destroy$))
            .subscribe(this.focused$);
    }
    getContainer() {
        return (this.ref &&
            this.ref.hasAttached() &&
            {
                location: {
                    nativeElement: this.ref.overlayElement,
                },
            });
    }
    /**
     * Propagate selected value.
     * */
    emitSelected(selected) {
        this.onChange(selected);
        this.selectedChange.emit(selected);
    }
    /**
     * Set selected value in model.
     * */
    setSelection(value) {
        const isResetValue = value == null;
        let safeValue = value;
        if (this.multiple) {
            safeValue = value ?? [];
        }
        const isArray = Array.isArray(safeValue);
        if (this.multiple && !isArray && !isResetValue) {
            throw new Error("Can't assign single value if select is marked as multiple");
        }
        if (!this.multiple && isArray) {
            throw new Error("Can't assign array if select is not marked as multiple");
        }
        const previouslySelectedOptions = this.selectionModel;
        this.selectionModel = [];
        if (this.multiple) {
            safeValue.forEach((option) => this.selectValue(option));
        }
        else {
            this.selectValue(safeValue);
        }
        // find options which were selected before and trigger deselect
        previouslySelectedOptions
            .filter((option) => !this.selectionModel.includes(option))
            .forEach((option) => option.deselect());
        this.cd.markForCheck();
    }
    /**
     * Selects value.
     * */
    selectValue(value) {
        if (value == null) {
            return;
        }
        const corresponding = this.options.find((option) => this._compareWith(option.value, value));
        if (corresponding) {
            corresponding.select();
            this.selectionModel.push(corresponding);
        }
    }
    shouldShow() {
        return this.isHidden && this.options?.length > 0;
    }
    /**
     * Sets touched if focus moved outside of button and overlay,
     * ignoring the case when focus moved to options overlay.
     */
    trySetTouched() {
        if (this.isHidden) {
            this.onTouched();
        }
    }
    isClickedWithinComponent($event) {
        return this.hostRef.nativeElement === $event.target || this.hostRef.nativeElement.contains($event.target);
    }
    canSelectValue() {
        return !!(this.options && this.options.length);
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get info() {
        return this.status === 'info';
    }
    get success() {
        return this.status === 'success';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get rectangle() {
        return this.shape === 'rectangle';
    }
    get round() {
        return this.shape === 'round';
    }
    get semiRound() {
        return this.shape === 'semi-round';
    }
}
NbSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSelectComponent, deps: [{ token: NB_DOCUMENT }, { token: i1.NbOverlayService }, { token: i0.ElementRef }, { token: i2.NbPositionBuilderService }, { token: i3.NbTriggerStrategyBuilderService }, { token: i0.ChangeDetectorRef }, { token: i4.NbFocusKeyManagerFactoryService }, { token: i5.NbFocusMonitor }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i6.NbStatusService }], target: i0.ɵɵFactoryTarget.Component });
NbSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NbSelectComponent, selector: "nb-select", inputs: { size: "size", status: "status", shape: "shape", appearance: "appearance", optionsListClass: "optionsListClass", optionsPanelClass: "optionsPanelClass", optionsWidth: "optionsWidth", outline: "outline", filled: "filled", hero: "hero", disabled: "disabled", fullWidth: "fullWidth", placeholder: "placeholder", compareWith: "compareWith", selected: "selected", multiple: "multiple", optionsOverlayOffset: "optionsOverlayOffset", scrollStrategy: "scrollStrategy" }, outputs: { selectedChange: "selectedChange" }, host: { properties: { "class.appearance-outline": "this.outline", "class.appearance-filled": "this.filled", "class.appearance-hero": "this.hero", "class.full-width": "this.fullWidth", "class": "this.additionalClasses", "class.open": "this.isOpen", "class.size-tiny": "this.tiny", "class.size-small": "this.small", "class.size-medium": "this.medium", "class.size-large": "this.large", "class.size-giant": "this.giant", "class.status-primary": "this.primary", "class.status-info": "this.info", "class.status-success": "this.success", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-basic": "this.basic", "class.status-control": "this.control", "class.shape-rectangle": "this.rectangle", "class.shape-round": "this.round", "class.shape-semi-round": "this.semiRound" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NbSelectComponent),
            multi: true,
        },
        { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent },
        { provide: NbFormFieldControl, useExisting: NbSelectComponent },
        { provide: NbFormFieldControlConfig, useFactory: nbSelectFormFieldControlConfigFactory },
    ], queries: [{ propertyName: "customLabel", first: true, predicate: NbSelectLabelComponent, descendants: true }, { propertyName: "options", predicate: NbOptionComponent, descendants: true }], viewQueries: [{ propertyName: "portal", first: true, predicate: NbPortalDirective, descendants: true }, { propertyName: "button", first: true, predicate: ["selectButton"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<button\n  [disabled]=\"disabled\"\n  [ngClass]=\"selectButtonClasses\"\n  (blur)=\"trySetTouched()\"\n  (keydown.arrowDown)=\"show()\"\n  (keydown.arrowUp)=\"show()\"\n  class=\"select-button\"\n  type=\"button\"\n  #selectButton\n>\n  <span (click)=\"disabled && $event.stopPropagation()\">\n    <ng-container *ngIf=\"selectionModel.length; else placeholderTemplate\">\n      <ng-container *ngIf=\"customLabel; else defaultSelectionTemplate\">\n        <ng-content select=\"nb-select-label\"></ng-content>\n      </ng-container>\n\n      <ng-template #defaultSelectionTemplate>{{ selectionView }}</ng-template>\n    </ng-container>\n\n    <ng-template #placeholderTemplate>{{ placeholder }}</ng-template>\n  </span>\n\n  <nb-icon\n    icon=\"chevron-down-outline\"\n    pack=\"nebular-essentials\"\n    (click)=\"disabled && $event.stopPropagation()\"\n    aria-hidden=\"true\"\n  >\n  </nb-icon>\n</button>\n\n<nb-option-list\n  *nbPortal\n  [size]=\"size\"\n  [position]=\"overlayPosition\"\n  [style.width.px]=\"optionsWidth\"\n  [ngClass]=\"optionsListClass\"\n>\n  <ng-content select=\"nb-option, nb-option-group\"></ng-content>\n</nb-option-list>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:inline-block;max-width:100%}[dir=ltr] :host .select-button{text-align:left}[dir=ltr] :host .select-button nb-icon{right:.2em}[dir=rtl] :host .select-button{text-align:right}[dir=rtl] :host .select-button nb-icon{left:.2em}:host(.full-width){width:100%}:host(.nb-transition) .select-button{transition-duration:.15s;transition-property:background-color,border-color,border-radius,box-shadow,color;transition-timing-function:ease-in}.select-button{position:relative;width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}nb-icon{font-size:1.5em;position:absolute;top:50%;transform:translateY(-50%);transition-duration:.15s;transition-property:transform;transition-timing-function:ease-in}[dir=ltr] nb-icon{right:.5rem}[dir=rtl] nb-icon{left:.5rem}:host(.open) nb-icon{transform:translateY(-50%) rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NbPortalDirective, selector: "[nbPortal]" }, { kind: "component", type: i9.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i10.NbOptionListComponent, selector: "nb-option-list", inputs: ["size", "position"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-select', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbSelectComponent),
                            multi: true,
                        },
                        { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent },
                        { provide: NbFormFieldControl, useExisting: NbSelectComponent },
                        { provide: NbFormFieldControlConfig, useFactory: nbSelectFormFieldControlConfigFactory },
                    ], template: "<button\n  [disabled]=\"disabled\"\n  [ngClass]=\"selectButtonClasses\"\n  (blur)=\"trySetTouched()\"\n  (keydown.arrowDown)=\"show()\"\n  (keydown.arrowUp)=\"show()\"\n  class=\"select-button\"\n  type=\"button\"\n  #selectButton\n>\n  <span (click)=\"disabled && $event.stopPropagation()\">\n    <ng-container *ngIf=\"selectionModel.length; else placeholderTemplate\">\n      <ng-container *ngIf=\"customLabel; else defaultSelectionTemplate\">\n        <ng-content select=\"nb-select-label\"></ng-content>\n      </ng-container>\n\n      <ng-template #defaultSelectionTemplate>{{ selectionView }}</ng-template>\n    </ng-container>\n\n    <ng-template #placeholderTemplate>{{ placeholder }}</ng-template>\n  </span>\n\n  <nb-icon\n    icon=\"chevron-down-outline\"\n    pack=\"nebular-essentials\"\n    (click)=\"disabled && $event.stopPropagation()\"\n    aria-hidden=\"true\"\n  >\n  </nb-icon>\n</button>\n\n<nb-option-list\n  *nbPortal\n  [size]=\"size\"\n  [position]=\"overlayPosition\"\n  [style.width.px]=\"optionsWidth\"\n  [ngClass]=\"optionsListClass\"\n>\n  <ng-content select=\"nb-option, nb-option-group\"></ng-content>\n</nb-option-list>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:inline-block;max-width:100%}[dir=ltr] :host .select-button{text-align:left}[dir=ltr] :host .select-button nb-icon{right:.2em}[dir=rtl] :host .select-button{text-align:right}[dir=rtl] :host .select-button nb-icon{left:.2em}:host(.full-width){width:100%}:host(.nb-transition) .select-button{transition-duration:.15s;transition-property:background-color,border-color,border-radius,box-shadow,color;transition-timing-function:ease-in}.select-button{position:relative;width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}nb-icon{font-size:1.5em;position:absolute;top:50%;transform:translateY(-50%);transition-duration:.15s;transition-property:transform;transition-timing-function:ease-in}[dir=ltr] nb-icon{right:.5rem}[dir=rtl] nb-icon{left:.5rem}:host(.open) nb-icon{transform:translateY(-50%) rotate(180deg)}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i1.NbOverlayService }, { type: i0.ElementRef }, { type: i2.NbPositionBuilderService }, { type: i3.NbTriggerStrategyBuilderService }, { type: i0.ChangeDetectorRef }, { type: i4.NbFocusKeyManagerFactoryService }, { type: i5.NbFocusMonitor }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i6.NbStatusService }]; }, propDecorators: { size: [{
                type: Input
            }], status: [{
                type: Input
            }], shape: [{
                type: Input
            }], appearance: [{
                type: Input
            }], optionsListClass: [{
                type: Input
            }], optionsPanelClass: [{
                type: Input
            }], optionsWidth: [{
                type: Input
            }], outline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-outline']
            }], filled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-filled']
            }], hero: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-hero']
            }], disabled: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.full-width']
            }], placeholder: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], selected: [{
                type: Input
            }], multiple: [{
                type: Input
            }], optionsOverlayOffset: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }], selectedChange: [{
                type: Output
            }], options: [{
                type: ContentChildren,
                args: [NbOptionComponent, { descendants: true }]
            }], customLabel: [{
                type: ContentChild,
                args: [NbSelectLabelComponent]
            }], portal: [{
                type: ViewChild,
                args: [NbPortalDirective]
            }], button: [{
                type: ViewChild,
                args: ['selectButton', { read: ElementRef }]
            }], isOpen: [{
                type: HostBinding,
                args: ['class.open']
            }], tiny: [{
                type: HostBinding,
                args: ['class.size-tiny']
            }], small: [{
                type: HostBinding,
                args: ['class.size-small']
            }], medium: [{
                type: HostBinding,
                args: ['class.size-medium']
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }], giant: [{
                type: HostBinding,
                args: ['class.size-giant']
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], rectangle: [{
                type: HostBinding,
                args: ['class.shape-rectangle']
            }], round: [{
                type: HostBinding,
                args: ['class.shape-round']
            }], semiRound: [{
                type: HostBinding,
                args: ['class.shape-semi-round']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFFTixTQUFTLEdBS1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlGLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFnQixpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRixPQUFPLEVBQUUsU0FBUyxFQUFzRCxNQUFNLGdDQUFnQyxDQUFDO0FBRS9HLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUlsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRC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V0FBVzt1QkFBQyxPQUFPO2dCQVdWLGNBQWM7c0JBQXZCLE1BQU07Z0JBTW9ELE9BQU87c0JBQWpFLGVBQWU7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUtuQixXQUFXO3NCQUFoRCxZQUFZO3VCQUFDLHNCQUFzQjtnQkFLTixNQUFNO3NCQUFuQyxTQUFTO3VCQUFDLGlCQUFpQjtnQkFFcUIsTUFBTTtzQkFBdEQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQU0zQyxNQUFNO3NCQURULFdBQVc7dUJBQUMsWUFBWTtnQkFnZ0JyQixJQUFJO3NCQURQLFdBQVc7dUJBQUMsaUJBQWlCO2dCQUsxQixLQUFLO3NCQURSLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUszQixNQUFNO3NCQURULFdBQVc7dUJBQUMsbUJBQW1CO2dCQUs1QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUszQixLQUFLO3NCQURSLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUszQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQUsvQixJQUFJO3NCQURQLFdBQVc7dUJBQUMsbUJBQW1CO2dCQUs1QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQUsvQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQUsvQixNQUFNO3NCQURULFdBQVc7dUJBQUMscUJBQXFCO2dCQUs5QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsb0JBQW9CO2dCQUs3QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQUsvQixTQUFTO3NCQURaLFdBQVc7dUJBQUMsdUJBQXVCO2dCQUtoQyxLQUFLO3NCQURSLFdBQVc7dUJBQUMsbUJBQW1CO2dCQUs1QixTQUFTO3NCQURaLFdBQVc7dUJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDbGFzcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0LCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCBmaWx0ZXIsIG1hcCwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5iU3RhdHVzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0YXR1cy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE5iQWRqdXN0bWVudCxcbiAgTmJQb3NpdGlvbixcbiAgTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxufSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXBvc2l0aW9uJztcbmltcG9ydCB7IE5iT3ZlcmxheVJlZiwgTmJQb3J0YWxEaXJlY3RpdmUsIE5iU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iT3ZlcmxheVNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXNlcnZpY2UnO1xuaW1wb3J0IHsgTmJUcmlnZ2VyLCBOYlRyaWdnZXJTdHJhdGVneSwgTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktdHJpZ2dlcic7XG5pbXBvcnQgeyBOYkZvY3VzS2V5TWFuYWdlciwgTmJGb2N1c0tleU1hbmFnZXJGYWN0b3J5U2VydmljZSB9IGZyb20gJy4uL2Nkay9hMTF5L2ZvY3VzLWtleS1tYW5hZ2VyJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJy4uL2Nkay9rZXljb2Rlcy9rZXljb2Rlcyc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudFNpemUgfSBmcm9tICcuLi9jb21wb25lbnQtc2l6ZSc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudFNoYXBlIH0gZnJvbSAnLi4vY29tcG9uZW50LXNoYXBlJztcbmltcG9ydCB7IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgfSBmcm9tICcuLi9jb21wb25lbnQtc3RhdHVzJztcbmltcG9ydCB7IE5CX0RPQ1VNRU5UIH0gZnJvbSAnLi4vLi4vdGhlbWUub3B0aW9ucyc7XG5pbXBvcnQgeyBOYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL29wdGlvbi9vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5CX1NFTEVDVF9JTkpFQ1RJT05fVE9LRU4gfSBmcm9tICcuL3NlbGVjdC1pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IE5iRm9ybUZpZWxkQ29udHJvbCwgTmJGb3JtRmllbGRDb250cm9sQ29uZmlnIH0gZnJvbSAnLi4vZm9ybS1maWVsZC9mb3JtLWZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHsgTmJGb2N1c01vbml0b3IgfSBmcm9tICcuLi9jZGsvYTExeS9hMTF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYlNjcm9sbFN0cmF0ZWdpZXMgfSBmcm9tICcuLi9jZGsvYWRhcHRlci9ibG9jay1zY3JvbGwtc3RyYXRlZ3ktYWRhcHRlcic7XG5cbmV4cG9ydCB0eXBlIE5iU2VsZWN0Q29tcGFyZUZ1bmN0aW9uPFQgPSBhbnk+ID0gKHYxOiBhbnksIHYyOiBhbnkpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBOYlNlbGVjdEFwcGVhcmFuY2UgPSAnb3V0bGluZScgfCAnZmlsbGVkJyB8ICdoZXJvJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2VsZWN0LWxhYmVsJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmJTZWxlY3RMYWJlbENvbXBvbmVudCB7fVxuXG5leHBvcnQgZnVuY3Rpb24gbmJTZWxlY3RGb3JtRmllbGRDb250cm9sQ29uZmlnRmFjdG9yeSgpIHtcbiAgY29uc3QgY29uZmlnID0gbmV3IE5iRm9ybUZpZWxkQ29udHJvbENvbmZpZygpO1xuICBjb25maWcuc3VwcG9ydHNTdWZmaXggPSBmYWxzZTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuLyoqXG4gKiBUaGUgYE5iU2VsZWN0Q29tcG9uZW50YCBwcm92aWRlcyBhIGNhcGFiaWxpdHkgdG8gc2VsZWN0IG9uZSBvZiB0aGUgcGFzc2VkIGl0ZW1zLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIHNlbGVjdC9zZWxlY3Qtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iU2VsZWN0TW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYlNlbGVjdE1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0IGFzIHRoZSBtdWx0aS1zZWxlY3QgY29udHJvbCB5b3UgaGF2ZSB0byBtYXJrIGl0IGFzIGBtdWx0aXBsZWAuXG4gKiBJbiB0aGlzIGNhc2UsIGBuYi1zZWxlY3RgIHdpbGwgd29yayBvbmx5IHdpdGggYXJyYXlzIC0gYWNjZXB0IGFycmF5cyBhbmQgcHJvcGFnYXRlIGFycmF5cy5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKE11bHRpcGxlLCBzZWxlY3Qvc2VsZWN0LW11bHRpcGxlLmNvbXBvbmVudClcbiAqXG4gKiBJdGVtcyB3aXRob3V0IHZhbHVlcyB3aWxsIGNsZWFuIHRoZSBzZWxlY3Rpb24uIEJvdGggYG51bGxgIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMgd2lsbCBhbHNvIGNsZWFuIHRoZSBzZWxlY3Rpb24uXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShDbGVhbiBzZWxlY3Rpb24sIHNlbGVjdC9zZWxlY3QtY2xlYW4uY29tcG9uZW50KVxuICpcbiAqIFNlbGVjdCBtYXkgYmUgYm91bmRlZCB1c2luZyBgc2VsZWN0ZWRgIGlucHV0OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxuYi1zZWxlY3QgWyhzZWxlY3RlZCldPVwic2VsZWN0ZWRcIj48L25iLXNlbGVjdGVkPlxuICogYGBgXG4gKlxuICogT3IgeW91IGNhbiBiaW5kIGNvbnRyb2wgd2l0aCBmb3JtIGNvbnRyb2xzIG9yIG5nTW9kZWw6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3QgZm9ybSBiaW5kaW5nLCBzZWxlY3Qvc2VsZWN0LWZvcm0uY29tcG9uZW50KVxuICpcbiAqIE9wdGlvbnMgaW4gdGhlIHNlbGVjdCBtYXkgYmUgZ3JvdXBlZCB1c2luZyBgbmItb3B0aW9uLWdyb3VwYCBjb21wb25lbnQuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShHcm91cGluZywgc2VsZWN0L3NlbGVjdC1ncm91cHMuY29tcG9uZW50KVxuICpcbiAqIFNlbGVjdCBtYXkgaGF2ZSBhIHBsYWNlaG9sZGVyIHRoYXQgd2lsbCBiZSBzaG93biB3aGVuIG5vdGhpbmcgc2VsZWN0ZWQ6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShQbGFjZWhvbGRlciwgc2VsZWN0L3NlbGVjdC1wbGFjZWhvbGRlci5jb21wb25lbnQpXG4gKlxuICogWW91IGNhbiBkaXNhYmxlIHNlbGVjdCwgb3B0aW9ucyBhbmQgd2hvbGUgZ3JvdXBzLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoRGlzYWJsZWQgc2VsZWN0LCBzZWxlY3Qvc2VsZWN0LWRpc2FibGVkLmNvbXBvbmVudClcbiAqXG4gKiBBbHNvLCB0aGUgY3VzdG9tIGxhYmVsIG1heSBiZSBwcm92aWRlZCBpbiBzZWxlY3QuXG4gKiBUaGlzIGN1c3RvbSBsYWJlbCB3aWxsIGJlIHVzZWQgZm9yIGluc3RlYWQgcGxhY2Vob2xkZXIgd2hlbiBzb21ldGhpbmcgc2VsZWN0ZWQuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShDdXN0b20gbGFiZWwsIHNlbGVjdC9zZWxlY3QtbGFiZWwuY29tcG9uZW50KVxuICpcbiAqIERlZmF1bHQgYG5iLXNlbGVjdGAgc2l6ZSBpcyBgbWVkaXVtYCBhbmQgc3RhdHVzIGlzIGBiYXNpY2AuXG4gKiBTZWxlY3QgaXMgYXZhaWxhYmxlIGluIG11bHRpcGxlIGNvbG9ycyB1c2luZyBgc3RhdHVzYCBwcm9wZXJ0eTpcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNlbGVjdCBzdGF0dXNlcywgc2VsZWN0L3NlbGVjdC1zdGF0dXMuY29tcG9uZW50KVxuICpcbiAqIFRoZXJlIGFyZSBmaXZlIHNlbGVjdCBzaXplczpcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNlbGVjdCBzaXplcywgc2VsZWN0L3NlbGVjdC1zaXplcy5jb21wb25lbnQpXG4gKlxuICogQW5kIHR3byBhZGRpdGlvbmFsIHN0eWxlIHR5cGVzIC0gYGZpbGxlZGA6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShGaWxsZWQgc2VsZWN0LCBzZWxlY3Qvc2VsZWN0LWZpbGxlZC5jb21wb25lbnQpXG4gKlxuICogYW5kIGBoZXJvYDpcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNlbGVjdCBjb2xvcnMsIHNlbGVjdC9zZWxlY3QtaGVyby5jb21wb25lbnQpXG4gKlxuICogU2VsZWN0IGlzIGF2YWlsYWJsZSBpbiBkaWZmZXJlbnQgc2hhcGVzLCB0aGF0IGNvdWxkIGJlIGNvbWJpbmVkIHdpdGggdGhlIG90aGVyIHByb3BlcnRpZXM6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3Qgc2hhcGVzLCBzZWxlY3Qvc2VsZWN0LXNoYXBlcy5jb21wb25lbnQpXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIGNvbXBvbmVudCBzZWxlY3RzIG9wdGlvbnMgd2hvc2UgdmFsdWVzIGFyZSBzdHJpY3RseSBlcXVhbCAoYD09PWApIHdpdGggdGhlIHNlbGVjdCB2YWx1ZS5cbiAqIFRvIGNoYW5nZSBzdWNoIGJlaGF2aW9yLCBwYXNzIGEgY3VzdG9tIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gdGhlIGBjb21wYXJlV2l0aGAgYXR0cmlidXRlLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2VsZWN0IGN1c3RvbSBjb21wYXJhdG9yLCBzZWxlY3Qvc2VsZWN0LWNvbXBhcmUtd2l0aC5jb21wb25lbnQpXG4gKlxuICogWW91IGNhbiBhZGQgYW4gYWRkaXRpb25hbCBpY29uIHRvIHRoZSBzZWxlY3QgdmlhIHRoZSBgbmItZm9ybS1maWVsZGAgY29tcG9uZW50OlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3Qgd2l0aCBpY29uLCBzZWxlY3Qvc2VsZWN0LWljb24uY29tcG9uZW50KVxuICpcbiAqIEBhZGRpdGlvbmFsLWV4YW1wbGUoSW50ZXJhY3RpdmUsIHNlbGVjdC9zZWxlY3QtaW50ZXJhY3RpdmUuY29tcG9uZW50KVxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBzZWxlY3QtY3Vyc29yOlxuICogc2VsZWN0LWRpc2FibGVkLWN1cnNvcjpcbiAqIHNlbGVjdC1taW4td2lkdGg6XG4gKiBzZWxlY3Qtb3V0bGluZS13aWR0aDpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbG9yOlxuICogc2VsZWN0LWljb24tb2Zmc2V0OlxuICogc2VsZWN0LXRleHQtZm9udC1mYW1pbHk6XG4gKiBzZWxlY3QtcGxhY2Vob2xkZXItdGV4dC1mb250LWZhbWlseTpcbiAqIHNlbGVjdC10aW55LXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LXRpbnktdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC10aW55LXRleHQtbGluZS1oZWlnaHQ6XG4gKiBzZWxlY3QtdGlueS1wbGFjZWhvbGRlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC10aW55LXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtdGlueS1tYXgtd2lkdGg6XG4gKiBzZWxlY3Qtc21hbGwtdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3Qtc21hbGwtdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC1zbWFsbC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogc2VsZWN0LXNtYWxsLXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LXNtYWxsLXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3Qtc21hbGwtbWF4LXdpZHRoOlxuICogc2VsZWN0LW1lZGl1bS10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC1tZWRpdW0tdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC1tZWRpdW0tdGV4dC1saW5lLWhlaWdodDpcbiAqIHNlbGVjdC1tZWRpdW0tcGxhY2Vob2xkZXItdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtbWVkaXVtLXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtbWVkaXVtLW1heC13aWR0aDpcbiAqIHNlbGVjdC1sYXJnZS10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC1sYXJnZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VsZWN0LWxhcmdlLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBzZWxlY3QtbGFyZ2UtcGxhY2Vob2xkZXItdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtbGFyZ2UtcGxhY2Vob2xkZXItdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC1sYXJnZS1tYXgtd2lkdGg6XG4gKiBzZWxlY3QtZ2lhbnQtdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtZ2lhbnQtdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC1naWFudC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogc2VsZWN0LWdpYW50LXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LWdpYW50LXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtZ2lhbnQtbWF4LXdpZHRoOlxuICogc2VsZWN0LXJlY3RhbmdsZS1ib3JkZXItcmFkaXVzOlxuICogc2VsZWN0LXNlbWktcm91bmQtYm9yZGVyLXJhZGl1czpcbiAqIHNlbGVjdC1yb3VuZC1ib3JkZXItcmFkaXVzOlxuICogc2VsZWN0LW91dGxpbmUtYm9yZGVyLXN0eWxlOlxuICogc2VsZWN0LW91dGxpbmUtYm9yZGVyLXdpZHRoOlxuICogc2VsZWN0LW91dGxpbmUtdGlueS1wYWRkaW5nOlxuICogc2VsZWN0LW91dGxpbmUtc21hbGwtcGFkZGluZzpcbiAqIHNlbGVjdC1vdXRsaW5lLW1lZGl1bS1wYWRkaW5nOlxuICogc2VsZWN0LW91dGxpbmUtbGFyZ2UtcGFkZGluZzpcbiAqIHNlbGVjdC1vdXRsaW5lLWdpYW50LXBhZGRpbmc6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8taG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8taG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWFkamFjZW50LWJvcmRlci1zdHlsZTpcbiAqIHNlbGVjdC1vdXRsaW5lLWFkamFjZW50LWJvcmRlci13aWR0aDpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLW9wZW4tYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtYWRqYWNlbnQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktYWRqYWNlbnQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtYWRqYWNlbnQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tYWRqYWNlbnQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctYWRqYWNlbnQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLW9wZW4tYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtb3Blbi1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYm9yZGVyLXN0eWxlOlxuICogc2VsZWN0LWZpbGxlZC1ib3JkZXItd2lkdGg6XG4gKiBzZWxlY3QtZmlsbGVkLXRpbnktcGFkZGluZzpcbiAqIHNlbGVjdC1maWxsZWQtc21hbGwtcGFkZGluZzpcbiAqIHNlbGVjdC1maWxsZWQtbWVkaXVtLXBhZGRpbmc6XG4gKiBzZWxlY3QtZmlsbGVkLWxhcmdlLXBhZGRpbmc6XG4gKiBzZWxlY3QtZmlsbGVkLWdpYW50LXBhZGRpbmc6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8taG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tdGlueS1wYWRkaW5nOlxuICogc2VsZWN0LWhlcm8tc21hbGwtcGFkZGluZzpcbiAqIHNlbGVjdC1oZXJvLW1lZGl1bS1wYWRkaW5nOlxuICogc2VsZWN0LWhlcm8tbGFyZ2UtcGFkZGluZzpcbiAqIHNlbGVjdC1oZXJvLWdpYW50LXBhZGRpbmc6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWhvdmVyLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8tcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8taWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8tdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8tcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8tZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWZvY3VzLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItaG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtZm9jdXMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWhvdmVyLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOYlNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHsgcHJvdmlkZTogTkJfU0VMRUNUX0lOSkVDVElPTl9UT0tFTiwgdXNlRXhpc3Rpbmc6IE5iU2VsZWN0Q29tcG9uZW50IH0sXG4gICAgeyBwcm92aWRlOiBOYkZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOYlNlbGVjdENvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogTmJGb3JtRmllbGRDb250cm9sQ29uZmlnLCB1c2VGYWN0b3J5OiBuYlNlbGVjdEZvcm1GaWVsZENvbnRyb2xDb25maWdGYWN0b3J5IH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5iU2VsZWN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOYkZvcm1GaWVsZENvbnRyb2xcbntcbiAgLyoqXG4gICAqIFNlbGVjdCBzaXplLCBhdmFpbGFibGUgc2l6ZXM6XG4gICAqIGB0aW55YCwgYHNtYWxsYCwgYG1lZGl1bWAgKGRlZmF1bHQpLCBgbGFyZ2VgLCBgZ2lhbnRgXG4gICAqL1xuICBASW5wdXQoKSBzaXplOiBOYkNvbXBvbmVudFNpemUgPSAnbWVkaXVtJztcblxuICAvKipcbiAgICogU2VsZWN0IHN0YXR1cyAoYWRkcyBzcGVjaWZpYyBzdHlsZXMpOlxuICAgKiBgYmFzaWNgLCBgcHJpbWFyeWAsIGBpbmZvYCwgYHN1Y2Nlc3NgLCBgd2FybmluZ2AsIGBkYW5nZXJgLCBgY29udHJvbGBcbiAgICovXG4gIEBJbnB1dCgpIHN0YXR1czogTmJDb21wb25lbnRPckN1c3RvbVN0YXR1cyA9ICdiYXNpYyc7XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBzaGFwZXM6IGByZWN0YW5nbGVgIChkZWZhdWx0KSwgYHJvdW5kYCwgYHNlbWktcm91bmRgXG4gICAqL1xuICBASW5wdXQoKSBzaGFwZTogTmJDb21wb25lbnRTaGFwZSA9ICdyZWN0YW5nbGUnO1xuXG4gIC8qKlxuICAgKiBTZWxlY3QgYXBwZWFyYW5jZXM6IGBvdXRsaW5lYCAoZGVmYXVsdCksIGBmaWxsZWRgLCBgaGVyb2BcbiAgICovXG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IE5iU2VsZWN0QXBwZWFyYW5jZSA9ICdvdXRsaW5lJztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGNsYXNzIHRvIGJlIHNldCBvbiBgbmItb3B0aW9uYHMgY29udGFpbmVyIChgbmItb3B0aW9uLWxpc3RgKVxuICAgKiAqL1xuICBASW5wdXQoKSBvcHRpb25zTGlzdENsYXNzOiBOZ0NsYXNzWyduZ0NsYXNzJ107XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBjbGFzcyBmb3IgdGhlIG92ZXJsYXkgcGFuZWwgd2l0aCBvcHRpb25zXG4gICAqICovXG4gIEBJbnB1dCgpIG9wdGlvbnNQYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHdpZHRoIChpbiBwaXhlbHMpIHRvIGJlIHNldCBvbiBgbmItb3B0aW9uYHMgY29udGFpbmVyIChgbmItb3B0aW9uLWxpc3RgKVxuICAgKiAqL1xuICBASW5wdXQoKVxuICBnZXQgb3B0aW9uc1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNXaWR0aCA/PyB0aGlzLmhvc3RXaWR0aDtcbiAgfVxuICBzZXQgb3B0aW9uc1dpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vcHRpb25zV2lkdGggPSB2YWx1ZTtcbiAgfVxuICBwcm90ZWN0ZWQgX29wdGlvbnNXaWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBBZGRzIGBvdXRsaW5lYCBzdHlsZXNcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwZWFyYW5jZS1vdXRsaW5lJylcbiAgZ2V0IG91dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gJ291dGxpbmUnO1xuICB9XG4gIHNldCBvdXRsaW5lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9ICdvdXRsaW5lJztcbiAgICB9XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX291dGxpbmU6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBBZGRzIGBmaWxsZWRgIHN0eWxlc1xuICAgKi9cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hcHBlYXJhbmNlLWZpbGxlZCcpXG4gIGdldCBmaWxsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gJ2ZpbGxlZCc7XG4gIH1cbiAgc2V0IGZpbGxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSAnZmlsbGVkJztcbiAgICB9XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpbGxlZDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIEFkZHMgYGhlcm9gIHN0eWxlc1xuICAgKi9cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hcHBlYXJhbmNlLWhlcm8nKVxuICBnZXQgaGVybygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSAnaGVybyc7XG4gIH1cbiAgc2V0IGhlcm8odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5hcHBlYXJhbmNlID0gJ2hlcm8nO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGVybzogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIERpc2FibGVzIHRoZSBzZWxlY3RcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogSWYgc2V0IGVsZW1lbnQgd2lsbCBmaWxsIGl0cyBjb250YWluZXJcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZnVsbC13aWR0aCcpXG4gIGdldCBmdWxsV2lkdGgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Z1bGxXaWR0aDtcbiAgfVxuICBzZXQgZnVsbFdpZHRoKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZnVsbFdpZHRoID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Z1bGxXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZnVsbFdpZHRoOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogUmVuZGVycyBzZWxlY3QgcGxhY2Vob2xkZXIgaWYgbm90aGluZyBzZWxlY3RlZC5cbiAgICogKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGNvbXBhcmUgb3B0aW9uIHZhbHVlIHdpdGggc2VsZWN0ZWQgdmFsdWUuXG4gICAqIEJ5IGRlZmF1bHQsIHZhbHVlcyBhcmUgY29tcGFyZWQgd2l0aCBzdHJpY3QgZXF1YWxpdHkgKGA9PT1gKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBjb21wYXJlV2l0aCgpOiBOYlNlbGVjdENvbXBhcmVGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICB9XG4gIHNldCBjb21wYXJlV2l0aChmbjogTmJTZWxlY3RDb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsLmxlbmd0aCAmJiB0aGlzLmNhblNlbGVjdFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2NvbXBhcmVXaXRoOiBOYlNlbGVjdENvbXBhcmVGdW5jdGlvbiA9ICh2MTogYW55LCB2MjogYW55KSA9PiB2MSA9PT0gdjI7XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgc2VsZWN0ZWQgaXRlbSBvciBhcnJheSBvZiBzZWxlY3RlZCBpdGVtcy5cbiAgICogKi9cbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcbiAgfVxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLm1hcCgobykgPT4gby52YWx1ZSkgOiB0aGlzLnNlbGVjdGlvbk1vZGVsWzBdLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVzIGNhcGFiaWxpdHkganVzdCB3cml0ZSBgbXVsdGlwbGVgIG92ZXIgdGhlIGVsZW1lbnQuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX211bHRpcGxlOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBvcHRpb25zIG92ZXJsYXkgb2Zmc2V0IChpbiBwaXhlbHMpLlxuICAgKiovXG4gIEBJbnB1dCgpIG9wdGlvbnNPdmVybGF5T2Zmc2V0ID0gODtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBvcHRpb25zIG92ZXJsYXkgc2Nyb2xsIHN0cmF0ZWd5LlxuICAgKiovXG4gIEBJbnB1dCgpIHNjcm9sbFN0cmF0ZWd5OiBOYlNjcm9sbFN0cmF0ZWdpZXMgPSAnYmxvY2snO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYWRkaXRpb25hbENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLnN0YXR1c1NlcnZpY2UuaXNDdXN0b21TdGF0dXModGhpcy5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnN0YXR1cyldO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogV2lsbCBiZSBlbWl0dGVkIHdoZW4gc2VsZWN0ZWQgdmFsdWUgY2hhbmdlcy5cbiAgICogKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogTGlzdCBvZiBgTmJPcHRpb25Db21wb25lbnRgJ3MgY29tcG9uZW50cyBwYXNzZWQgYXMgY29udGVudC5cbiAgICogVE9ETyBtYXliZSBpdCB3b3VsZCBiZSBiZXR0ZXIgcHJvdmlkZSB3cmFwcGVyXG4gICAqICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTmJPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE5iT3B0aW9uQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogQ3VzdG9tIHNlbGVjdCBsYWJlbCwgd2lsbCBiZSByZW5kZXJlZCBpbnN0ZWFkIG9mIGRlZmF1bHQgZW51bWVyYXRpb24gd2l0aCBjb21hLlxuICAgKiAqL1xuICBAQ29udGVudENoaWxkKE5iU2VsZWN0TGFiZWxDb21wb25lbnQpIGN1c3RvbUxhYmVsO1xuXG4gIC8qKlxuICAgKiBOYkNhcmQgd2l0aCBvcHRpb25zIGNvbnRlbnQuXG4gICAqICovXG4gIEBWaWV3Q2hpbGQoTmJQb3J0YWxEaXJlY3RpdmUpIHBvcnRhbDogTmJQb3J0YWxEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZCgnc2VsZWN0QnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGJ1dHRvbjogRWxlbWVudFJlZjxIVE1MQnV0dG9uRWxlbWVudD47XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaXMgc2VsZWN0IG9wZW5lZC5cbiAgICogKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yZWYgJiYgdGhpcy5yZWYuaGFzQXR0YWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHNlbGVjdGVkIG9wdGlvbnMuXG4gICAqICovXG4gIHNlbGVjdGlvbk1vZGVsOiBOYk9wdGlvbkNvbXBvbmVudFtdID0gW107XG5cbiAgcG9zaXRpb25TdHJhdGVneTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAvKipcbiAgICogQ3VycmVudCBvdmVybGF5IHBvc2l0aW9uIGJlY2F1c2Ugb2Ygd2UgaGF2ZSB0byB0b2dnbGUgb3ZlcmxheVBvc2l0aW9uXG4gICAqIGluIFtuZ0NsYXNzXSBkaXJlY3Rpb24gYW5kIHRoaXMgZGlyZWN0aXZlIGNhbiB1c2Ugb25seSBzdHJpbmcuXG4gICAqL1xuICBvdmVybGF5UG9zaXRpb246IE5iUG9zaXRpb24gPSAnJyBhcyBOYlBvc2l0aW9uO1xuXG4gIHByb3RlY3RlZCByZWY6IE5iT3ZlcmxheVJlZjtcblxuICBwcm90ZWN0ZWQgdHJpZ2dlclN0cmF0ZWd5OiBOYlRyaWdnZXJTdHJhdGVneTtcblxuICBwcm90ZWN0ZWQgYWxpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIGtleU1hbmFnZXI6IE5iRm9jdXNLZXlNYW5hZ2VyPE5iT3B0aW9uQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogSWYgYSB1c2VyIGFzc2lnbnMgdmFsdWUgYmVmb3JlIGNvbnRlbnQgbmItb3B0aW9ucydzIHJlbmRlcmVkIHRoZSB2YWx1ZSB3aWxsIGJlIHB1dHRlZCBpbiB0aGlzIHZhcmlhYmxlLlxuICAgKiBBbmQgdGhlbiBhcHBsaWVkIGFmdGVyIGNvbnRlbnQgcmVuZGVyZWQuXG4gICAqIE9ubHkgdGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBhcHBsaWVkLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgcXVldWU7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHBhc3NlZCB0aHJvdWdoIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IgdG8gcHJvcGFnYXRlIGNoYW5nZXMuXG4gICAqICovXG4gIHByb3RlY3RlZCBvbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgc3RhdHVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmJDb21wb25lbnRPckN1c3RvbVN0YXR1cz4odGhpcy5zdGF0dXMpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBzaXplJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmJDb21wb25lbnRTaXplPih0aGlzLnNpemUpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBkaXNhYmxlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuZGlzYWJsZWQpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBmdWxsV2lkdGgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLmZ1bGxXaWR0aCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOQl9ET0NVTUVOVCkgcHJvdGVjdGVkIGRvY3VtZW50LFxuICAgIHByb3RlY3RlZCBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBob3N0UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXI6IE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgZm9jdXNLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2U6IE5iRm9jdXNLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2U8TmJPcHRpb25Db21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCBmb2N1c01vbml0b3I6IE5iRm9jdXNNb25pdG9yLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHN0YXR1c1NlcnZpY2U6IE5iU3RhdHVzU2VydmljZSxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlzIHNlbGVjdCBoaWRkZW4uXG4gICAqICovXG4gIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNPcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2lkdGggb2YgdGhlIHNlbGVjdCBidXR0b24uXG4gICAqICovXG4gIGdldCBob3N0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBzZWxlY3RCdXR0b25DbGFzc2VzKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjbGFzc2VzID0gW107XG5cbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uTW9kZWwubGVuZ3RoKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ3BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5zZWxlY3Rpb25Nb2RlbC5sZW5ndGggJiYgIXRoaXMucGxhY2Vob2xkZXIpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnZW1wdHknKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICBjbGFzc2VzLnB1c2godGhpcy5vdmVybGF5UG9zaXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnRlbnQgcmVuZGVyZWQgaW4gdGhlIGxhYmVsLlxuICAgKiAqL1xuICBnZXQgc2VsZWN0aW9uVmlldygpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbC5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5tYXAoKG9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpID0+IG9wdGlvbi5jb250ZW50KS5qb2luKCcsICcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGVsWzBdLmNvbnRlbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyh7IGRpc2FibGVkLCBzdGF0dXMsIHNpemUsIGZ1bGxXaWR0aCB9OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGVkJC5uZXh0KGRpc2FibGVkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIHRoaXMuc3RhdHVzJC5uZXh0KHN0YXR1cy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoc2l6ZSkge1xuICAgICAgdGhpcy5zaXplJC5uZXh0KHNpemUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGZ1bGxXaWR0aCkge1xuICAgICAgdGhpcy5mdWxsV2lkdGgkLm5leHQodGhpcy5mdWxsV2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm9wdGlvbnMpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5xdWV1ZSAhPSBudWxsICYmIHRoaXMuY2FuU2VsZWN0VmFsdWUoKSksXG4gICAgICAgIC8vIENhbGwgJ3dyaXRlVmFsdWUnIHdoZW4gY3VycmVudCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biBpcyBmaW5pc2hlZC5cbiAgICAgICAgLy8gV2hlbiB3cml0aW5nIGlzIGZpbmlzaGVkLCBjaGFuZ2UgZGV0ZWN0aW9uIHN0YXJ0cyBhZ2Fpbiwgc2luY2VcbiAgICAgICAgLy8gbWljcm90YXNrcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgICAgLy8gUHJldmVudHMgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvci5cbiAgICAgICAgc3dpdGNoTWFwKChvcHRpb25zOiBRdWVyeUxpc3Q8TmJPcHRpb25Db21wb25lbnQ+KSA9PiBmcm9tKFByb21pc2UucmVzb2x2ZShvcHRpb25zKSkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMud3JpdGVWYWx1ZSh0aGlzLnF1ZXVlKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVPbkJ1dHRvbkZvY3VzKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPblRyaWdnZXJzKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbk9wdGlvbkNsaWNrKCk7XG5cbiAgICAvLyBUT0RPOiAjMjI1NFxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQsICduYi10cmFuc2l0aW9uJyk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKHRoaXMucmVmKSB7XG4gICAgICB0aGlzLnJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXJTdHJhdGVneSkge1xuICAgICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkU2hvdygpKSB7XG4gICAgICB0aGlzLmF0dGFjaFRvT3ZlcmxheSgpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucG9zaXRpb25DaGFuZ2UucGlwZSh0YWtlKDEpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5yZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWxpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYW5TZWxlY3RWYWx1ZSgpICYmIHZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnF1ZXVlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9wdGlvbiBvciBjbGVhciBhbGwgc2VsZWN0ZWQgb3B0aW9ucyBpZiB2YWx1ZSBpcyBudWxsLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkge1xuICAgIHRoaXMucXVldWUgPSBudWxsO1xuICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgYWxsIHNlbGVjdGVkIG9wdGlvbnMuXG4gICAqICovXG4gIHByb3RlY3RlZCByZXNldCgpIHtcbiAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmZvckVhY2goKG9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpID0+IG9wdGlvbi5kZXNlbGVjdCgpKTtcbiAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gW107XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMubXVsdGlwbGUgPyBbXSA6IG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaG93IHRvIHNlbGVjdCBvcHRpb24gYXMgbXVsdGlwbGUgb3Igc2luZ2xlLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgc2VsZWN0T3B0aW9uKG9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5oYW5kbGVNdWx0aXBsZVNlbGVjdChvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZVNpbmdsZVNlbGVjdChvcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3Qgc2luZ2xlIG9wdGlvbi5cbiAgICogKi9cbiAgcHJvdGVjdGVkIGhhbmRsZVNpbmdsZVNlbGVjdChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnBvcCgpO1xuXG4gICAgaWYgKHNlbGVjdGVkICYmICF0aGlzLl9jb21wYXJlV2l0aChzZWxlY3RlZC52YWx1ZSwgb3B0aW9uLnZhbHVlKSkge1xuICAgICAgc2VsZWN0ZWQuZGVzZWxlY3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gW29wdGlvbl07XG4gICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHRoaXMuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIHRoaXMuZW1pdFNlbGVjdGVkKG9wdGlvbi52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGZvciBtdWx0aXBsZSBvcHRpb25zLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgaGFuZGxlTXVsdGlwbGVTZWxlY3Qob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkge1xuICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLmZpbHRlcigocykgPT4gIXRoaXMuX2NvbXBhcmVXaXRoKHMudmFsdWUsIG9wdGlvbi52YWx1ZSkpO1xuICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwucHVzaChvcHRpb24pO1xuICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTW9kZWwubWFwKChvcHQ6IE5iT3B0aW9uQ29tcG9uZW50KSA9PiBvcHQudmFsdWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhdHRhY2hUb092ZXJsYXkoKSB7XG4gICAgaWYgKCF0aGlzLnJlZikge1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICB0aGlzLnN1YnNjcmliZU9uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIHRoaXMuY3JlYXRlS2V5TWFuYWdlcigpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVPbk92ZXJsYXlLZXlzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBY3RpdmVPcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwubGVuZ3RoKSB7XG4gICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLnNlbGVjdGlvbk1vZGVsWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVPdmVybGF5KCkge1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5jcmVhdGVTY3JvbGxTdHJhdGVneSgpO1xuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpO1xuICAgIHRoaXMucmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICBzY3JvbGxTdHJhdGVneSxcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMub3B0aW9uc1BhbmVsQ2xhc3MsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlS2V5TWFuYWdlcigpOiB2b2lkIHtcbiAgICB0aGlzLmtleU1hbmFnZXIgPSB0aGlzLmZvY3VzS2V5TWFuYWdlckZhY3RvcnlTZXJ2aWNlLmNyZWF0ZSh0aGlzLm9wdGlvbnMpLndpdGhUeXBlQWhlYWQoMjAwKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCk6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uQnVpbGRlclxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuYnV0dG9uKVxuICAgICAgLnBvc2l0aW9uKE5iUG9zaXRpb24uQk9UVE9NKVxuICAgICAgLm9mZnNldCh0aGlzLm9wdGlvbnNPdmVybGF5T2Zmc2V0KVxuICAgICAgLmFkanVzdG1lbnQoTmJBZGp1c3RtZW50LlZFUlRJQ0FMKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVTY3JvbGxTdHJhdGVneSgpOiBOYlNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXNbdGhpcy5zY3JvbGxTdHJhdGVneV0oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVUcmlnZ2VyU3RyYXRlZ3koKTogTmJUcmlnZ2VyU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXJTdHJhdGVneUJ1aWxkZXJcbiAgICAgIC50cmlnZ2VyKE5iVHJpZ2dlci5DTElDSylcbiAgICAgIC5ob3N0KHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgLmNvbnRhaW5lcigoKSA9PiB0aGlzLmdldENvbnRhaW5lcigpKVxuICAgICAgLmJ1aWxkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25UcmlnZ2VycygpIHtcbiAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5zaG93JC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zaG93KCkpO1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LmhpZGUkLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuaXNPcGVuKSkuc3Vic2NyaWJlKCgkZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghdGhpcy5pc0NsaWNrZWRXaXRoaW5Db21wb25lbnQoJGV2ZW50KSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uUG9zaXRpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKHBvc2l0aW9uOiBOYlBvc2l0aW9uKSA9PiB7XG4gICAgICB0aGlzLm92ZXJsYXlQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25PcHRpb25DbGljaygpIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgdXNlciBjaGFuZ2VzIHByb3ZpZGVkIG9wdGlvbnMgbGlzdCBpbiB0aGUgcnVudGltZSB3ZSBoYXZlIHRvIGhhbmRsZSB0aGlzXG4gICAgICogYW5kIHJlc3Vic2NyaWJlIG9uIG9wdGlvbnMgc2VsZWN0aW9uIGNoYW5nZXMgZXZlbnQuXG4gICAgICogT3RoZXJ3aXNlLCB0aGUgdXNlciB3aWxsIG5vdCBiZSBhYmxlIHRvIHNlbGVjdCBuZXcgb3B0aW9ucy5cbiAgICAgKiAqL1xuICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMub3B0aW9ucyksXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE5iT3B0aW9uQ29tcG9uZW50PikgPT4ge1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24uY2xpY2spKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNsaWNrZWRPcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSA9PiB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKGNsaWNrZWRPcHRpb24pKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVPbk92ZXJsYXlLZXlzKCk6IHZvaWQge1xuICAgIHRoaXMucmVmXG4gICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaXNPcGVuKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgIHRoaXMuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uQnV0dG9uRm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1c01vbml0b3JcbiAgICAgIC5tb25pdG9yKHRoaXMuYnV0dG9uKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgob3JpZ2luKSA9PiAhIW9yaWdpbiksXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuYnV0dG9uKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5mb2N1c2VkJCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29udGFpbmVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnJlZiAmJlxuICAgICAgdGhpcy5yZWYuaGFzQXR0YWNoZWQoKSAmJlxuICAgICAgPENvbXBvbmVudFJlZjxhbnk+PntcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICBuYXRpdmVFbGVtZW50OiB0aGlzLnJlZi5vdmVybGF5RWxlbWVudCxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSBzZWxlY3RlZCB2YWx1ZS5cbiAgICogKi9cbiAgcHJvdGVjdGVkIGVtaXRTZWxlY3RlZChzZWxlY3RlZCkge1xuICAgIHRoaXMub25DaGFuZ2Uoc2VsZWN0ZWQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHNlbGVjdGVkIHZhbHVlIGluIG1vZGVsLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgc2V0U2VsZWN0aW9uKHZhbHVlKSB7XG4gICAgY29uc3QgaXNSZXNldFZhbHVlID0gdmFsdWUgPT0gbnVsbDtcbiAgICBsZXQgc2FmZVZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgc2FmZVZhbHVlID0gdmFsdWUgPz8gW107XG4gICAgfVxuXG4gICAgY29uc3QgaXNBcnJheTogYm9vbGVhbiA9IEFycmF5LmlzQXJyYXkoc2FmZVZhbHVlKTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmICFpc0FycmF5ICYmICFpc1Jlc2V0VmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFzc2lnbiBzaW5nbGUgdmFsdWUgaWYgc2VsZWN0IGlzIG1hcmtlZCBhcyBtdWx0aXBsZVwiKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIGlzQXJyYXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFzc2lnbiBhcnJheSBpZiBzZWxlY3QgaXMgbm90IG1hcmtlZCBhcyBtdWx0aXBsZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbDtcbiAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gW107XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgc2FmZVZhbHVlLmZvckVhY2goKG9wdGlvbikgPT4gdGhpcy5zZWxlY3RWYWx1ZShvcHRpb24pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RWYWx1ZShzYWZlVmFsdWUpO1xuICAgIH1cblxuICAgIC8vIGZpbmQgb3B0aW9ucyB3aGljaCB3ZXJlIHNlbGVjdGVkIGJlZm9yZSBhbmQgdHJpZ2dlciBkZXNlbGVjdFxuICAgIHByZXZpb3VzbHlTZWxlY3RlZE9wdGlvbnNcbiAgICAgIC5maWx0ZXIoKG9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpID0+ICF0aGlzLnNlbGVjdGlvbk1vZGVsLmluY2x1ZGVzKG9wdGlvbikpXG4gICAgICAuZm9yRWFjaCgob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHZhbHVlLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgc2VsZWN0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvcnJlc3BvbmRpbmcgPSB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkgPT4gdGhpcy5fY29tcGFyZVdpdGgob3B0aW9uLnZhbHVlLCB2YWx1ZSkpO1xuXG4gICAgaWYgKGNvcnJlc3BvbmRpbmcpIHtcbiAgICAgIGNvcnJlc3BvbmRpbmcuc2VsZWN0KCk7XG4gICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnB1c2goY29ycmVzcG9uZGluZyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNob3VsZFNob3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNIaWRkZW4gJiYgdGhpcy5vcHRpb25zPy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdG91Y2hlZCBpZiBmb2N1cyBtb3ZlZCBvdXRzaWRlIG9mIGJ1dHRvbiBhbmQgb3ZlcmxheSxcbiAgICogaWdub3JpbmcgdGhlIGNhc2Ugd2hlbiBmb2N1cyBtb3ZlZCB0byBvcHRpb25zIG92ZXJsYXkuXG4gICAqL1xuICB0cnlTZXRUb3VjaGVkKCkge1xuICAgIGlmICh0aGlzLmlzSGlkZGVuKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NsaWNrZWRXaXRoaW5Db21wb25lbnQoJGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudCA9PT0gJGV2ZW50LnRhcmdldCB8fCB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0IGFzIE5vZGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhblNlbGVjdFZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtdGlueScpXG4gIGdldCB0aW55KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICd0aW55JztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtc21hbGwnKVxuICBnZXQgc21hbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbWVkaXVtJylcbiAgZ2V0IG1lZGl1bSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbWVkaXVtJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgbGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtZ2lhbnQnKVxuICBnZXQgZ2lhbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2dpYW50JztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1wcmltYXJ5JylcbiAgZ2V0IHByaW1hcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAncHJpbWFyeSc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtaW5mbycpXG4gIGdldCBpbmZvKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2luZm8nO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXN1Y2Nlc3MnKVxuICBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdzdWNjZXNzJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy13YXJuaW5nJylcbiAgZ2V0IHdhcm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnd2FybmluZyc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtZGFuZ2VyJylcbiAgZ2V0IGRhbmdlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdkYW5nZXInO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWJhc2ljJylcbiAgZ2V0IGJhc2ljKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Jhc2ljJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1jb250cm9sJylcbiAgZ2V0IGNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnY29udHJvbCc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaGFwZS1yZWN0YW5nbGUnKVxuICBnZXQgcmVjdGFuZ2xlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNoYXBlID09PSAncmVjdGFuZ2xlJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNoYXBlLXJvdW5kJylcbiAgZ2V0IHJvdW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNoYXBlID09PSAncm91bmQnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hhcGUtc2VtaS1yb3VuZCcpXG4gIGdldCBzZW1pUm91bmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcGUgPT09ICdzZW1pLXJvdW5kJztcbiAgfVxufVxuIiwiPGJ1dHRvblxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbbmdDbGFzc109XCJzZWxlY3RCdXR0b25DbGFzc2VzXCJcbiAgKGJsdXIpPVwidHJ5U2V0VG91Y2hlZCgpXCJcbiAgKGtleWRvd24uYXJyb3dEb3duKT1cInNob3coKVwiXG4gIChrZXlkb3duLmFycm93VXApPVwic2hvdygpXCJcbiAgY2xhc3M9XCJzZWxlY3QtYnV0dG9uXCJcbiAgdHlwZT1cImJ1dHRvblwiXG4gICNzZWxlY3RCdXR0b25cbj5cbiAgPHNwYW4gKGNsaWNrKT1cImRpc2FibGVkICYmICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzZWxlY3Rpb25Nb2RlbC5sZW5ndGg7IGVsc2UgcGxhY2Vob2xkZXJUZW1wbGF0ZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbUxhYmVsOyBlbHNlIGRlZmF1bHRTZWxlY3Rpb25UZW1wbGF0ZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuYi1zZWxlY3QtbGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0U2VsZWN0aW9uVGVtcGxhdGU+e3sgc2VsZWN0aW9uVmlldyB9fTwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctdGVtcGxhdGUgI3BsYWNlaG9sZGVyVGVtcGxhdGU+e3sgcGxhY2Vob2xkZXIgfX08L25nLXRlbXBsYXRlPlxuICA8L3NwYW4+XG5cbiAgPG5iLWljb25cbiAgICBpY29uPVwiY2hldnJvbi1kb3duLW91dGxpbmVcIlxuICAgIHBhY2s9XCJuZWJ1bGFyLWVzc2VudGlhbHNcIlxuICAgIChjbGljayk9XCJkaXNhYmxlZCAmJiAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gID5cbiAgPC9uYi1pY29uPlxuPC9idXR0b24+XG5cbjxuYi1vcHRpb24tbGlzdFxuICAqbmJQb3J0YWxcbiAgW3NpemVdPVwic2l6ZVwiXG4gIFtwb3NpdGlvbl09XCJvdmVybGF5UG9zaXRpb25cIlxuICBbc3R5bGUud2lkdGgucHhdPVwib3B0aW9uc1dpZHRoXCJcbiAgW25nQ2xhc3NdPVwib3B0aW9uc0xpc3RDbGFzc1wiXG4+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLW9wdGlvbiwgbmItb3B0aW9uLWdyb3VwXCI+PC9uZy1jb250ZW50PlxuPC9uYi1vcHRpb24tbGlzdD5cbiJdfQ==