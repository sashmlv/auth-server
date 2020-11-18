'use strict';

const {

   NODE_ENV,
   HOST,
   PORT,
   SSL_ENABLED,
} = require( './config' ),
   log = require( 'pino' )(),
   PROTOCOL = NODE_ENV === 'production' || SSL_ENABLED ? 'https' : 'http',
   http = PROTOCOL === 'https' ? require( 'https' ) : require( 'http' ),
   auth = require( './src/auth' );

process.on('unhandledRejection', err => log.error(err))
  .on('uncaughtException', err => log.error(err));

http.createServer( auth ).listen(

   PORT,
   HOST,
   _=> log.info( `Server listen at ${ PROTOCOL }://${ HOST }:${ PORT }` )
);
