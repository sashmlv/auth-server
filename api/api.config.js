'use strict';

const path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` );

const config = {

   ROOT,
   HOST: 'localhost',
   PORT: 3101,
   DEBUG: true,
};

module.exports = config;
