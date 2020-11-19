'use strict';

const AuthError = require( './auth.error' ),
   NOT_FOUND = new AuthError({

      message: 'Not Found',
      code: 'NOT_FOUND',
      status: 404,
   }),
   NOT_FOUND_STR = JSON.stringify( NOT_FOUND ),
   BAD_REQUEST = new AuthError({

      message: 'Bad Request',
      code: 'BAD_REQUEST',
      status: 400,
   }),
   BAD_REQUEST_STR = JSON.stringify( BAD_REQUEST ),
   UNAUTHORIZED = new AuthError({

      message: 'Unauthorized',
      code: 'UNAUTHORIZED',
      status: 401,
   }),
   UNAUTHORIZED_STR = JSON.stringify( UNAUTHORIZED );

module.exports = {

   NOT_FOUND,
   NOT_FOUND_STR,
   BAD_REQUEST,
   BAD_REQUEST_STR,
   UNAUTHORIZED,
   UNAUTHORIZED_STR,
};
