'use strict';

/**
 * Response
 * @param {object} res - response
 * @param {number} status
 * @param {object} headers
 * @param {string} body
 * @return {boolean} Return undefined
 **/
function response( res, status, headers, body ) {

   return res
      .writeHead( status, headers)
      .end( body );
}

module.exports = response;
