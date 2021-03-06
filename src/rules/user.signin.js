'use strict';

const jwt = require( 'jsonwebtoken' ),
   { promisify } = require( 'util' ),
   jwtSign = promisify( jwt.sign ),
   storage = require( '../../libs/storage' ),
   request = require( '../../modules/request' ),
   getBody = require( '../../modules/get.body' ),
   jsonParse = require( '../../modules/json.parse' ),
   { nanoid } = require( 'nanoid' ),
   {
      NOT_FOUND_STR,
   } = require( '../../modules/errors' ),
   {
      PRODUCTION,
      SSL_ENABLED,
      ACCESS_SEC,
      REFRESH_SEC,
   } = require( '../../config' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config/cred' ),
   cookieSecure = PRODUCTION || SSL_ENABLED ? 'secure;' : '';

/**
 * User signin
 * @param {object} req
 * @param {object} res
 * @param {object} args
 * @param {string} args.host - user api host
 * @param {string} args.port - user api port
 * @return {undefined} Return undefined
 **/
async function userSignin( req, res, { host, port }){

   if( req.method !== 'POST' ){

      return res
         .writeHead( 404, { 'Content-Type': 'application/json' })
         .end( NOT_FOUND_STR );
   }

   const result = jsonParse( await request({

      host,
      port,
      path: '/api/user',
      method: 'POST',
      opts: {

         json: true,
      },
      body: await getBody( req ),
   }));

   const user = result && result.data,
      userOk = result && result.success && user && user.id;

   if( ! userOk ){

      return res
         .writeHead( 404, { 'Content-Type': 'application/json' })
         .end( NOT_FOUND_STR );
   }

   const accessSid = nanoid(),
      refreshSid = nanoid(),
      accessToken = await jwtSign({ sid: accessSid }, ACCESS_KEY, { expiresIn: ACCESS_SEC }),
      refreshToken = await jwtSign({ sid: refreshSid }, REFRESH_KEY, { expiresIn: REFRESH_SEC });

   await storage.set( refreshSid, JSON.stringify({

      ...user,
      accessSid,
      userAgent: req.headers[ 'user-agent' ],
      used: 0, // count refresh token uses
   }), 'EX', REFRESH_SEC );

   return res
      .writeHead( 200, {

         'Content-Type': 'application/json',
         'Set-Cookie': `token=${ refreshToken };max-age=${ REFRESH_SEC };samesite=lax;${ cookieSecure }httpOnly;`,
      })
      .end( JSON.stringify({ accessToken, }));
}

module.exports = userSignin;
