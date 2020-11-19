'use strict';

const jwt = require( 'jsonwebtoken' ),
   storage = require( '../../libs/storage' ),
   { nanoid } = require( 'nanoid' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config' ),
   notFound = JSON.stringify({

      message: 'Not Found',
      code: 'NOT_FOUND',
      status: 404,
   });

/**
 * User signin
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userSignin( res, { host, port }){

   let result = await request({

      host,
      port,
      path: '/api/user',
      method: 'POST',
      headers: {

         'Content-Type': 'application/json'
      },
   });

   result = typeof result === 'string' ? JSON.parse( result ) : result;

   const user = result.data,
      ok = result.success && user && user.id;

   if( ! ok ){

      return res
         .writeHead( 404, { 'Content-Type': 'application/json' })
         .end( notFound );
   }

   const accessSid = nanoid(),
      refreshSid = nanoid(),
      accessToken = jwt.sign({ sid: accessSid }, ACCESS_KEY ),
      refreshToken = jwt.sign({ sid: refreshSid }, REFRESH_KEY );

   await storage.set( refreshSid, JSON.stringify({
      ...user,
      accessSid,
   }));

   return res
      .writeHead( 200, {

         'Content-Type': 'application/json',
         'Set-Cookie': `token=${ refreshToken };max-age=2592000;samesite=lax;httpOnly;`, // max-age in sec.
      })
      .end( JSON.stringify({ accessToken, }));
}

module.exports = userSignin;
