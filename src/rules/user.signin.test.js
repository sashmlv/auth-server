'use strict';

const sinon = require( 'sinon' ),
   patch = require( '../../test/monkey.patching' ),
   { ROOT } = require( '../../config' ),
   {
      NOT_FOUND_STR,
   } = require( '../../modules/errors' ),
   storage = { set: sinon.spy()},
   jwt = { sign: sinon.spy()},
   getBody = sinon.spy(),
   request = sinon.spy(),
   jsonParse = sinon.stub();

const end = sinon.spy( str => str ),
   writeHead = sinon.spy(( status, headers ) => {

      return { end };
   }),
   res = { writeHead },
   req = { method: 'POST', headers: { 'user-agent': 'Ok' }},
   apiAddr = {

      host: 'localhost',
      port: 5000,
   };

/* replace cached modules for './user.signin' */
patch( `${ ROOT }/modules/get.body`, getBody );
patch( `${ ROOT }/modules/request`, request );
patch( `${ ROOT }/modules/json.parse`, jsonParse );
patch( `${ ROOT }/libs/storage`, storage );
patch( `jsonwebtoken`, jwt );

const util = { promisify: sinon.spy( _=>_ )}; // only before user.signin, because this module can be used in other modules

patch( `util`, util );

const userSignin = require( './user.signin' );

describe( 'user.signin', () => {

   beforeEach(() => {

      end.resetHistory();
      writeHead.resetHistory();
      getBody.resetHistory();
      request.resetHistory();
      jsonParse.resetHistory();
      jwt.sign.resetHistory();
      storage.set.resetHistory();
      util.promisify.resetHistory();
   });

   it( 'method POST', async () => {

      await userSignin({ method: 'GET' }, res, apiAddr );

      expect( writeHead.withArgs(
         404,
         { 'Content-Type': 'application/json' }
      ).calledOnce ).toBe( true );
      expect( end.args.flat().shift()).toEqual( NOT_FOUND_STR );
   });

   it( 'request user data', async () => {

      await userSignin( req, res, apiAddr );

      expect( request.args.flat().shift()).toEqual({
         host: apiAddr.host,
         port: apiAddr.port,
         path: '/api/user',
         method: 'POST',
         opts: { json: true },
         body: undefined,
      });

      expect( getBody.args.flat().shift()).toEqual( req );
      expect( writeHead.withArgs(
         404,
         { 'Content-Type': 'application/json' }
      ).calledOnce ).toBe( true );
      expect( end.args.flat().shift()).toEqual( NOT_FOUND_STR );
      expect( jsonParse.callCount ).toEqual( 1 );
   });

   it( 'user data is ok', async () => {

      jsonParse.returns({

         data: { id: 0 },
         success: false,
      });

      await userSignin( req, res, apiAddr );

      expect( jsonParse.callCount ).toEqual( 1 );

      jsonParse.returns({

         data: { id: 1 },
         success: true,
      });

      await userSignin( req, res, apiAddr );

      expect( jwt.sign.callCount ).toEqual( 2 );
      expect( storage.set.callCount ).toEqual( 1 );

      // TODO: done tests
   });
});
