/**
 * Created by Alex on 16/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class APIService {
    apiUrl: string = '';
    accessToken: String = '';
    constructor(private http: Http){}
    public initialise(): void {
        this.http.get(this.apiUrl + '/token')
            .toPromise()
            .then(this.extractData)
            .then((body :any) => {
                console.log(body);
                this.accessToken = body.accessToken;
                console.log('successful token ' + this.accessToken);
                let headers = new Headers({ 'Authorization': ' Bearer ' + this.accessToken });
                let options = new RequestOptions({ headers: headers });
                this.http.get('https://api.spotify.com/v1/me',options)
                    .toPromise()
                    .then(this.extractData)
                    .then((body :any)=> {
                        console.log(body);
                    })
                    .catch(this.handleError);
            })
            .catch(this.handleError);
    }




    private extractData(res: Response){
        console.log(res);
        let body = res.json();
        console.log(body.accessToken);
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('there was an error',errMsg);
        return Promise.reject(errMsg);
    }
}
