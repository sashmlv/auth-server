'use strict';

const log = require( 'pino' )(),
   proxy = require( './proxy' ),
   { URLS } = require( '../config' );

/**
 * Check access and go forward
 * @param {object} req
 * @param {object} res
 * @return {undefined}
 **/
function auth( req, res ) {

   log.info( req.url );

   switch ( true ){

      case is( '/css', req.url ):
      case is( '/js', req.url ):
      case is( '/signin', req.url ):
      case is( '/signup', req.url ):
         return proxy( req, res, URLS.frontend );
   }

   return res.writeHead( 404, {

      'Content-Type': 'application/json'
   }).end( JSON.stringify({

      message: 'Not Found',
      code: 'NOT_FOUND',
      status: 404,
   }));

};

/**
 * Check is url starts with str
 * @param {srting} str
 * @param {srting} url
 * @return {boolean} Return result
 **/

function is( str, url ) {

   return url.indexOf( str ) === 0;
}

module.exports = auth;
