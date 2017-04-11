/**
 * Created by Alex on 11/04/2017.
 */
var pg = require('pg');
var details = require('./secretFile.js');
var pgConfig = {
    user: 'postgres', //env var: PGUSER
    database: 'Songbirds_dev', //env var: PGDATABASE
    password: details.getSpotifyDetails().database_password, //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(pgConfig);

//todo make this use a promise and be more variable
function runQuery(query){
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(query, ['1'], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].number);
            //output: 1
        });
    });
}

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
});


//Queries

exports.checkConnected = function(){
    runQuery('SELECT $1::int AS number');
};