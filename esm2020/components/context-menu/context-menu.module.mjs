/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuModule } from '../menu/menu.module';
import * as i0 from "@angular/core";
export class NbContextMenuModule {
}
NbContextMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbContextMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbContextMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NbContextMenuModule, declarations: [NbContextMenuDirective, NbContextMenuComponent], imports: [CommonModule, NbOverlayModule, NbMenuModule], exports: [NbContextMenuDirective] });
NbContextMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbContextMenuModule, imports: [CommonModule, NbOverlayModule, NbMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NbContextMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NbOverlayModule, NbMenuModule],
                    exports: [NbContextMenuDirective],
                    declarations: [NbContextMenuDirective, NbContextMenuComponent],
                    entryComponents: [NbContextMenuComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFTbkQsTUFBTSxPQUFPLG1CQUFtQjs7aUhBQW5CLG1CQUFtQjtrSEFBbkIsbUJBQW1CLGlCQUhmLHNCQUFzQixFQUFFLHNCQUFzQixhQUZuRCxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksYUFDM0Msc0JBQXNCO2tIQUlyQixtQkFBbUIsWUFMcEIsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZOzRGQUsxQyxtQkFBbUI7a0JBTi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQztvQkFDOUQsZUFBZSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJDb250ZXh0TWVudURpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYkNvbnRleHRNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE5iTWVudU1vZHVsZSB9IGZyb20gJy4uL21lbnUvbWVudS5tb2R1bGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5iT3ZlcmxheU1vZHVsZSwgTmJNZW51TW9kdWxlXSxcbiAgZXhwb3J0czogW05iQ29udGV4dE1lbnVEaXJlY3RpdmVdLFxuICBkZWNsYXJhdGlvbnM6IFtOYkNvbnRleHRNZW51RGlyZWN0aXZlLCBOYkNvbnRleHRNZW51Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmJDb250ZXh0TWVudUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5iQ29udGV4dE1lbnVNb2R1bGUge1xufVxuIl19