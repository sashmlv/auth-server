'use strict';

const {

   NODE_ENV,
   HOST,
   PORT,
   SSL_ENABLED,
} = require( '../config' ),
   log = require( 'pino' )(),
   http = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ) : require( 'http' );

function proxy( req, res, { protocol, hostname, port }){

   return req.pipe(

      http.request(
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
