'use strict';

const jwt = require( 'jsonwebtoken' ),
   request = require( './request' ),
   response = require( './response' ),
   storage = require( '../libs/storage' ),
   nanoid = require( 'nanoid' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../config' );

/**
 * User signin
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userSignin( res, { host, port }){

   const user = await request({

      host,
      port,
      path: '/api/user',
      method: 'POST',
      headers: {

         'Content-Type': 'application/json'
      }
   });

   const accessToken = jwt.sign({ sid: nanoid() }, ACCESS_KEY ),
      refreshToken = jwt.sign({ sid: nanoid() }, REFRESH_KEY );

   // await storage.set()

   return response( res, 200, {

      'Content-Type': 'application/json',
      'Set-Cookie': `refresh=${ refreshToken };max-age=2592000;samesite=lax;httpOnly;`, // max-age in sec.
   },
      JSON.stringify({ accessToken, }),
   );
}

module.exports = userSignin;
