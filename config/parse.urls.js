'use strict';

const url = require( 'fast-url-parser' ),
   AuthError = require( '../modules/auth.error' );

/**
 * Parse/prepare urls for config
 * @param {object} urls
 * @return {object} Return urls
 **/
function parseUrls( urls ){

   for( const key in urls ){

      const { hostname, port } = url.parse( urls[ key ]),
         ok = hostname && port;

      if( ! ok ){

         throw new AuthError( `Bad url in config: "${ urls[ key ]}"` );
      }

      urls[ key ] = {

         host: hostname,
         port,
      };

      Object.freeze( urls[ key ]);
   }

   return Object.freeze( urls );
}

module.exports = parseUrls;
