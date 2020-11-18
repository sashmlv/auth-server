'use strict';

const { NODE_ENV } = require( '../config' ),
   pino = require( 'pino' ),
   log = NODE_ENV === 'production' ? {} : pino({

      prettyPrint: {

         colorize: true,
         errorProps: '*',
      },
   });

module.exports = log;
