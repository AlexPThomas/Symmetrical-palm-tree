/**
 * Created by Alex on 24/04/2017.
 */

export class SpotifyUser {
    display_name : string;
    email : string;
    id : string;
    images : SpotifyImage[];

}

export class SpotifyImage{
    height : number;
    width : number;
    url : string;
}