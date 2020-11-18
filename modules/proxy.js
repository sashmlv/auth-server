'use strict';

const {

   NODE_ENV,
   HOST,
   PORT,
   SSL_ENABLED,
} = require( '../config' ),
   http = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ) : require( 'http' );

function proxy( req, res, { host, port }){

   return new Promise(( resolve, reject ) => {

      return req.pipe(

         http.request(
            {
               host,
               port,
               headers: req.headers,
               method: req.method,
               path: req.url,
            },
            response => {

               response.on( 'error', err => reject( err ));
               res.writeHead( response.statusCode, response.headers );
               response.pipe( res );
               resolve();
            }
         ).on( 'error', err => reject( err ))
      );
   });
}

module.exports = proxy;
