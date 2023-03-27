/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbIconModule } from '../icon/icon.module';
import { NbTooltipComponent } from './tooltip.component';
import { NbTooltipDirective } from './tooltip.directive';
import * as i0 from "@angular/core";
export class NbTooltipModule {
}
NbTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbTooltipModule, declarations: [NbTooltipComponent, NbTooltipDirective], imports: [NbSharedModule, NbOverlayModule, NbIconModule], exports: [NbTooltipDirective] });
NbTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbTooltipModule, imports: [NbSharedModule, NbOverlayModule, NbIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbOverlayModule, NbIconModule],
                    declarations: [NbTooltipComponent, NbTooltipDirective],
                    exports: [NbTooltipDirective],
                    entryComponents: [NbTooltipComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFTekQsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFKWCxrQkFBa0IsRUFBRSxrQkFBa0IsYUFEM0MsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLGFBRTdDLGtCQUFrQjs4R0FHakIsZUFBZSxZQUxoQixjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVk7NEZBSzVDLGVBQWU7a0JBTjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3hELFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDN0IsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IE5iVG9vbHRpcENvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sdGlwLmRpcmVjdGl2ZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05iU2hhcmVkTW9kdWxlLCBOYk92ZXJsYXlNb2R1bGUsIE5iSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05iVG9vbHRpcENvbXBvbmVudCwgTmJUb29sdGlwRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05iVG9vbHRpcERpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05iVG9vbHRpcENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5iVG9vbHRpcE1vZHVsZSB7XG59XG4iXX0=