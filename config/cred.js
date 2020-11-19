'use strict';

const crypt = require( '../modules/crypt' ),
   AuthError = require( '../modules/auth.error' ),
   {
      PRODUCTION,
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../config' ),
   path = require( 'path' ),
   fs = require( 'fs' ),
   dotenv = require( 'dotenv' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   crd = dotenv.parse( fs.readFileSync( `${ ROOT }/.crd` )),
   PASSWORD = crd.PASSWORD,
   SALT = crd.SALT,
   keys = {},
   LENGTH = 20,
   ok = PASSWORD.length > LENGTH && SALT.length > LENGTH &&
      ACCESS_KEY.length > LENGTH && REFRESH_KEY.length > LENGTH;

if( ! ok ){

   throw new AuthError( 'Please check keys' );
}

if( PRODUCTION ){

   crypt.initSync( PASSWORD, SALT );

   keys.ACCESS_KEY = crypt.decrypt( ACCESS_KEY );
   keys.REFRESH_KEY = crypt.decrypt( REFRESH_KEY );
}
else {

   keys.ACCESS_KEY = ACCESS_KEY;
   keys.REFRESH_KEY = REFRESH_KEY;
}

module.exports = Object.freeze( keys );
