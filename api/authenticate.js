'use strict';

const { DENIED } = require( './errors' );

function authenticate( req, res, next ) {

   const token = req.headers.authorization,
      { session } = req.cookies,
      access = session === 'refresh token' && token === 'Bearer: access token' || req.url === '/api/signin';

   if( access ) {

      return next();
   }

   return next( DENIED );
}

module.exports = authenticate;
