import { Component } from '@angular/core';
import {APIService} from './APIService.js'
@Component({
  selector: 'my-app',
  templateUrl: 'templates/mainComponent.html',
    providers: [APIService]
})

export class AppComponent  {
    name = 'Angular';
    constructor(private apiService: APIService){
        apiService.initialise();
    }
}
