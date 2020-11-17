'use strict';

const { Router } = require( 'express' ),
   router = Router(),
   { NOT_FOUND } = require( './errors' ),
   responses = require( './responses' );

router.use(( req, res, next ) => {

   const key = `${ req.method }:${ req.url }`,
      data = responses[ key ];

   if( data.headers ){

      for( const key in data.headers ){

         res.set( key, data.headers[ key ]);
      }
   }

   const response = {

      status: 200,
      data: data.body || data,
      success: true,
   };

   if( ! data  ) {

      return next( NOT_FOUND );
   }

   res.status( response.status ).json( response );
   return next();
});

module.exports = router;
