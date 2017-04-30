/**
 * Created by Alex on 24/04/2017.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    template: `
    <div *ngIf="showLoader">
        <md-spinner style="margin:0 auto;"></md-spinner>
    </div>
  `
})
export class LoaderComponent{
    @Input() showLoader: any;
}