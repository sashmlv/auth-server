'use strict';

const {

   NOT_FOUND_STR,
   BAD_REQUEST_STR,
   UNAUTHORIZED_STR,
} = require( '../modules/errors' ),
   log = require( '../libs/logger' ),
   rules = require( './rules' ),
   url = require( 'fast-url-parser' );

/**
 * Check access and go forward
 * @param {object} req
 * @param {object} res
 * @return {undefined}
 **/
async function auth( req, res ){

   try {

      const rule = rules[( url.parse( req.url )).pathname ];

      if( rule ){

         return rule( req, res );
      }

      return res
         .writeHead( 404, { 'Content-Type': 'application/json' })
         .end( NOT_FOUND_STR );
   }
   catch( err ){

      log.error( err );
      return res
         .writeHead( 400, { 'Content-Type': 'application/json' })
         .end( BAD_REQUEST_STR );
   }
};

module.exports = auth;
