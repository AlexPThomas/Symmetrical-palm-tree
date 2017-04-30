import { Component } from '@angular/core';
import {APIService} from './APIService.js'

import {SpotifyUser, SpotifyImage, SpotifyPlaylist} from './SpotifyObjects';

@Component({
  selector: 'my-app',
  templateUrl: 'templates/mainComponent.html',
    providers: [APIService]
})

export class AppComponent  {
    name = 'Angular';
    currentUser : SpotifyUser;
    constructor(private apiService: APIService){
        apiService.initialise().then((user : SpotifyUser)=> {
            this.currentUser = user;
            console.log(this.currentUser);
            apiService.getUserPlaylists(this.currentUser.id).then((playlists: {items: SpotifyPlaylist[]})=>{
                console.log(playlists);
            },
            error =>{
                console.log(error);
            })
        },
        error => {
            console.log(error);
        });
    }
}
