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
                .selected-right {
                    background: #7b1fa2;
                    margin-left:40px !important; 
                }
            `]
})

export class AppComponent  {
    name = 'Angular';
    currentUser : SpotifyUser;
    selectedPlaylistLeft : SpotifyPlaylist = new SpotifyPlaylist();
    selectPlaylistRight : SpotifyPlaylist = new SpotifyPlaylist();

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

    setSelectedPlaylist(side : string,  playlist : SpotifyPlaylist) : void {
        if(side === 'Left'){
            this.selectedPlaylistLeft = playlist
        } else {
            this.selectPlaylistRight = playlist;
        }
    }


}
