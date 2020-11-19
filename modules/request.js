'use strict';

const {

   NODE_ENV,
   SSL_ENABLED,
} = require( '../config' ),
   http = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ) : require( 'http' );

/**
 * Request
 * @param {object} args
 * @param {string} args.host
 * @param {string} args.port
 * @param {string} args.path
 * @param {string} args.method
 * @param {string} args.headers
 * @param {string} args.opts.json
 * @return {object} Return result
 **/
async function request( args ) {

   return new Promise(( resolve, reject ) => {

      let result = '',
         body = args.body;

      const {

         host,
         port,
         path,
         method,
         headers = {},
         opts = {},
      } = args;

      if( body ){

         body = JSON.stringify( body );
         headers[ 'Content-Type' ] = 'application/json';
         headers[ 'Content-Length' ] = Buffer.byteLength( body, 'utf8' );
      }

      const req = http.request({
            host,
            port,
            path,
            method,
            headers,
         }, res => {

            res.on( 'data', chunk => result += chunk );
            res.on( 'end', _=> {

               try {

                  if( opts.json ){

                     result = JSON.parse( result );
                  }

                  resolve( result );
               }
               catch( err ) {

                  reject( err );
               }
            });
            res.on( 'error', err => reject( err ));
         });

      req.on( 'error', err => reject( err ));

      if( body ){

         req.write( body );
      }

      req.end();
   });
}

module.exports = request;
