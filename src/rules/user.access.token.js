'use strict';

const jwt = require( 'jsonwebtoken' ),
   request = require( '../../modules/request' ),
   storage = require( '../../libs/storage' ),
   nanoid = require( 'nanoid' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config' );

/**
 * User access token
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userSignin( req, res, { host, port }){

   var decoded = jwt.verify(req.headers.token, 'shhhhh');

   const user = await storage.get( decoded.sid );

   let result = await request({

      host,
      port,
      path: '/api/user',
      method: 'POST',
      headers: {

         'Content-Type': 'application/json'
      },
      body: {
         id: user.id
      }
   });

   result = typeof result === 'string' ? JSON.parse( result ) : result;

   const ok = result.success && result.data && ( result.data.id === user.id );

   if( ! ok ){

      throw new Error('not allowed');
   }

   const accessSid = nanoid(),
      accessToken = jwt.sign({ sid: accessSid }, ACCESS_KEY );

   return res
      .writeHead( 200, {

         'Content-Type': 'application/json',
      })
      .end( JSON.stringify({ accessToken, }));
}

module.exports = userSignin;
