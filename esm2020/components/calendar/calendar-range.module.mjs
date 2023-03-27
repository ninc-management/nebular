/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbCalendarRangeComponent } from './calendar-range.component';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';
import { NbCalendarRangeYearCellComponent } from './calendar-range-year-cell.component';
import { NbCalendarRangeMonthCellComponent } from './calendar-range-month-cell.component';
import { NbBaseCalendarModule } from './base-calendar.module';
import * as i0 from "@angular/core";
export class NbCalendarRangeModule {
}
NbCalendarRangeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarRangeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbCalendarRangeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarRangeModule, declarations: [NbCalendarRangeComponent,
        NbCalendarRangeDayCellComponent,
        NbCalendarRangeYearCellComponent,
        NbCalendarRangeMonthCellComponent], imports: [NbBaseCalendarModule], exports: [NbCalendarRangeComponent] });
NbCalendarRangeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarRangeModule, imports: [NbBaseCalendarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbCalendarRangeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbBaseCalendarModule],
                    exports: [NbCalendarRangeComponent],
                    declarations: [
                        NbCalendarRangeComponent,
                        NbCalendarRangeDayCellComponent,
                        NbCalendarRangeYearCellComponent,
                        NbCalendarRangeMonthCellComponent,
                    ],
                    entryComponents: [
                        NbCalendarRangeDayCellComponent,
                        NbCalendarRangeMonthCellComponent,
                        NbCalendarRangeYearCellComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFrQjlELE1BQU0sT0FBTyxxQkFBcUI7O21IQUFyQixxQkFBcUI7b0hBQXJCLHFCQUFxQixpQkFYOUIsd0JBQXdCO1FBQ3hCLCtCQUErQjtRQUMvQixnQ0FBZ0M7UUFDaEMsaUNBQWlDLGFBTnpCLG9CQUFvQixhQUNwQix3QkFBd0I7b0hBYXZCLHFCQUFxQixZQWR0QixvQkFBb0I7NEZBY25CLHFCQUFxQjtrQkFmakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ25DLFlBQVksRUFBRTt3QkFDWix3QkFBd0I7d0JBQ3hCLCtCQUErQjt3QkFDL0IsZ0NBQWdDO3dCQUNoQyxpQ0FBaUM7cUJBQ2xDO29CQUNELGVBQWUsRUFBRTt3QkFDZiwrQkFBK0I7d0JBQy9CLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3FCQUNqQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJDYWxlbmRhclJhbmdlQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yYW5nZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclJhbmdlRGF5Q2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UtZGF5LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZVllYXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1yYW5nZS15ZWFyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZU1vbnRoQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UtbW9udGgtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJCYXNlQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICcuL2Jhc2UtY2FsZW5kYXIubW9kdWxlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmJCYXNlQ2FsZW5kYXJNb2R1bGVdLFxuICBleHBvcnRzOiBbTmJDYWxlbmRhclJhbmdlQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmJDYWxlbmRhclJhbmdlQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJSYW5nZURheUNlbGxDb21wb25lbnQsXG4gICAgTmJDYWxlbmRhclJhbmdlWWVhckNlbGxDb21wb25lbnQsXG4gICAgTmJDYWxlbmRhclJhbmdlTW9udGhDZWxsQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBOYkNhbGVuZGFyUmFuZ2VEYXlDZWxsQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJSYW5nZU1vbnRoQ2VsbENvbXBvbmVudCxcbiAgICBOYkNhbGVuZGFyUmFuZ2VZZWFyQ2VsbENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJDYWxlbmRhclJhbmdlTW9kdWxlIHtcbn1cbiJdfQ==