/**
 * Created by Alex on 24/04/2017.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    template: `
    <div *ngIf="showLoader">
        <div>Loading</div>
    </div>
  `
})
export class LoaderComponent{
    @Input() showLoader: any;
}