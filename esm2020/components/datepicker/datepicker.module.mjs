/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NB_DATE_ADAPTER, NbDatepickerDirective } from './datepicker.directive';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbDatepickerComponent, NbRangepickerComponent, NbBasePickerComponent, } from './datepicker.component';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarRangeModule } from '../calendar/calendar-range.module';
import { NbDateAdapterService, NbDateTimeAdapterService, NbRangeAdapterService } from './datepicker-adapter';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbCardModule } from '../card/card.module';
import { NbBaseCalendarModule } from '../calendar/base-calendar.module';
import { NbTimepickerModule } from '../timepicker/timepicker.module';
import { NbCalendarKitModule } from '../calendar-kit/calendar-kit.module';
import { NbDateTimePickerComponent } from './date-timepicker.component';
import * as i0 from "@angular/core";
export class NbDatepickerModule {
    static forRoot() {
        return {
            ngModule: NbDatepickerModule,
            providers: [
                DatePipe,
                {
                    provide: NB_DATE_ADAPTER,
                    multi: true,
                    useClass: NbDateAdapterService,
                },
                {
                    provide: NB_DATE_ADAPTER,
                    multi: true,
                    useClass: NbRangeAdapterService,
                },
                {
                    provide: NB_DATE_ADAPTER,
                    multi: true,
                    useClass: NbDateTimeAdapterService,
                },
            ],
        };
    }
}
NbDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbDatepickerModule, declarations: [NbDatepickerDirective,
        NbDatepickerContainerComponent,
        NbCalendarWithTimeComponent,
        NbDateTimePickerComponent,
        NbDatepickerComponent,
        NbRangepickerComponent,
        NbBasePickerComponent], imports: [NbOverlayModule,
        NbCalendarModule,
        NbCalendarRangeModule,
        NbCardModule,
        NbBaseCalendarModule,
        NbTimepickerModule,
        NbCalendarKitModule], exports: [NbDatepickerDirective,
        NbDatepickerComponent,
        NbRangepickerComponent,
        NbDateTimePickerComponent,
        NbCalendarWithTimeComponent] });
NbDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDatepickerModule, imports: [NbOverlayModule,
        NbCalendarModule,
        NbCalendarRangeModule,
        NbCardModule,
        NbBaseCalendarModule,
        NbTimepickerModule,
        NbCalendarKitModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NbOverlayModule,
                        NbCalendarModule,
                        NbCalendarRangeModule,
                        NbCardModule,
                        NbBaseCalendarModule,
                        NbTimepickerModule,
                        NbCalendarKitModule,
                    ],
                    exports: [
                        NbDatepickerDirective,
                        NbDatepickerComponent,
                        NbRangepickerComponent,
                        NbDateTimePickerComponent,
                        NbCalendarWithTimeComponent,
                    ],
                    declarations: [
                        NbDatepickerDirective,
                        NbDatepickerContainerComponent,
                        NbCalendarWithTimeComponent,
                        NbDateTimePickerComponent,
                        NbDatepickerComponent,
                        NbRangepickerComponent,
                        NbBasePickerComponent,
                    ],
                    entryComponents: [
                        NbCalendarComponent,
                        NbCalendarRangeComponent,
                        NbDatepickerContainerComponent,
                        NbCalendarWithTimeComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFnQixRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xGLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLHFCQUFxQixHQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFtQ3hFLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsUUFBUTtnQkFDUjtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO29CQUNYLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dIQXZCVSxrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFmM0IscUJBQXFCO1FBQ3JCLDhCQUE4QjtRQUM5QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIscUJBQXFCLGFBdEJyQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUNsQixtQkFBbUIsYUFHbkIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDJCQUEyQjtpSEFrQmxCLGtCQUFrQixZQS9CM0IsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsbUJBQW1COzRGQXlCVixrQkFBa0I7a0JBakM5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0Qix5QkFBeUI7d0JBQ3pCLDJCQUEyQjtxQkFDNUI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsOEJBQThCO3dCQUM5QiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLDJCQUEyQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBOQl9EQVRFX0FEQVBURVIsIE5iRGF0ZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJDYWxlbmRhck1vZHVsZSB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE5iRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgTmJSYW5nZXBpY2tlckNvbXBvbmVudCxcbiAgTmJCYXNlUGlja2VyQ29tcG9uZW50LFxufSBmcm9tICcuL2RhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2VNb2R1bGUgfSBmcm9tICcuLi9jYWxlbmRhci9jYWxlbmRhci1yYW5nZS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJEYXRlQWRhcHRlclNlcnZpY2UsIE5iRGF0ZVRpbWVBZGFwdGVyU2VydmljZSwgTmJSYW5nZUFkYXB0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9kYXRlcGlja2VyLWFkYXB0ZXInO1xuaW1wb3J0IHsgTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13aXRoLXRpbWUuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FyZE1vZHVsZSB9IGZyb20gJy4uL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJCYXNlQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICcuLi9jYWxlbmRhci9iYXNlLWNhbGVuZGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOYlRpbWVwaWNrZXJNb2R1bGUgfSBmcm9tICcuLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJLaXRNb2R1bGUgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvY2FsZW5kYXIta2l0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYkRhdGVUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWVwaWNrZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5iT3ZlcmxheU1vZHVsZSxcbiAgICBOYkNhbGVuZGFyTW9kdWxlLFxuICAgIE5iQ2FsZW5kYXJSYW5nZU1vZHVsZSxcbiAgICBOYkNhcmRNb2R1bGUsXG4gICAgTmJCYXNlQ2FsZW5kYXJNb2R1bGUsXG4gICAgTmJUaW1lcGlja2VyTW9kdWxlLFxuICAgIE5iQ2FsZW5kYXJLaXRNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOYkRhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgTmJEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE5iUmFuZ2VwaWNrZXJDb21wb25lbnQsXG4gICAgTmJEYXRlVGltZVBpY2tlckNvbXBvbmVudCxcbiAgICBOYkNhbGVuZGFyV2l0aFRpbWVDb21wb25lbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5iRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICBOYkRhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50LFxuICAgIE5iRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQsXG4gICAgTmJEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE5iUmFuZ2VwaWNrZXJDb21wb25lbnQsXG4gICAgTmJCYXNlUGlja2VyQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBOYkNhbGVuZGFyQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudCxcbiAgICBOYkRhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYkRhdGVwaWNrZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5iRGF0ZXBpY2tlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJEYXRlcGlja2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERhdGVQaXBlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkJfREFURV9BREFQVEVSLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUNsYXNzOiBOYkRhdGVBZGFwdGVyU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5CX0RBVEVfQURBUFRFUixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VDbGFzczogTmJSYW5nZUFkYXB0ZXJTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkJfREFURV9BREFQVEVSLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUNsYXNzOiBOYkRhdGVUaW1lQWRhcHRlclNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==