/*!
* base JavaScript Library v@VERSION
*
* Date: @DATE
*/

(function(global, factory) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get base.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var base = require("base")(window);
    module.exports = global.document ?
    factory(require('jquery'), true) :
    function( w ) {
      if ( !w.document ) {
        throw new Error( "base requires a window with a document" );
      }
      return module.exports = factory(require('jquery'));
    };
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    global.returnExports = factory(global.jQuery);
  }
  // Pass this if window is not defined yet
}(this, function($) {
