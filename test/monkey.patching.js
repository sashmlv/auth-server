'use strict';

/**
 * Replace cached module
 * @param {string} path - module path
 * @param {string} module
 * @return {undefind} Return undefind
 **/
function monkeyPatching( path, module ){

   delete require.cache[ require.resolve( path )];
   require.cache[ require.resolve( path )] = {

      exports: module
   };
}

module.exports = monkeyPatching;
