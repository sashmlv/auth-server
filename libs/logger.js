'use strict';

const { PRODUCTION } = require( '../config' ),
   pino = require( 'pino' ),
   log = PRODUCTION ? {} : pino({

      prettyPrint: {

         colorize: true,
         errorProps: '*',
      },
   });

module.exports = log;
