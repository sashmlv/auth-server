'use strict';

const jwt = require( 'jsonwebtoken' ),
   storage = require( '../../libs/storage' ),
   jsonParse = require( '../../modules/json.parse' ),
   { nanoid } = require( 'nanoid' ),
   {
      UNAUTHORIZED_STR,
   } = require( '../../modules/errors' ),
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

   const refreshPayload = jwt.verify( refreshToken, REFRESH_KEY ),
      user = jsonParse( await storage.get( refreshPayload.sid )),
      userOk = user && user.id;

   if( ! userOk ){

      return res
         .writeHead( 401, { 'Content-Type': 'application/json' })
         .end( UNAUTHORIZED_STR, );
   }

   const accessSid = nanoid(),
      accessToken = jwt.sign({ sid: accessSid }, ACCESS_KEY, { expiresIn: 1200 }); // 1200 sec === 20 min

   await storage.set( refreshPayload.sid, JSON.stringify({

      ...user,
      accessSid,
   }));

   return res
      .writeHead( 200, { 'Content-Type': 'application/json' })
      .end( JSON.stringify({ accessToken, }));
}

module.exports = userAccessToken;
