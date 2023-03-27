/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbDialogService } from './dialog.service';
import { NbDialogContainerComponent } from './dialog-container';
import { NB_DIALOG_CONFIG } from './dialog-config';
import * as i0 from "@angular/core";
export class NbDialogModule {
    static forRoot(dialogConfig = {}) {
        return {
            ngModule: NbDialogModule,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    }
    static forChild(dialogConfig = {}) {
        return {
            ngModule: NbDialogModule,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    }
}
NbDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbDialogModule, declarations: [NbDialogContainerComponent], imports: [NbSharedModule, NbOverlayModule] });
NbDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDialogModule, imports: [NbSharedModule, NbOverlayModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbOverlayModule],
                    declarations: [NbDialogContainerComponent],
                    entryComponents: [NbDialogContainerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixNQUFNLGlCQUFpQixDQUFDOztBQVFuRSxNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQXdDLEVBQUU7UUFDdkQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7YUFDdEQ7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBd0MsRUFBRTtRQUN4RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2YsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTthQUN0RDtTQUNGLENBQUE7SUFDSCxDQUFDOzs0R0FuQlUsY0FBYzs2R0FBZCxjQUFjLGlCQUhWLDBCQUEwQixhQUQvQixjQUFjLEVBQUUsZUFBZTs2R0FJOUIsY0FBYyxZQUpmLGNBQWMsRUFBRSxlQUFlOzRGQUk5QixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQzFDLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztpQkFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBOYkRpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBOQl9ESUFMT0dfQ09ORklHLCBOYkRpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZyc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05iU2hhcmVkTW9kdWxlLCBOYk92ZXJsYXlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOYkRpYWxvZ0NvbnRhaW5lckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05iRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJEaWFsb2dNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChkaWFsb2dDb25maWc6IFBhcnRpYWw8TmJEaWFsb2dDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5iRGlhbG9nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOYkRpYWxvZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOYkRpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogTkJfRElBTE9HX0NPTkZJRywgdXNlVmFsdWU6IGRpYWxvZ0NvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoZGlhbG9nQ29uZmlnOiBQYXJ0aWFsPE5iRGlhbG9nQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOYkRpYWxvZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJEaWFsb2dNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmJEaWFsb2dTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IE5CX0RJQUxPR19DT05GSUcsIHVzZVZhbHVlOiBkaWFsb2dDb25maWcgfSxcbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG4iXX0=