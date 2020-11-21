'use strict';

const jwt = require( 'jsonwebtoken' ),
   { promisify } = require( 'util' ),
   jwtSign = promisify( jwt.sign ),
   jwtVerify = promisify( jwt.verify ),
   storage = require( '../../libs/storage' ),
   jsonParse = require( '../../modules/json.parse' ),
   getBody = require( '../../modules/get.body' ),
   { nanoid } = require( 'nanoid' ),
   {
      UNAUTHORIZED_STR,
      NOT_FOUND_STR,
   } = require( '../../modules/errors' ),
   {
      ACCESS_SEC,
      REFRESH_SEC,
   } = require( '../../config' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config/cred' );

/**
 * User access token
 * @param {object} req
 * @param {object} res
 * @return {undefined} Return undefined
 **/
async function userAccessToken( req, res, { host, port }){

   if( req.method !== 'POST' ){

      return res
         .writeHead( 404, { 'Content-Type': 'application/json' })
         .end( NOT_FOUND_STR );
   }

   const cookie = req.headers.cookie;

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

   const { id } = await getBody( req ), // user id
      refreshPayload = await jwtVerify( refreshToken, REFRESH_KEY ),
      user = jsonParse( await storage.get( refreshPayload.sid )),
      maxUsed = Math.floor( + REFRESH_SEC / + ACCESS_SEC ),
      userOk = id && user && user.id && (
         id === user.id
      ) && (
         user.used < maxUsed
      ) && (
         user.userAgent === req.headers[ 'user-agent' ]
      );

   if( ! userOk ){

      await storage.del( refreshPayload.sid );

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   const accessSid = nanoid(),
      accessToken = await jwtSign({ sid: accessSid }, ACCESS_KEY, { expiresIn: ACCESS_SEC });

   await storage.set( refreshPayload.sid, JSON.stringify({

      ...user,
      accessSid,
      used: user.used ++,
   }), 'KEEPTTL' );

   return res
      .writeHead( 200, { 'Content-Type': 'application/json' })
      .end( JSON.stringify({ accessToken, }));
}

module.exports = userAccessToken;
