'use strict';

const { URLS } = require( '../../config' ),
   {
      frontend,
      apiUsers,
   } = URLS,
   proxy = require( '../../modules/proxy' ),
   userSignin = require( './user.signin' ),
   userAccessToken = require( './user.access.token' ),
   userAuthenticateApi = require( './user.authenticate.api' );

const toFrontend = ( req, res ) => proxy( req, res, frontend ),
   toApiUsers = ( req, res ) => proxy( req, res, apiUsers ),
   toUserSignin = ( req, res ) => userSignin( req, res, apiUsers ),
   toUserAccessToken = ( req, res ) => userAccessToken( req, res ),
   toUserAuthenticateApi = ( req, res ) => userAuthenticateApi( req, res, apiUsers );

const rules = {

   '/css':        toFrontend,
   '/js':         toFrontend,
   '/signin':     toFrontend,
   '/signup':     toFrontend,
   '/api/signup': toApiUsers,
   '/api/signin': toUserSignin,
   '/api/token':  toUserAccessToken,
   '/api/user':   toUserAuthenticateApi,
   '/api/users':  toUserAuthenticateApi,
};

module.exports = rules;
