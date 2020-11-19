'use strict';

const crypto = require( 'crypto' ),
   util = require( 'util' ),
   AuthError = require( './auth.error' ),
   scrypt  = util.promisify( crypto.scrypt );

/**
 * Crypt
 * https://stackoverflow.com/questions/6953286/node-js-encrypting-data-that-needs-to-be-decrypted/61337361#61337361
 **/
class Crypt {

   /**
    * Set params
    * @param {string} password
    * @param {string} salt
    **/
   async init( password, salt ){

      this.algorithm = 'aes-192-cbc';
      this.password = password;
      this.salt = salt;
      this.key = await scrypt( this.password, this.salt, 24 );
      this.iv = Buffer.alloc( 16, 0 );
   };

   /**
    * Set params sync
    * @param {string} password
    * @param {string} salt
    **/
   initSync( password, salt ){

      this.algorithm = 'aes-192-cbc';
      this.password = password;
      this.salt = salt;
      this.key = crypto.scryptSync( this.password, this.salt, 24 );
      this.iv = Buffer.alloc( 16, 0 );
   };

   /**
    * Check init
    * @return {undefined}
    **/
   checkInit(){

      const initialized = Boolean(

         this.algorithm && this.password && this.salt && this.key && this.iv
      );

      if( ! initialized ){

        throw new AuthError({

            message: 'Crypt module not initialized',
            code: 'CRYPT_NOT_INITIALIZED',
         });
      };
   }

   /**
    * Encrypt
    * @param {string} text
    * @return {string} Return encrypted string
    **/
   encrypt( text ){

      this.checkInit();

      const cipher = crypto.createCipheriv( this.algorithm, this.key, this.iv ),
         encrypted = cipher.update( text, 'utf8', 'hex' ) +
           cipher.final( 'hex' );

      return encrypted;
   };

   /**
    * Decrypt
    * @param {string} text
    * @return {string} Return decrypted string
    **/
   decrypt( encrypted ){

      this.checkInit();

      const decipher = crypto.createDecipheriv( this.algorithm, this.key, this.iv ),
         decrypted = decipher.update( encrypted, 'hex', 'utf8' ) +
           decipher.final( 'utf8' );

      return decrypted;
   };
};

module.exports = new Crypt();
