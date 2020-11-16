'use strict';

/**
 * Check access and go forward
 * @param {object} req
 * @param {object} res
 * @return {undefined}
 **/
function auth( req, res ) {

   switch ( true ){

      case '' === req.url:
         return undefined;
   }

   return res.writeHead(
      200, {

         'Content-Type': 'application/json'
      }
   ).end( JSON.stringify({

      name: 'AuthError',
      message: 'Access denied',
      code: 'ACCESS_DENIED',
      status: 403,
   }));

};

module.exports = auth;
