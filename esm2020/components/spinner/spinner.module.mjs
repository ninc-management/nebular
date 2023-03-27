/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbSpinnerComponent } from './spinner.component';
import { NbSpinnerDirective } from './spinner.directive';
import * as i0 from "@angular/core";
export class NbSpinnerModule {
}
NbSpinnerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbSpinnerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbSpinnerModule, declarations: [NbSpinnerComponent, NbSpinnerDirective], imports: [NbSharedModule], exports: [NbSpinnerComponent, NbSpinnerDirective] });
NbSpinnerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSpinnerModule, imports: [NbSharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    exports: [NbSpinnerComponent, NbSpinnerDirective],
                    declarations: [NbSpinnerComponent, NbSpinnerDirective],
                    entryComponents: [NbSpinnerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBV3pELE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBSFgsa0JBQWtCLEVBQUUsa0JBQWtCLGFBSG5ELGNBQWMsYUFFTixrQkFBa0IsRUFBRSxrQkFBa0I7OEdBSXJDLGVBQWUsWUFOeEIsY0FBYzs0RkFNTCxlQUFlO2tCQVIzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUNqRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQztvQkFDdEQsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYlNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iU3Bpbm5lckRpcmVjdGl2ZSB9IGZyb20gJy4vc3Bpbm5lci5kaXJlY3RpdmUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOYlNoYXJlZE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW05iU3Bpbm5lckNvbXBvbmVudCwgTmJTcGlubmVyRGlyZWN0aXZlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmJTcGlubmVyQ29tcG9uZW50LCBOYlNwaW5uZXJEaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOYlNwaW5uZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlNwaW5uZXJNb2R1bGUge31cbiJdfQ==