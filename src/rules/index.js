'use strict';

const { URLS } = require( '../config' ),
   {
      frontend,
      apiUsers,
   } = URLS,
   proxy = require( '../modules/proxy' ),
   userSignin = require( './user/user.signin' ),
   userToken = require( './user/user.access.token' ),
   userAuthApi = require( './user/user.auth.api' );

const toFrontend = ( req, res ) => proxy( req, res, frontend ),
   toApiUsers = ( req, res ) => proxy( req, res, apiUsers ),
   toUserSignin = ( req, res ) => userSignin( res, apiUsers ),
   toUserToken = ( req, res ) => userToken( res, apiUsers ),
   toUserAuthApi = ( req, res ) => userAuthApi( res, apiUsers );

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
