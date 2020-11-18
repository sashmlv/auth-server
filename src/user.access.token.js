'use strict';

const response = require( '../modules/response' ),
   storage = require( '../libs/storage' ),
   nanoid = require( 'nanoid' );

/**
 * User access token
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userSignin( res, { host, port }){

   // const accessToken = token( 'access', {

   //    sid: nanoid(),
   // });

   return response( res, 200, {

      'Content-Type': 'application/json',
   },
      JSON.stringify({ accessToken, }),
   );
}

module.exports = userSignin;
