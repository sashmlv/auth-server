'use strict';

const { URLS } = require( '../../config' ),
   {
      frontend,
      apiUsers,
   } = URLS,
   proxy = require( '../../modules/proxy' ),
   userSignin = require( './user.signin' ),
   userToken = require( './user.access.token' ),
   userAuthApi = require( './user.auth.api' );

const toFrontend = ( req, res ) => proxy( req, res, frontend ),
   toApiUsers = ( req, res ) => proxy( req, res, apiUsers ),
   toUserSignin = ( req, res ) => userSignin( req, res, apiUsers ),
   toUserToken = ( req, res ) => userToken( req, res, apiUsers ),
   toUserAuthApi = ( req, res ) => userAuthApi( req, res, apiUsers );

const rules = {

   '/css':        toFrontend,
   '/js':         toFrontend,
   '/signin':     toFrontend,
   '/signup':     toFrontend,
   '/api/signup': toApiUsers,
   '/api/signin': toUserSignin,
   '/api/token':  toUserToken,
   '/api/user':   toUserAuthApi,
   '/api/users':  toUserAuthApi,
};

module.exports = rules;
