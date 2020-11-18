'use strict';

const errors = {

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
