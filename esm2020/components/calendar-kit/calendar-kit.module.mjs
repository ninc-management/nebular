/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';
import { NbCalendarMonthModelService } from './services/calendar-month-model.service';
import { NbDateService } from './services/date.service';
import { NbCalendarDayCellComponent } from './components/calendar-day-picker/calendar-day-cell.component';
import { NbCalendarDayPickerComponent } from './components/calendar-day-picker/calendar-day-picker.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarMonthCellComponent } from './components/calendar-month-picker/calendar-month-cell.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarViewModeComponent } from './components/calendar-navigation/calendar-view-mode.component';
import { NbCalendarPageableNavigationComponent, } from './components/calendar-navigation/calendar-pageable-navigation.component';
import { NbCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { NbCalendarPickerRowComponent } from './components/calendar-picker/calendar-picker-row.component';
import { NbCalendarYearCellComponent } from './components/calendar-year-picker/calendar-year-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarWeekNumberComponent } from './components/calendar-week-number/calendar-week-number.component';
import { NbNativeDateService } from './services/native-date.service';
import { NbCalendarYearModelService } from './services/calendar-year-model.service';
import { NbCalendarTimeModelService } from './services/calendar-time-model.service';
import { NbCalendarActionsComponent } from './components/calendar-actions/calendar-actions.component';
import * as i0 from "@angular/core";
const SERVICES = [
    { provide: NbDateService, useClass: NbNativeDateService },
    DatePipe,
    NbCalendarMonthModelService,
    NbCalendarYearModelService,
    NbCalendarTimeModelService,
];
const COMPONENTS = [
    NbCalendarViewModeComponent,
    NbCalendarPageableNavigationComponent,
    NbCalendarDaysNamesComponent,
    NbCalendarYearPickerComponent,
    NbCalendarMonthPickerComponent,
    NbCalendarDayPickerComponent,
    NbCalendarDayCellComponent,
    NbCalendarActionsComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
    NbCalendarPickerRowComponent,
    NbCalendarPickerComponent,
    NbCalendarWeekNumberComponent,
];
/**
 * `NbCalendarKitModule` is a module that contains multiple useful components for building custom calendars.
 * So if you think our calendars is not enough powerful for you just use calendar-kit and build your own calendar!
 *
 * Available components:
 * - `NbCalendarDayPicker`
 * - `NbCalendarDayCell`
 * - `NbCalendarMonthPicker`
 * - `NbCalendarMonthCell`
 * - `NbCalendarYearPicker`
 * - `NbCalendarYearCell`
 * - `NbCalendarViewModeComponent`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
export class NbCalendarKitModule {
}
NbCalendarKitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarKitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbCalendarKitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarKitModule, declarations: [NbCalendarViewModeComponent,
        NbCalendarPageableNavigationComponent,
        NbCalendarDaysNamesComponent,
        NbCalendarYearPickerComponent,
        NbCalendarMonthPickerComponent,
        NbCalendarDayPickerComponent,
        NbCalendarDayCellComponent,
        NbCalendarActionsComponent,
        NbCalendarMonthCellComponent,
        NbCalendarYearCellComponent,
        NbCalendarPickerRowComponent,
        NbCalendarPickerComponent,
        NbCalendarWeekNumberComponent], imports: [NbSharedModule, NbButtonModule, NbIconModule], exports: [NbCalendarViewModeComponent,
        NbCalendarPageableNavigationComponent,
        NbCalendarDaysNamesComponent,
        NbCalendarYearPickerComponent,
        NbCalendarMonthPickerComponent,
        NbCalendarDayPickerComponent,
        NbCalendarDayCellComponent,
        NbCalendarActionsComponent,
        NbCalendarMonthCellComponent,
        NbCalendarYearCellComponent,
        NbCalendarPickerRowComponent,
        NbCalendarPickerComponent,
        NbCalendarWeekNumberComponent] });
NbCalendarKitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarKitModule, providers: [...SERVICES], imports: [NbSharedModule, NbButtonModule, NbIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarKitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbButtonModule, NbIconModule],
                    exports: [...COMPONENTS],
                    declarations: [...COMPONENTS],
                    providers: [...SERVICES],
                    entryComponents: [
                        NbCalendarDayCellComponent,
                        NbCalendarMonthCellComponent,
                        NbCalendarYearCellComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIta2l0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jYWxlbmRhci1raXQvY2FsZW5kYXIta2l0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3BILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQzVHLE9BQU8sRUFDTCxxQ0FBcUMsR0FDdEMsTUFBTSx5RUFBeUUsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNuRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUNqSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUVqSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7QUFHdEcsTUFBTSxRQUFRLEdBQUc7SUFDZixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQ3pELFFBQVE7SUFDUiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLDBCQUEwQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUc7SUFDakIsMkJBQTJCO0lBQzNCLHFDQUFxQztJQUNyQyw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1Qix5QkFBeUI7SUFDekIsNkJBQTZCO0NBQzlCLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztLQWdCSztBQVlMLE1BQU0sT0FBTyxtQkFBbUI7O2lIQUFuQixtQkFBbUI7a0hBQW5CLG1CQUFtQixpQkEzQzlCLDJCQUEyQjtRQUMzQixxQ0FBcUM7UUFDckMsNEJBQTRCO1FBQzVCLDZCQUE2QjtRQUM3Qiw4QkFBOEI7UUFDOUIsNEJBQTRCO1FBQzVCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIseUJBQXlCO1FBQ3pCLDZCQUE2QixhQXFCbEIsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZLGFBakN2RCwyQkFBMkI7UUFDM0IscUNBQXFDO1FBQ3JDLDRCQUE0QjtRQUM1Qiw2QkFBNkI7UUFDN0IsOEJBQThCO1FBQzlCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1QiwyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLHlCQUF5QjtRQUN6Qiw2QkFBNkI7a0hBK0JsQixtQkFBbUIsYUFQbkIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUhiLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWTs0RkFVNUMsbUJBQW1CO2tCQVgvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFFO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDeEIsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUN4QixlQUFlLEVBQUU7d0JBQ2YsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLDJCQUEyQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5iU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcblxuaW1wb3J0IHsgTmJDYWxlbmRhck1vbnRoTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci1tb250aC1tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5cbmltcG9ydCB7IE5iQ2FsZW5kYXJEYXlDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLWRheS1waWNrZXIvY2FsZW5kYXItZGF5LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJEYXlQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItZGF5LXBpY2tlci9jYWxlbmRhci1kYXktcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyRGF5c05hbWVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLWRheXMtbmFtZXMvY2FsZW5kYXItZGF5cy1uYW1lcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci1tb250aC1waWNrZXIvY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhck1vbnRoUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLW1vbnRoLXBpY2tlci9jYWxlbmRhci1tb250aC1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJWaWV3TW9kZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci1uYXZpZ2F0aW9uL2NhbGVuZGFyLXZpZXctbW9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgTmJDYWxlbmRhclBhZ2VhYmxlTmF2aWdhdGlvbkNvbXBvbmVudCxcbn0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLW5hdmlnYXRpb24vY2FsZW5kYXItcGFnZWFibGUtbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci1waWNrZXIvY2FsZW5kYXItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUGlja2VyUm93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLXBpY2tlci9jYWxlbmRhci1waWNrZXItcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyWWVhckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXIteWVhci1waWNrZXIvY2FsZW5kYXIteWVhci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyWWVhclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci15ZWFyLXBpY2tlci9jYWxlbmRhci15ZWFyLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhcldlZWtOdW1iZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItd2Vlay1udW1iZXIvY2FsZW5kYXItd2Vlay1udW1iZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTmJOYXRpdmVEYXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmF0aXZlLWRhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyWWVhck1vZGVsU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2FsZW5kYXIteWVhci1tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci10aW1lLW1vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItYWN0aW9ucy9jYWxlbmRhci1hY3Rpb25zLmNvbXBvbmVudCc7XG5cblxuY29uc3QgU0VSVklDRVMgPSBbXG4gIHsgcHJvdmlkZTogTmJEYXRlU2VydmljZSwgdXNlQ2xhc3M6IE5iTmF0aXZlRGF0ZVNlcnZpY2UgfSxcbiAgRGF0ZVBpcGUsXG4gIE5iQ2FsZW5kYXJNb250aE1vZGVsU2VydmljZSxcbiAgTmJDYWxlbmRhclllYXJNb2RlbFNlcnZpY2UsXG4gIE5iQ2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlLFxuXTtcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgTmJDYWxlbmRhclZpZXdNb2RlQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyUGFnZWFibGVOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyRGF5c05hbWVzQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyWWVhclBpY2tlckNvbXBvbmVudCxcbiAgTmJDYWxlbmRhck1vbnRoUGlja2VyQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyRGF5UGlja2VyQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyRGF5Q2VsbENvbXBvbmVudCxcbiAgTmJDYWxlbmRhckFjdGlvbnNDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJZZWFyQ2VsbENvbXBvbmVudCxcbiAgTmJDYWxlbmRhclBpY2tlclJvd0NvbXBvbmVudCxcbiAgTmJDYWxlbmRhclBpY2tlckNvbXBvbmVudCxcbiAgTmJDYWxlbmRhcldlZWtOdW1iZXJDb21wb25lbnQsXG5dO1xuXG4vKipcbiAqIGBOYkNhbGVuZGFyS2l0TW9kdWxlYCBpcyBhIG1vZHVsZSB0aGF0IGNvbnRhaW5zIG11bHRpcGxlIHVzZWZ1bCBjb21wb25lbnRzIGZvciBidWlsZGluZyBjdXN0b20gY2FsZW5kYXJzLlxuICogU28gaWYgeW91IHRoaW5rIG91ciBjYWxlbmRhcnMgaXMgbm90IGVub3VnaCBwb3dlcmZ1bCBmb3IgeW91IGp1c3QgdXNlIGNhbGVuZGFyLWtpdCBhbmQgYnVpbGQgeW91ciBvd24gY2FsZW5kYXIhXG4gKlxuICogQXZhaWxhYmxlIGNvbXBvbmVudHM6XG4gKiAtIGBOYkNhbGVuZGFyRGF5UGlja2VyYFxuICogLSBgTmJDYWxlbmRhckRheUNlbGxgXG4gKiAtIGBOYkNhbGVuZGFyTW9udGhQaWNrZXJgXG4gKiAtIGBOYkNhbGVuZGFyTW9udGhDZWxsYFxuICogLSBgTmJDYWxlbmRhclllYXJQaWNrZXJgXG4gKiAtIGBOYkNhbGVuZGFyWWVhckNlbGxgXG4gKiAtIGBOYkNhbGVuZGFyVmlld01vZGVDb21wb25lbnRgXG4gKiAtIGBOYkNhbGVuZGFyUGFnZWFibGVOYXZpZ2F0aW9uYFxuICpcbiAqIEZvciBleGFtcGxlIHlvdSBjYW4gZWFzaWx5IGJ1aWxkIGZ1bGwgY2FsZW5kYXI6XG4gKiBAc3RhY2tlZC1leGFtcGxlKEZ1bGwgY2FsZW5kYXIsIGNhbGVuZGFyLWtpdC9jYWxlbmRhci1raXQtZnVsbC1jYWxlbmRhci5jb21wb25lbnQpXG4gKiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBOYlNoYXJlZE1vZHVsZSwgTmJCdXR0b25Nb2R1bGUsIE5iSWNvbk1vZHVsZSBdLFxuICBleHBvcnRzOiBbLi4uQ09NUE9ORU5UU10sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFNdLFxuICBwcm92aWRlcnM6IFsuLi5TRVJWSUNFU10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIE5iQ2FsZW5kYXJEYXlDZWxsQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQsXG4gICAgTmJDYWxlbmRhclllYXJDZWxsQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyS2l0TW9kdWxlIHtcbn1cbiJdfQ==