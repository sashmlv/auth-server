'use strict';

const proxy = require( './proxy' ),
   {
      NODE_ENV,
      SSL_ENABLED,
      URLS,
   } = require( '../config' ),
   {
      frontend,
      apiUsers,
   } = URLS,
   http = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ) : require( 'http' ),
   notFound = JSON.stringify({

      message: 'Not Found',
      code: 'NOT_FOUND',
      status: 404,
   });

/**
 * Check access and go forward
 * @param {object} req
 * @param {object} res
 * @return {undefined}
 **/
function auth( req, res ) {

   switch ( true ){

      case is( '/css', req.url ):
      case is( '/js', req.url ):
      case is( '/signin', req.url ):
      case is( '/signup', req.url ):
         return proxy( req, res, frontend );
      case is( '/api/signup', req.url ):
         return proxy( req, res, apiUsers );
      case is( '/api/signin', req.url ):
         // return proxy( req, res, apiUsers );
   }

   return res.writeHead( 404, {

      'Content-Type': 'application/json'
   }).end( notFound );
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
