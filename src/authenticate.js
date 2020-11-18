'use strict';

const jwt = require( 'jsonwebtoken' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../config' );

/**
 * Authenticate request
 * @return {boolean} Return
 **/
function authenticate(){

   const accessSid = nanoid(),
      refreshSid = nanoid(),
      accessToken = jwt.sign({ sid: accessSid }, ACCESS_KEY ),
      refreshToken = jwt.sign({ sid: refreshSid }, REFRESH_KEY );

   // await storage.get()
}

module.exports = authenticate;
