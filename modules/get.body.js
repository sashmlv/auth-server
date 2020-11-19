'use strict';

/**
 * Get request body
 * @param {object} req
 * @return {*} Return data
 **/
async function getBody( req ){

   let body;

   if( req.method === 'POST' ){

      body = await new Promise(( resolve, reject ) => {

         let data = '';

         req.on( 'data', chunk => data += chunk.toString());
         req.on( 'end', () => resolve( data ));
         req.on( 'error', err => reject( err ));
      });

      if( req.headers[ 'content-type' ] === 'application/json' ){

         body = JSON.parse( body );
      }
   }

   return body;
}

module.exports = getBody;
