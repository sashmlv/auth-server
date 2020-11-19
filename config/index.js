'use strict';

const path = require( 'path' ),
   fs = require( 'fs' ),
   dotenv = require( 'dotenv' ),
   parseUrls = require( './parse.urls' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   env = dotenv.parse( fs.readFileSync( `${ ROOT }/.env` )),
   NODE_ENV = process.env.NODE_ENV || env.NODE_ENV || 'development';

for( const key in env ){

   if( process.env.hasOwnProperty( key )){

      continue;
   }

   process.env[ key ] = env[ key ];
}

const config = {

   NODE_ENV,
   PRODUCTION: NODE_ENV === 'production',
   SSL_ENABLED: env.SSL_ENABLED === 'true',
   SSL_KEY: env.SSL_KEY,
   SSL_CRT: env.SSL_CRT,
   HOST: env.HOST,
   PORT: env.PORT,
   ACCESS_KEY: env.ACCESS_KEY,
   REFRESH_KEY: env.REFRESH_KEY,
   STORAGE: {

      HOST: env.STORAGE_HOST,
      PORT: env.STORAGE_PORT,
      PASSWORD: env.STORAGE_PASSWORD,
   },
   URLS: {

      frontend: env.URLS_FRONTEND,
      apiUsers: env.URLS_API_USERS,
   },
};

config.URLS = parseUrls( config.URLS );

module.exports = Object.freeze( config );
