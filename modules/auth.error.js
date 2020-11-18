'use strict';

class AuthError extends Error {

  constructor( args ){

    if( typeof args === 'string' ){

      args = { message: args };
    }

    const {

      message,
      code,
      status,
      data,
    } = args;

    super( message );

    this.name = 'AuthError';
    this.message = message || 'Auth Error';
    this.code = code || 'AUTH_ERROR';
    this.status = status || 400;
    this.data = data;

    if( Error.captureStackTrace ){

      Error.captureStackTrace( this, this.constructor );
    }
    else {

      this.stack = ( new Error()).stack;
    }
  }
}

module.exports = AuthError;
