/**
 * Created by Alex on 14/04/2017.
 */

var express = require('express');
var router = express.Router();
var spotifyDetails = require('./secretFile.js');
var request = require('request');
var dbQueries = require('./dbQueries.js');

module.exports = router;

