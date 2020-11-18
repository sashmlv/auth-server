'use strict';

/**
 * Check is url starts with str
 * @param {srting} str
 * @param {srting} url
 * @return {boolean} Return result
 **/
function is( str, url ) {

   return url.indexOf( str ) === 0;
}

module.exports = is;
