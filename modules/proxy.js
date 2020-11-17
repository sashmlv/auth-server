'use strict';

const {

   NODE_ENV,
   HOST,
   PORT,
   SSL_ENABLED,
} = require( '../config' ),
   log = require( 'pino' )(),
   http = require( 'http' ),
   https = require( 'https' );

function proxy( req, res, { protocol, hostname, port }){

   return req.pipe(

      protocol === 'https' ? https.request(
         {
            host: hostname,
            port: port,
            headers: req.headers,
            method: req.method,
            path: req.url,
         },
         response => {
            res.writeHead( response.statusCode, response.headers );
            response.pipe( res );
         }
      ) : http.request(
         {
            host: hostname,
            port: port,
            headers: req.headers,
            method: req.method,
            path: req.url,
         },
         response => {
            res.writeHead( response.statusCode, response.headers );
            response.pipe( res );
         }
      )
   );
}

module.exports = proxy;
