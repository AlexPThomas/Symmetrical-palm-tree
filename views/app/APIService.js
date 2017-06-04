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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Alex on 16/04/2017.
 */
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
let APIService = class APIService {
    constructor(http) {
        this.http = http;
        this.apiUrl = '';
        this.accessToken = '';
    }
    initialise() {
        return this.http.get(this.apiUrl + '/token')
            .toPromise()
            .then(this.extractData)
            .then((body) => {
            console.log(body);
            this.accessToken = body.accessToken;
            console.log('successful token ' + this.accessToken);
            let headers = new http_1.Headers({ 'Authorization': ' Bearer ' + this.accessToken });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.get('https://api.spotify.com/v1/me', options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        })
            .catch(this.handleError);
    }
    getUserPlaylists(id) {
        let headers = new http_1.Headers({ 'Authorization': ' Bearer ' + this.accessToken });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('https://api.spotify.com/v1/users/' + id + '/playlists', options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    extractData(res) {
        let body = res.json();
        return body || {};
    }
    handleError(error) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('there was an error', errMsg);
        return Promise.reject(errMsg);
    }
};
APIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], APIService);
exports.APIService = APIService;
//# sourceMappingURL=APIService.js.map