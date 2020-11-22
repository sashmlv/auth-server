'use strict';

const jwt = require( 'jsonwebtoken' ),
   { promisify } = require( 'util' ),
   jwtVerify = promisify( jwt.verify ),
   jwtDecode = promisify( jwt.decode ),
   proxy = require( '../../modules/proxy' ),
   storage = require( '../../libs/storage' ),
   jsonParse = require( '../../modules/json.parse' ),
   {
      UNAUTHORIZED_STR,
   } = require( '../../modules/errors' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config/cred' );

/**
 * Authenticate user for acceess to api
 * @param {object} req
 * @param {object} res
 * @param {object} args
 * @param {string} args.host - api host
 * @param {string} args.port - api port
 * @return {undefined} Return undefined
 **/
async function userAuthenticateApi( req, res, { host, port }){

   const authorization = req.headers.authorization;

   if( ! authorization ){

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   const accessToken = authorization.substring( 7 ), // "Bearer " -> length 7
      accessPayload = await jwtVerify( accessToken, ACCESS_KEY ),
      cookie = req.headers.cookie;

   if( ! cookie ){

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   const startTokenPos = cookie.indexOf( 'token=' ) + 6, // token= -> length 6
      semicolonPos = cookie.indexOf( ';', startTokenPos ),
      endTokenPos = semicolonPos < 0 ? cookie.length : semicolonPos,
      refreshToken = cookie.substring( startTokenPos, endTokenPos );

   if( ! refreshToken ){

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   const refreshPayload = await jwtDecode( refreshToken ),
      user = jsonParse( await storage.get( refreshPayload.sid )),
      userOk = user && user.id && (
         user.accessSid === accessPayload.sid
      ) && (
         user.userAgent === req.headers[ 'user-agent' ]
      );

   if( ! userOk ){

      await storage.del( refreshPayload.sid );

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   return proxy( req, res, { host, port });
}

module.exports = userAuthenticateApi;
