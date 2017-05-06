/**
 * Created by Alex on 24/04/2017.
 */

export class SpotifyUser {
    display_name : string;
    email : string;
    id : string;
    images : SpotifyImage[];
    playlists : SpotifyPlayList[];

}

export class SpotifyImage{
    height : number;
    width : number;
    url : string;
}

export class SpotifyPlaylist{
    collaborative: boolean;
    id: string;
    images : SpotifyImage[];
    name: string;
    owner: {"href": string,
        "id": string,
        "type": string,
        "uri": string};
    public: boolean;
    tracks: {
            href: string;
            total: number;
        };
}