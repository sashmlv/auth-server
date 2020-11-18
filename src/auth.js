'use strict';

const proxy = require( '../modules/proxy' ),
   { URLS } = require( '../config' ),
   {
      frontend,
      apiUsers,
   } = URLS,
   log = require( '../libs/logger' ),
   is = require( '../modules/is' ),
   response = require( '../modules/response' ),
   userSignin = require( './user.signin' ),
   userToken = require( './user.access.token' ),
   notFound = JSON.stringify({

      message: 'Not Found',
      code: 'NOT_FOUND',
      status: 404,
   }),
   badRequest = JSON.stringify({

      message: 'Bad Request',
      code: 'BAD_REQUEST',
      status: 400,
   });

/**
 * Check access and go forward
 * @param {object} req
 * @param {object} res
 * @return {undefined}
 **/
async function auth( req, res ) {

   try {

      switch ( true ){

         case is( '/css', req.url ):
         case is( '/js', req.url ):
         case is( '/signin', req.url ):
         case is( '/signup', req.url ):

            return await proxy( req, res, frontend );

         case is( '/api/signup', req.url ):

            return await proxy( req, res, apiUsers );

         case is( '/api/signin', req.url ):

            return await userSignin( res, apiUsers );

         case is( '/api/token', req.url ):

            return await userToken( res, apiUsers );
      }

      return response( res, 404, { 'Content-Type': 'application/json' }, notFound );
   }
   catch( err ){

      log.error( err );
      return response( res, 400, { 'Content-Type': 'application/json' }, badRequest );
   }
};

module.exports = auth;
