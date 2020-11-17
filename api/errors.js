'use strict';

const errors = {

   DENIED: makeError({
      message: 'Access denied',
      code: 'ACCESS_DENIED',
      status: 403,
   }),

   NOT_FOUND: makeError({
      message: 'Not found',
      code: 'NOT_FOUND',
      status: 404,
   }),
};

/**
 * Make error
 * @param {object} args
 * @return {object} Return error
 **/
function makeError( args ) {

   const error = new Error(),
      {
         message,
         code,
         status,
      } = args;

   error.message = message;
   error.code = code;
   error.status = status;

   return error;
}

module.exports = errors;
