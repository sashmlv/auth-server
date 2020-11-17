'use strict';

module.exports = {

   'POST:/api/signin': {
      headers: {
         'Set-Cookie': 'session=refresh token;max-age=86400;samesite=lax;httpOnly;',
      },
      body: {
         accessToken: 'access token',
      }
   },
   'GET:/api/users': [
      {
         id: 1,
         email: 'aaa@email.com',
      },
      {
         id: 2,
         email: 'bbb@email.com',
      },
      {
         id: 3,
         email: 'ccc@email.com',
      },
   ],
};
