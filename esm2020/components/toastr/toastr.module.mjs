/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';
import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbToastComponent } from './toast.component';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG } from './toastr-config';
import * as i0 from "@angular/core";
export class NbToastrModule {
    static forRoot(toastrConfig = {}) {
        return {
            ngModule: NbToastrModule,
            providers: [
                NbToastrService,
                NbToastrContainerRegistry,
                { provide: NB_TOASTR_CONFIG, useValue: toastrConfig },
            ],
        };
    }
}
NbToastrModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbToastrModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbToastrModule, declarations: [NbToastrContainerComponent, NbToastComponent], imports: [NbSharedModule, NbOverlayModule, NbIconModule] });
NbToastrModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrModule, imports: [NbSharedModule, NbOverlayModule, NbIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbToastrModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbOverlayModule, NbIconModule],
                    declarations: [NbToastrContainerComponent, NbToastComponent],
                    entryComponents: [NbToastrContainerComponent, NbToastComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90b2FzdHIvdG9hc3RyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxpQkFBaUIsQ0FBQzs7QUFRbkUsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUF3QyxFQUFFO1FBQ3ZELE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZix5QkFBeUI7Z0JBQ3pCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7YUFDdEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBVlUsY0FBYzs2R0FBZCxjQUFjLGlCQUhWLDBCQUEwQixFQUFFLGdCQUFnQixhQURqRCxjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVk7NkdBSTVDLGNBQWMsWUFKZixjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVk7NEZBSTVDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3hELFlBQVksRUFBRSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDO29CQUM1RCxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5iU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IE5iVG9hc3RyQ29udGFpbmVyUmVnaXN0cnksIE5iVG9hc3RyU2VydmljZSB9IGZyb20gJy4vdG9hc3RyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJUb2FzdENvbXBvbmVudCB9IGZyb20gJy4vdG9hc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE5iVG9hc3RyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90b2FzdHItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOQl9UT0FTVFJfQ09ORklHLCBOYlRvYXN0ckNvbmZpZyB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05iU2hhcmVkTW9kdWxlLCBOYk92ZXJsYXlNb2R1bGUsIE5iSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05iVG9hc3RyQ29udGFpbmVyQ29tcG9uZW50LCBOYlRvYXN0Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmJUb2FzdHJDb250YWluZXJDb21wb25lbnQsIE5iVG9hc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRvYXN0ck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHRvYXN0ckNvbmZpZzogUGFydGlhbDxOYlRvYXN0ckNvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmJUb2FzdHJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5iVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5iVG9hc3RyU2VydmljZSxcbiAgICAgICAgTmJUb2FzdHJDb250YWluZXJSZWdpc3RyeSxcbiAgICAgICAgeyBwcm92aWRlOiBOQl9UT0FTVFJfQ09ORklHLCB1c2VWYWx1ZTogdG9hc3RyQ29uZmlnIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==