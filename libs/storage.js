'use strict';

const config = require( '../config' ),
   log = require( 'pino' ),
   redis = require( 'redis' ),
   { promisify } = require( 'util' ),
   client = redis.createClient({

      host: config.STORAGE.HOST,
      port: config.STORAGE.PORT,
      password: config.STORAGE.PASSWORD,
   });

client.on( 'error', err => log.error( err ));
client.on( 'warning', msg => log.warn( msg ));
client.on( 'connect', _=> log.info( 'Redis connected' ));
client.on( 'ready', _=> log.info( 'Redis ready' ));
client.on( 'reconnecting', _=> log.info( 'Redis reconnecting' ));
client.on( 'end', _=> log.info( 'Redis connection end' ));

module.exports = {

   get: promisify( client.get ).bind( client ),
   set: promisify( client.set ).bind( client ),
   del: promisify( client.del ).bind( client ),
};
