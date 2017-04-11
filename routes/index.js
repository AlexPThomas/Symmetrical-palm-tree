var express = require('express');
var router = express.Router();
var spotifyDetails = require('./secretFile.js');
var request = require('request');
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
    //res.send(key);
    apiPost(key, res);
});

router.get('/main',function(req, res){
    res.render('index', {title: 'Songbirds', })
});

function apiPost(key, res) {
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
                //spotifyApi.setAccessToken(token);
                //console.log(token);
                res.redirect("http://localhost:3000/main?accesstoken=" + token);
            } else {
                console.log(response.statusCode);

            }
        }
    );
}

module.exports = router;
