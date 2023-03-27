/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { of as observableOf, Subject } from 'rxjs';
import { filter, delay, takeUntil } from 'rxjs/operators';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../icon/icon.component";
import * as i3 from "../button/button.component";
import * as i4 from "./search.service";
import * as i5 from "../../services/theme.service";
import * as i6 from "@angular/router";
import * as i7 from "../cdk/overlay/overlay-service";
import * as i8 from "../cdk/overlay/mapping";
/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
export class NbSearchFieldComponent {
    constructor() {
        this.show = false;
        this.close = new EventEmitter();
        this.search = new EventEmitter();
        this.searchInput = new EventEmitter();
    }
    get showClass() {
        return this.show;
    }
    get modalZoomin() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_ZOOMIN;
    }
    get rotateLayout() {
        return this.type === NbSearchFieldComponent.TYPE_ROTATE_LAYOUT;
    }
    get modalMove() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_MOVE;
    }
    get curtain() {
        return this.type === NbSearchFieldComponent.TYPE_CURTAIN;
    }
    get columnCurtain() {
        return this.type === NbSearchFieldComponent.TYPE_COLUMN_CURTAIN;
    }
    get modalDrop() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_DROP;
    }
    get modalHalf() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_HALF;
    }
    ngOnChanges({ show }) {
        const becameHidden = !show.isFirstChange() && show.currentValue === false;
        if (becameHidden && this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
        this.focusInput();
    }
    ngAfterViewInit() {
        this.focusInput();
    }
    emitClose() {
        this.close.emit();
    }
    submitSearch(term) {
        if (term) {
            this.search.emit(term);
        }
    }
    emitSearchInput(term) {
        this.searchInput.emit(term);
    }
    focusInput() {
        if (this.show && this.inputElement) {
            this.inputElement.nativeElement.focus();
        }
    }
}
NbSearchFieldComponent.TYPE_MODAL_ZOOMIN = 'modal-zoomin';
NbSearchFieldComponent.TYPE_ROTATE_LAYOUT = 'rotate-layout';
NbSearchFieldComponent.TYPE_MODAL_MOVE = 'modal-move';
NbSearchFieldComponent.TYPE_CURTAIN = 'curtain';
NbSearchFieldComponent.TYPE_COLUMN_CURTAIN = 'column-curtain';
NbSearchFieldComponent.TYPE_MODAL_DROP = 'modal-drop';
NbSearchFieldComponent.TYPE_MODAL_HALF = 'modal-half';
NbSearchFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSearchFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NbSearchFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NbSearchFieldComponent, selector: "nb-search-field", inputs: { type: "type", placeholder: "placeholder", hint: "hint", show: "show" }, outputs: { close: "close", search: "search", searchInput: "searchInput" }, host: { properties: { "class.show": "this.showClass", "class.modal-zoomin": "this.modalZoomin", "class.rotate-layout": "this.rotateLayout", "class.modal-move": "this.modalMove", "class.curtain": "this.curtain", "class.column-curtain": "this.columnCurtain", "class.modal-drop": "this.modalDrop", "class.modal-half": "this.modalHalf" } }, viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["searchInput"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="search" (keyup.esc)="emitClose()">
      <button (click)="emitClose()" nbButton ghost class="close-button">
        <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   (input)="emitSearchInput(searchInput.value)"
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="focusInput()"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input:-ms-input-placeholder{opacity:.3}:host input::placeholder{opacity:.3}:host span{font-size:90%;font-weight:700;display:block;width:75%;margin:0 auto;padding:.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-zoomin .search:before,:host.modal-zoomin .search:after{content:\"\";position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search:before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px,-15px,0)}:host.modal-zoomin .search:after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px,15px,0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search:before,:host.modal-zoomin.show .search:after{transform:translateZ(0);transition:transform .5s}:host.modal-zoomin.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-zoomin.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}::ng-deep nb-layout.rotate-layout .scrollable-container{position:relative;z-index:10001;transition:transform .5s cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.rotate-layout.with-search .scrollable-container{transition:transform .5s cubic-bezier(.2,1,.3,1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0,50vh,0) rotateX(30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100vw;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(.7,.7,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scaleZ(1)}:host.rotate-layout.show .search form{opacity:1;transform:scaleZ(1)}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-move .layout{transition:transform .5s}::ng-deep nb-layout.modal-move.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scaleZ(1)}:host.modal-move.show .search input{transform:scaleZ(1);transition-duration:.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform .3s;transition-delay:.4s;transition-timing-function:ease-out}:host.curtain .search:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transition:transform .3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity .1s;transition-delay:.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%,0,0);transition-delay:0s}:host.curtain.show .search:after{transform:translate3d(100%,0,0);transition-delay:.4s}:host.curtain.show .search button{opacity:1;transform:scaleZ(1)}:host.curtain.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}}::ng-deep nb-layout.curtain .scrollable-container{position:relative;z-index:0}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/::ng-deep nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%,0,0);transition:transform .3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show:before{transform:scaleZ(1)}:host.column-curtain.show .search form{transform:translateZ(0);transition-delay:.15s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-drop .layout{position:relative;transition:transform .4s,opacity .4s;transition-timing-function:cubic-bezier(.4,0,.2,1)}::ng-deep nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(.9,.9,1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search:before{content:\"\";position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity .4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity .4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:.25rem;text-align:center;opacity:0;transition:opacity .4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:.85rem 0;opacity:0;transform:translate3d(0,-50px,0);transition:opacity .4s,transform .4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0,-50px,0);transition:transform .4s}:host.modal-drop .search .form-content:after{content:\"\";position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search:before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translateZ(0);transition:none}:host.modal-drop.show .search .form-content:after{animation:scaleUpDown .8s cubic-bezier(.4,0,.2,1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s .4s}:host.modal-drop.show .search span{opacity:1;transform:translateZ(0);transition-delay:.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1,0,1)}50%{transform:scaleZ(1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}to{opacity:1;transform:scale3d(1,0,1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-half .layout{transition:transform .6s,opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.modal-half.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .6s,transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1);transform:translate3d(0,-100%,0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search:before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-half.show .search .form-wrapper{transform:translateZ(0)}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i3.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSearchFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-search-field', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="search" (keyup.esc)="emitClose()">
      <button (click)="emitClose()" nbButton ghost class="close-button">
        <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   (input)="emitSearchInput(searchInput.value)"
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="focusInput()"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input:-ms-input-placeholder{opacity:.3}:host input::placeholder{opacity:.3}:host span{font-size:90%;font-weight:700;display:block;width:75%;margin:0 auto;padding:.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-zoomin .search:before,:host.modal-zoomin .search:after{content:\"\";position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search:before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px,-15px,0)}:host.modal-zoomin .search:after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px,15px,0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search:before,:host.modal-zoomin.show .search:after{transform:translateZ(0);transition:transform .5s}:host.modal-zoomin.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-zoomin.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}::ng-deep nb-layout.rotate-layout .scrollable-container{position:relative;z-index:10001;transition:transform .5s cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.rotate-layout.with-search .scrollable-container{transition:transform .5s cubic-bezier(.2,1,.3,1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0,50vh,0) rotateX(30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100vw;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(.7,.7,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scaleZ(1)}:host.rotate-layout.show .search form{opacity:1;transform:scaleZ(1)}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-move .layout{transition:transform .5s}::ng-deep nb-layout.modal-move.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scaleZ(1)}:host.modal-move.show .search input{transform:scaleZ(1);transition-duration:.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform .3s;transition-delay:.4s;transition-timing-function:ease-out}:host.curtain .search:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transition:transform .3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity .1s;transition-delay:.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%,0,0);transition-delay:0s}:host.curtain.show .search:after{transform:translate3d(100%,0,0);transition-delay:.4s}:host.curtain.show .search button{opacity:1;transform:scaleZ(1)}:host.curtain.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}}::ng-deep nb-layout.curtain .scrollable-container{position:relative;z-index:0}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/::ng-deep nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%,0,0);transition:transform .3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show:before{transform:scaleZ(1)}:host.column-curtain.show .search form{transform:translateZ(0);transition-delay:.15s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-drop .layout{position:relative;transition:transform .4s,opacity .4s;transition-timing-function:cubic-bezier(.4,0,.2,1)}::ng-deep nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(.9,.9,1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search:before{content:\"\";position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity .4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity .4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:.25rem;text-align:center;opacity:0;transition:opacity .4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:.85rem 0;opacity:0;transform:translate3d(0,-50px,0);transition:opacity .4s,transform .4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0,-50px,0);transition:transform .4s}:host.modal-drop .search .form-content:after{content:\"\";position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search:before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translateZ(0);transition:none}:host.modal-drop.show .search .form-content:after{animation:scaleUpDown .8s cubic-bezier(.4,0,.2,1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s .4s}:host.modal-drop.show .search span{opacity:1;transform:translateZ(0);transition-delay:.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1,0,1)}50%{transform:scaleZ(1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}to{opacity:1;transform:scale3d(1,0,1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-half .layout{transition:transform .6s,opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.modal-half.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .6s,transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1);transform:translate3d(0,-100%,0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search:before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-half.show .search .form-wrapper{transform:translateZ(0)}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], hint: [{
                type: Input
            }], show: [{
                type: Input
            }], close: [{
                type: Output
            }], search: [{
                type: Output
            }], searchInput: [{
                type: Output
            }], inputElement: [{
                type: ViewChild,
                args: ['searchInput']
            }], showClass: [{
                type: HostBinding,
                args: ['class.show']
            }], modalZoomin: [{
                type: HostBinding,
                args: ['class.modal-zoomin']
            }], rotateLayout: [{
                type: HostBinding,
                args: ['class.rotate-layout']
            }], modalMove: [{
                type: HostBinding,
                args: ['class.modal-move']
            }], curtain: [{
                type: HostBinding,
                args: ['class.curtain']
            }], columnCurtain: [{
                type: HostBinding,
                args: ['class.column-curtain']
            }], modalDrop: [{
                type: HostBinding,
                args: ['class.modal-drop']
            }], modalHalf: [{
                type: HostBinding,
                args: ['class.modal-half']
            }] } });
/**
 * Beautiful full-page search control.
 *
 * @stacked-example(Showcase, search/search-showcase.component)
 *
 * Basic setup:
 *
 * ```ts
 *  <nb-search type="rotate-layout"></nb-search>
 * ```
 * ### Installation
 *
 * Import `NbSearchModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSearchModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Several animation types are available:
 * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
 *
 * It is also possible to handle search event using `NbSearchService`:
 *
 * @stacked-example(Search Event, search/search-event.component)
 *
 * @styles
 *
 * search-background-color:
 * search-divider-color:
 * search-divider-style:
 * search-divider-width:
 * search-extra-background-color:
 * search-text-color:
 * search-text-font-family:
 * search-text-font-size:
 * search-text-font-weight:
 * search-text-line-height:
 * search-placeholder-text-color:
 * search-info-text-color:
 * search-info-text-font-family:
 * search-info-text-font-size:
 * search-info-text-font-weight:
 * search-info-text-line-height:
 */
export class NbSearchComponent {
    constructor(searchService, themeService, router, overlayService, changeDetector) {
        this.searchService = searchService;
        this.themeService = themeService;
        this.router = router;
        this.overlayService = overlayService;
        this.changeDetector = changeDetector;
        this.destroy$ = new Subject();
        this.showSearchField = false;
        /**
         * Search input placeholder
         * @type {string}
         */
        this.placeholder = 'Search...';
        /**
         * Hint showing under the input field to improve user experience
         *
         * @type {string}
         */
        this.hint = 'Hit enter to search';
    }
    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroy$))
            .subscribe(() => this.hideSearch());
        this.searchService.onSearchActivate()
            .pipe(filter(data => !this.tag || data.tag === this.tag), takeUntil(this.destroy$))
            .subscribe(() => this.openSearch());
        this.searchService.onSearchDeactivate()
            .pipe(filter(data => !this.tag || data.tag === this.tag), takeUntil(this.destroy$))
            .subscribe(() => this.hideSearch());
    }
    ngOnDestroy() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.removeLayoutClasses();
            this.overlayRef.detach();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    openSearch() {
        if (!this.overlayRef) {
            this.overlayRef = this.overlayService.create();
            this.overlayRef.attach(this.searchFieldPortal);
        }
        this.themeService.appendLayoutClass(this.type);
        observableOf(null).pipe(delay(0)).subscribe(() => {
            this.themeService.appendLayoutClass('with-search');
            this.showSearchField = true;
            this.changeDetector.detectChanges();
        });
    }
    hideSearch() {
        this.removeLayoutClasses();
        this.showSearchField = false;
        this.changeDetector.detectChanges();
        this.searchButton.nativeElement.focus();
    }
    search(term) {
        this.searchService.submitSearch(term, this.tag);
        this.hideSearch();
    }
    emitInput(term) {
        this.searchService.searchInput(term, this.tag);
    }
    emitActivate() {
        this.searchService.activateSearch(this.type, this.tag);
    }
    emitDeactivate() {
        this.searchService.deactivateSearch(this.type, this.tag);
    }
    removeLayoutClasses() {
        this.themeService.removeLayoutClass('with-search');
        observableOf(null).pipe(delay(500)).subscribe(() => {
            this.themeService.removeLayoutClass(this.type);
        });
    }
}
NbSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSearchComponent, deps: [{ token: i4.NbSearchService }, { token: i5.NbThemeService }, { token: i6.Router }, { token: i7.NbOverlayService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NbSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NbSearchComponent, selector: "nb-search", inputs: { tag: "tag", placeholder: "placeholder", hint: "hint", type: "type" }, viewQueries: [{ propertyName: "searchFieldPortal", first: true, predicate: NbPortalDirective, descendants: true }, { propertyName: "searchButton", first: true, predicate: ["searchButton"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <button #searchButton class="start-search" (click)="emitActivate()" nbButton ghost>
      <nb-icon icon="search-outline" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-search-field
      *nbPortal
      [show]="showSearchField"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      (search)="search($event)"
      (searchInput)="emitInput($event)"
      (close)="emitDeactivate()">
    </nb-search-field>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}::ng-deep nb-layout.with-search .scrollable-container{position:relative;z-index:0}\n"], dependencies: [{ kind: "directive", type: i8.NbPortalDirective, selector: "[nbPortal]" }, { kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i3.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: NbSearchFieldComponent, selector: "nb-search-field", inputs: ["type", "placeholder", "hint", "show"], outputs: ["close", "search", "searchInput"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-search', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button #searchButton class="start-search" (click)="emitActivate()" nbButton ghost>
      <nb-icon icon="search-outline" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-search-field
      *nbPortal
      [show]="showSearchField"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      (search)="search($event)"
      (searchInput)="emitInput($event)"
      (close)="emitDeactivate()">
    </nb-search-field>
  `, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}::ng-deep nb-layout.with-search .scrollable-container{position:relative;z-index:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i4.NbSearchService }, { type: i5.NbThemeService }, { type: i6.Router }, { type: i7.NbOverlayService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { tag: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], hint: [{
                type: Input
            }], type: [{
                type: Input
            }], searchFieldPortal: [{
                type: ViewChild,
                args: [NbPortalDirective]
            }], searchButton: [{
                type: ViewChild,
                args: ['searchButton', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUsxRCxPQUFPLEVBQWdCLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7QUFFekU7OztHQUdHO0FBbUNILE1BQU0sT0FBTyxzQkFBc0I7SUFsQ25DO1FBK0NXLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFWixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0E0RTVDO0lBeEVDLElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUNJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssc0JBQXNCLENBQUMsa0JBQWtC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UUFDbkQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7K0dBekhVLGlCQUFpQjttR0FBakIsaUJBQWlCLG9MQWtDakIsaUJBQWlCLDBIQUNPLFVBQVUsNkJBbkRuQzs7Ozs7Ozs7Ozs7Ozs7R0FjVCx3MEJBdEtVLHNCQUFzQjs0RkF3S3RCLGlCQUFpQjtrQkFwQjdCLFNBQVM7K0JBQ0UsV0FBVyxtQkFDSix1QkFBdUIsQ0FBQyxNQUFNLFlBRXJDOzs7Ozs7Ozs7Ozs7OztHQWNUO3VOQWNRLEdBQUc7c0JBQVgsS0FBSztnQkFNRyxXQUFXO3NCQUFuQixLQUFLO2dCQU9HLElBQUk7c0JBQVosS0FBSztnQkFPRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRXdCLGlCQUFpQjtzQkFBOUMsU0FBUzt1QkFBQyxpQkFBaUI7Z0JBQ3FCLFlBQVk7c0JBQTVELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZGVsYXksIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmJTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBOYlRoZW1lU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktc2VydmljZSc7XG5pbXBvcnQgeyBOYk92ZXJsYXlSZWYsIE5iUG9ydGFsRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvbWFwcGluZyc7XG5cbi8qKlxuICogc2VhcmNoLWZpZWxkLWNvbXBvbmVudCBpcyB1c2VkIHVuZGVyIHRoZSBob29kIGJ5IG5iLXNlYXJjaCBjb21wb25lbnRcbiAqIGNhbid0IGJlIHVzZWQgaXRzZWxmXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNlYXJjaC1maWVsZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFtcbiAgICAnc3R5bGVzL3NlYXJjaC5jb21wb25lbnQubW9kYWwtem9vbWluLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5sYXlvdXQtcm90YXRlLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5tb2RhbC1tb3ZlLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5jdXJ0YWluLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5jb2x1bW4tY3VydGFpbi5zY3NzJyxcbiAgICAnc3R5bGVzL3NlYXJjaC5jb21wb25lbnQubW9kYWwtZHJvcC5zY3NzJyxcbiAgICAnc3R5bGVzL3NlYXJjaC5jb21wb25lbnQubW9kYWwtaGFsZi5zY3NzJyxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoXCIgKGtleXVwLmVzYyk9XCJlbWl0Q2xvc2UoKVwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZW1pdENsb3NlKClcIiBuYkJ1dHRvbiBnaG9zdCBjbGFzcz1cImNsb3NlLWJ1dHRvblwiPlxuICAgICAgICA8bmItaWNvbiBpY29uPVwiY2xvc2Utb3V0bGluZVwiIHBhY2s9XCJuZWJ1bGFyLWVzc2VudGlhbHNcIj48L25iLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXdyYXBwZXJcIj5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtXCIgKGtleXVwLmVudGVyKT1cInN1Ym1pdFNlYXJjaChzZWFyY2hJbnB1dC52YWx1ZSlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250ZW50XCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzZWFyY2gtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICNzZWFyY2hJbnB1dFxuICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJlbWl0U2VhcmNoSW5wdXQoc2VhcmNoSW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJmb2N1c0lucHV0KClcIi8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvXCI+e3sgaGludCB9fTwvc3Bhbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iU2VhcmNoRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIHN0YXRpYyByZWFkb25seSBUWVBFX01PREFMX1pPT01JTiA9ICdtb2RhbC16b29taW4nO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRV9ST1RBVEVfTEFZT1VUID0gJ3JvdGF0ZS1sYXlvdXQnO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRV9NT0RBTF9NT1ZFID0gJ21vZGFsLW1vdmUnO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRV9DVVJUQUlOID0gJ2N1cnRhaW4nO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRV9DT0xVTU5fQ1VSVEFJTiA9ICdjb2x1bW4tY3VydGFpbic7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX01PREFMX0RST1AgPSAnbW9kYWwtZHJvcCc7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX01PREFMX0hBTEYgPSAnbW9kYWwtaGFsZic7XG5cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBoaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3cgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWFyY2hJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNob3cnKVxuICBnZXQgc2hvd0NsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLnNob3c7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vZGFsLXpvb21pbicpXG4gIGdldCBtb2RhbFpvb21pbigpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfTU9EQUxfWk9PTUlOO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yb3RhdGUtbGF5b3V0JylcbiAgZ2V0IHJvdGF0ZUxheW91dCgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfUk9UQVRFX0xBWU9VVDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9kYWwtbW92ZScpXG4gIGdldCBtb2RhbE1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gTmJTZWFyY2hGaWVsZENvbXBvbmVudC5UWVBFX01PREFMX01PVkU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmN1cnRhaW4nKVxuICBnZXQgY3VydGFpbigpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfQ1VSVEFJTjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29sdW1uLWN1cnRhaW4nKVxuICBnZXQgY29sdW1uQ3VydGFpbigpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfQ09MVU1OX0NVUlRBSU47XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vZGFsLWRyb3AnKVxuICBnZXQgbW9kYWxEcm9wKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9NT0RBTF9EUk9QO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tb2RhbC1oYWxmJylcbiAgZ2V0IG1vZGFsSGFsZigpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfTU9EQUxfSEFMRjtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKHsgc2hvdyB9OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgYmVjYW1lSGlkZGVuID0gIXNob3cuaXNGaXJzdENoYW5nZSgpICYmIHNob3cuY3VycmVudFZhbHVlID09PSBmYWxzZTtcbiAgICBpZiAoYmVjYW1lSGlkZGVuICYmIHRoaXMuaW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gIH1cblxuICBlbWl0Q2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZS5lbWl0KCk7XG4gIH1cblxuICBzdWJtaXRTZWFyY2godGVybSkge1xuICAgIGlmICh0ZXJtKSB7XG4gICAgICB0aGlzLnNlYXJjaC5lbWl0KHRlcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRTZWFyY2hJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlYXJjaElucHV0LmVtaXQodGVybSk7XG4gIH1cblxuICBmb2N1c0lucHV0KCkge1xuICAgIGlmICh0aGlzLnNob3cgJiYgdGhpcy5pbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgTmJTZWFyY2hUeXBlID0gJ21vZGFsLXpvb21pbicgfCAncm90YXRlLWxheW91dCcgfCAnbW9kYWwtbW92ZScgfFxuICAnY3VydGFpbicgfCAnY29sdW1uLWN1cnRhaW4nIHwgJ21vZGFsLWRyb3AnIHwgJ21vZGFsLWhhbGYnO1xuXG4vKipcbiAqIEJlYXV0aWZ1bCBmdWxsLXBhZ2Ugc2VhcmNoIGNvbnRyb2wuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTaG93Y2FzZSwgc2VhcmNoL3NlYXJjaC1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogQmFzaWMgc2V0dXA6XG4gKlxuICogYGBgdHNcbiAqICA8bmItc2VhcmNoIHR5cGU9XCJyb3RhdGUtbGF5b3V0XCI+PC9uYi1zZWFyY2g+XG4gKiBgYGBcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iU2VhcmNoTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYlNlYXJjaE1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogU2V2ZXJhbCBhbmltYXRpb24gdHlwZXMgYXJlIGF2YWlsYWJsZTpcbiAqIG1vZGFsLXpvb21pbiwgcm90YXRlLWxheW91dCwgbW9kYWwtbW92ZSwgY3VydGFpbiwgY29sdW1uLWN1cnRhaW4sIG1vZGFsLWRyb3AsIG1vZGFsLWhhbGZcbiAqXG4gKiBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIGhhbmRsZSBzZWFyY2ggZXZlbnQgdXNpbmcgYE5iU2VhcmNoU2VydmljZWA6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWFyY2ggRXZlbnQsIHNlYXJjaC9zZWFyY2gtZXZlbnQuY29tcG9uZW50KVxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBzZWFyY2gtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlYXJjaC1kaXZpZGVyLWNvbG9yOlxuICogc2VhcmNoLWRpdmlkZXItc3R5bGU6XG4gKiBzZWFyY2gtZGl2aWRlci13aWR0aDpcbiAqIHNlYXJjaC1leHRyYS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VhcmNoLXRleHQtY29sb3I6XG4gKiBzZWFyY2gtdGV4dC1mb250LWZhbWlseTpcbiAqIHNlYXJjaC10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlYXJjaC10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VhcmNoLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBzZWFyY2gtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlYXJjaC1pbmZvLXRleHQtY29sb3I6XG4gKiBzZWFyY2gtaW5mby10ZXh0LWZvbnQtZmFtaWx5OlxuICogc2VhcmNoLWluZm8tdGV4dC1mb250LXNpemU6XG4gKiBzZWFyY2gtaW5mby10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VhcmNoLWluZm8tdGV4dC1saW5lLWhlaWdodDpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2VhcmNoJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogWydzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiAjc2VhcmNoQnV0dG9uIGNsYXNzPVwic3RhcnQtc2VhcmNoXCIgKGNsaWNrKT1cImVtaXRBY3RpdmF0ZSgpXCIgbmJCdXR0b24gZ2hvc3Q+XG4gICAgICA8bmItaWNvbiBpY29uPVwic2VhcmNoLW91dGxpbmVcIiBwYWNrPVwibmVidWxhci1lc3NlbnRpYWxzXCI+PC9uYi1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxuYi1zZWFyY2gtZmllbGRcbiAgICAgICpuYlBvcnRhbFxuICAgICAgW3Nob3ddPVwic2hvd1NlYXJjaEZpZWxkXCJcbiAgICAgIFt0eXBlXT1cInR5cGVcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIFtoaW50XT1cImhpbnRcIlxuICAgICAgKHNlYXJjaCk9XCJzZWFyY2goJGV2ZW50KVwiXG4gICAgICAoc2VhcmNoSW5wdXQpPVwiZW1pdElucHV0KCRldmVudClcIlxuICAgICAgKGNsb3NlKT1cImVtaXREZWFjdGl2YXRlKClcIj5cbiAgICA8L25iLXNlYXJjaC1maWVsZD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmJTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogTmJPdmVybGF5UmVmO1xuICBzaG93U2VhcmNoRmllbGQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGFncyBhIHNlYXJjaCB3aXRoIHNvbWUgSUQsIGNhbiBiZSBsYXRlciB1c2VkIGluIHRoZSBzZWFyY2ggc2VydmljZVxuICAgKiB0byBkZXRlcm1pbmUgd2hpY2ggc2VhcmNoIGNvbXBvbmVudCB0cmlnZ2VyZWQgdGhlIGFjdGlvbiwgaWYgbXVsdGlwbGUgc2VhcmNoZXMgZXhpc3Qgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBASW5wdXQoKSB0YWc6IHN0cmluZztcblxuICAvKipcbiAgICogU2VhcmNoIGlucHV0IHBsYWNlaG9sZGVyXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaC4uLic7XG5cbiAgLyoqXG4gICAqIEhpbnQgc2hvd2luZyB1bmRlciB0aGUgaW5wdXQgZmllbGQgdG8gaW1wcm92ZSB1c2VyIGV4cGVyaWVuY2VcbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBJbnB1dCgpIGhpbnQ6IHN0cmluZyA9ICdIaXQgZW50ZXIgdG8gc2VhcmNoJztcblxuICAvKipcbiAgICogU2VhcmNoIGRlc2lnbiB0eXBlLCBhdmFpbGFibGUgdHlwZXMgYXJlXG4gICAqIG1vZGFsLXpvb21pbiwgcm90YXRlLWxheW91dCwgbW9kYWwtbW92ZSwgY3VydGFpbiwgY29sdW1uLWN1cnRhaW4sIG1vZGFsLWRyb3AsIG1vZGFsLWhhbGZcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IE5iU2VhcmNoVHlwZTtcblxuICBAVmlld0NoaWxkKE5iUG9ydGFsRGlyZWN0aXZlKSBzZWFyY2hGaWVsZFBvcnRhbDogTmJQb3J0YWxEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaEJ1dHRvbicsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBzZWFyY2hCdXR0b246IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogTmJTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGhlbWVTZXJ2aWNlOiBOYlRoZW1lU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgb3ZlcmxheVNlcnZpY2U6IE5iT3ZlcmxheVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGVTZWFyY2goKSk7XG5cbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub25TZWFyY2hBY3RpdmF0ZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGRhdGEgPT4gIXRoaXMudGFnIHx8IGRhdGEudGFnID09PSB0aGlzLnRhZyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vcGVuU2VhcmNoKCkpO1xuXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9uU2VhcmNoRGVhY3RpdmF0ZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGRhdGEgPT4gIXRoaXMudGFnIHx8IGRhdGEudGFnID09PSB0aGlzLnRhZyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlU2VhcmNoKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5yZW1vdmVMYXlvdXRDbGFzc2VzKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3BlblNlYXJjaCgpIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5U2VydmljZS5jcmVhdGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5zZWFyY2hGaWVsZFBvcnRhbCk7XG4gICAgfVxuXG4gICAgdGhpcy50aGVtZVNlcnZpY2UuYXBwZW5kTGF5b3V0Q2xhc3ModGhpcy50eXBlKTtcbiAgICBvYnNlcnZhYmxlT2YobnVsbCkucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLmFwcGVuZExheW91dENsYXNzKCd3aXRoLXNlYXJjaCcpO1xuICAgICAgdGhpcy5zaG93U2VhcmNoRmllbGQgPSB0cnVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBoaWRlU2VhcmNoKCkge1xuICAgIHRoaXMucmVtb3ZlTGF5b3V0Q2xhc3NlcygpO1xuICAgIHRoaXMuc2hvd1NlYXJjaEZpZWxkID0gZmFsc2U7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5zZWFyY2hCdXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgc2VhcmNoKHRlcm0pIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc3VibWl0U2VhcmNoKHRlcm0sIHRoaXMudGFnKTtcbiAgICB0aGlzLmhpZGVTZWFyY2goKTtcbiAgfVxuXG4gIGVtaXRJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoSW5wdXQodGVybSwgdGhpcy50YWcpO1xuICB9XG5cbiAgZW1pdEFjdGl2YXRlKCkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5hY3RpdmF0ZVNlYXJjaCh0aGlzLnR5cGUsIHRoaXMudGFnKTtcbiAgfVxuXG4gIGVtaXREZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5kZWFjdGl2YXRlU2VhcmNoKHRoaXMudHlwZSwgdGhpcy50YWcpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMYXlvdXRDbGFzc2VzKCkge1xuICAgIHRoaXMudGhlbWVTZXJ2aWNlLnJlbW92ZUxheW91dENsYXNzKCd3aXRoLXNlYXJjaCcpO1xuICAgIG9ic2VydmFibGVPZihudWxsKS5waXBlKGRlbGF5KDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRoZW1lU2VydmljZS5yZW1vdmVMYXlvdXRDbGFzcyh0aGlzLnR5cGUpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=