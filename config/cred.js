'use strict';

const crypt = require( './modules/crypt' ),
   AuthError = require( '../modules/auth.error' ),
   PASSWORD = process.env.PASSWORD,
   SALT = process.env.SALT,
   ACCESS_KEY = process.env.ACCESS_KEY,
   REFRESH_KEY = process.env.REFRESH_KEY,
   LENGTH = 20,
   ok = PASSWORD.length > LENGTH && SALT.length > LENGTH &&
      ACCESS_KEY.length > LENGTH && REFRESH_KEY.length > LENGTH;

if( ! ok ){

   throw new AuthError( 'Please check keys' );
}

crypt.initSync( PASSWORD, SALT );

module.exports = Object.freeze({

   ACCESS_KEY: crypt.decrypt( ACCESS_KEY ),
   REFRESH_KEY: crypt.decrypt( REFRESH_KEY ),
});
