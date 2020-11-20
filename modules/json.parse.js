'use strict';

/**
 * Parse json
 * @param {string} str
 * @return {*} Return result
 **/
function jsonParse( str ){

   try {

      return JSON.parse( str );
   }
   catch( err ) {

      return str;
   }
}

module.exports = jsonParse;
