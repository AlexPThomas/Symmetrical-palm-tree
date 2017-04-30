/**
 * Created by Alex on 24/04/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
let LoaderComponent = class LoaderComponent {
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LoaderComponent.prototype, "showLoader", void 0);
LoaderComponent = __decorate([
    core_1.Component({
        selector: 'loader',
        template: `
    <div *ngIf="showLoader">
        <md-spinner style="margin:0 auto;"></md-spinner>
    </div>
  `
    })
], LoaderComponent);
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=loader.component.js.map