'use strict';

const jwt = require( 'jsonwebtoken' ),
   request = require( '../../modules/request' ),
   storage = require( '../../libs/storage' ),
   nanoid = require( 'nanoid' ),
   {
      ACCESS_KEY,
      REFRESH_KEY,
   } = require( '../../config/cred' );

/**
 * User access token
 * @param {object} res - response
 * @return {undefined} Return undefined
 **/
async function userCheckToken( req, res, { host, port }){

   var accDecoded = jwt.verify(req.headers.token, 'shhhhh');
   var refrDecoded = jwt.verify(req.headers.token, 'shhhhh');

   const user = await storage.get( refrDecoded.sid );

   const ok = user.token === accDecoded.sid;

//    case is( '/api/user',  req.url ):
//    case is( '/api/users', req.url ):

//       if ( ! userAuthenticate()){

//          return res
//             .writeHead( 401, { 'Content-Type': 'application/json' })
//             .end( UNAUTHORIZED_STR );
//       }
//       return await proxy( res, apiUsers );

   return ok;
}

module.exports = userCheckToken;
