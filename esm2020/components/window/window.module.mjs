import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCardModule } from '../card/card.module';
import { NbIconModule } from '../icon/icon.module';
import { NbButtonModule } from '../button/button.module';
import { NbWindowService } from './window.service';
import { NbWindowsContainerComponent } from './windows-container.component';
import { NbWindowComponent } from './window.component';
import { NB_WINDOW_CONFIG } from './window.options';
import * as i0 from "@angular/core";
export class NbWindowModule {
    static forRoot(defaultConfig) {
        return {
            ngModule: NbWindowModule,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
    static forChild(defaultConfig) {
        return {
            ngModule: NbWindowModule,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
}
NbWindowModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbWindowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbWindowModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbWindowModule, declarations: [NbWindowsContainerComponent,
        NbWindowComponent], imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule] });
NbWindowModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbWindowModule, imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbWindowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule],
                    declarations: [
                        NbWindowsContainerComponent,
                        NbWindowComponent,
                    ],
                    entryComponents: [NbWindowsContainerComponent, NbWindowComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy93aW5kb3cvd2luZG93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7O0FBVXBFLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBdUM7UUFDcEQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDdkQ7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBdUM7UUFDckQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDdkQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBbkJVLGNBQWM7NkdBQWQsY0FBYyxpQkFMdkIsMkJBQTJCO1FBQzNCLGlCQUFpQixhQUhSLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjOzZHQU96RSxjQUFjLFlBUGQsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWM7NEZBT3pFLGNBQWM7a0JBUjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBRTtvQkFDdEYsWUFBWSxFQUFFO3dCQUNaLDJCQUEyQjt3QkFDM0IsaUJBQWlCO3FCQUNsQjtvQkFDRCxlQUFlLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxpQkFBaUIsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5iT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5iQ2FyZE1vZHVsZSB9IGZyb20gJy4uL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5iV2luZG93U2VydmljZSB9IGZyb20gJy4vd2luZG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJXaW5kb3dzQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi93aW5kb3dzLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJXaW5kb3dDb21wb25lbnQgfSBmcm9tICcuL3dpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTkJfV0lORE9XX0NPTkZJRywgTmJXaW5kb3dDb25maWcgfSBmcm9tICcuL3dpbmRvdy5vcHRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE5iT3ZlcmxheU1vZHVsZSwgTmJDYXJkTW9kdWxlLCBOYkljb25Nb2R1bGUsIE5iQnV0dG9uTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5iV2luZG93c0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBOYldpbmRvd0NvbXBvbmVudCxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmJXaW5kb3dzQ29udGFpbmVyQ29tcG9uZW50LCBOYldpbmRvd0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5iV2luZG93TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoZGVmYXVsdENvbmZpZz86IFBhcnRpYWw8TmJXaW5kb3dDb25maWc+KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOYldpbmRvd01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJXaW5kb3dNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmJXaW5kb3dTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IE5CX1dJTkRPV19DT05GSUcsIHVzZVZhbHVlOiBkZWZhdWx0Q29uZmlnIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoZGVmYXVsdENvbmZpZz86IFBhcnRpYWw8TmJXaW5kb3dDb25maWc+KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOYldpbmRvd01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJXaW5kb3dNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmJXaW5kb3dTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IE5CX1dJTkRPV19DT05GSUcsIHVzZVZhbHVlOiBkZWZhdWx0Q29uZmlnIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==