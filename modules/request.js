'use strict';

const {

   NODE_ENV,
   SSL_ENABLED,
} = require( '../config' ),
   http = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ) : require( 'http' );

/**
 * Request
 * @param {object} opts
 * @param {string} opts.host
 * @param {string} opts.port
 * @param {string} opts.path
 * @param {string} opts.method
 * @param {string} opts.headers
 * @return {object} Return result
 **/
async function request( opts ) {

   return new Promise(( resolve, reject ) => {

      let result = '';

      const req = http.request( opts, res => {

         res.on( 'data', chunk => result += chunk );
         res.on( 'end', _=> resolve( result ));
         res.on( 'error', err => reject( err ));
      });

      req.on( 'error', err => reject( err ));

      if( opts.data ){

         req.write( opts.data );
      }

      req.end();
   });
}
