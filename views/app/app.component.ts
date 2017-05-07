import { Component} from '@angular/core';
import {APIService} from './APIService.js'

import {SpotifyUser, SpotifyImage, SpotifyPlaylist} from './SpotifyObjects.js';

@Component({
  selector: 'my-app',
  templateUrl: 'templates/mainComponent.html',
    providers: [APIService],
    styles: [`
                .selected-left {
                    background: #7b1fa2;
                    margin-left:20px;
                }
            `]
})

export class AppComponent  {
    name = 'Angular';
    currentUser : SpotifyUser;
    selectedPlaylistLeft : SpotifyPlaylist = new SpotifyPlaylist();


    constructor(private apiService: APIService){
        apiService.initialise().then((user : SpotifyUser)=> {
            this.currentUser = user;
            console.log(this.currentUser);
            apiService.getUserPlaylists(this.currentUser.id).then((playlists: {items: SpotifyPlaylist[]})=>{
                console.log(playlists);
                this.currentUser.playlists = playlists.items;
            },
            error =>{
                console.log(error);
            })
        },
        error => {
            console.log(error);
        });
    }

    setLeftPlaylist(playlist : SpotifyPlaylist) : void {
        this.selectedPlaylistLeft = playlist;
    }
}
