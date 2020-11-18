'use strict';

const request = require( './request' ),
   jwt = require( 'jsonwebtoken' );

/**
 * User signin
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userSignin( res, { host, port }){

   const data = await request({

      host,
      port,
      path: '/api/user',
      method: 'POST',
      headers: {

         'Content-Type': 'application/json'
      }
   });

   // const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

   // res.writeHead( 200, {

   //    'Content-Type': 'application/json'
   // }).end( JSON.stringify({ token: 'token' }));
}

module.exports = userSignin;
