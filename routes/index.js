var express = require('express');
var router = express.Router();
var spotifyDetails = require('./secretFile.js');
var request = require('request');
var dbQueries = require('./dbQueries.js');
var nodeCache = require('node-cache');
//stdTTL is the default timeout for each of the items stored
var tempStorage = new nodeCache({stdTTL:100,checkperiod: 600});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Songbirds' });
});

router.get('/auth', function(req, res){
    var client_id = spotifyDetails.getSpotifyDetails().client_id;
    var response_type = 'code';
    var redirect_uri = spotifyDetails.getSpotifyDetails().redirect_uri;
    //todo add state to the parameters so as to authenticate the request
    res.redirect('https://accounts.spotify.com/authorize?client_id='+client_id+'&response_type='+response_type+'&redirect_uri='+redirect_uri);
});

router.get('/callback', function (req, res) {
    var key = req.query.code;
    getSpotifyToken(key, res);
});

router.get('/main',function(req, res){
    dbQueries.checkConnected();
    var tokenKey = req.query.tokenKey;
    var accessToken = tempStorage.get(tokenKey);
    if(accessToken){
        res.render('index', {title: 'Songbirds', tokenKey:tokenKey, accessToken: accessToken})
    }else{
        res.render('error',{message: 'error connecting your account with spotify', error:req.error});
    }

});



function getSpotifyToken(key, res) {
    var encoded_auth = (new Buffer(spotifyDetails.getSpotifyDetails().client_id +":"+ spotifyDetails.getSpotifyDetails().client_secret).toString("base64"));
    request.post(
        'https://accounts.spotify.com/api/token',
        {
            form: {
                grant_type: 'authorization_code',
                code: key,
                redirect_uri: 'http://localhost:3000/callback'
            },
            headers: {
                Authorization: 'Basic ' + encoded_auth
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var token = JSON.parse(body).access_token;
                var randomKey = makeRandomString(6);
                tempStorage.set(randomKey, token);
                res.redirect("http://localhost:3000/main?tokenKey=" + randomKey);
            } else {
                console.log(response.statusCode);

            }
        }
    );
}

function makeRandomString(size){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < size; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = router;
