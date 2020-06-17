/*jslint browser: true, vars: true, indent: 2, maxlen: 120 */
/*global require */
/*global requirejs */
/*global define */

//----------------------------------------------------------------------------------------------------------------------
requirejs.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'jquery/jquery',
    'jquery.cookie': 'js-cookie/js.cookie',
    'js-cookie': 'js-cookie/js.cookie'
  }
});

//----------------------------------------------------------------------------------------------------------------------
require(["Plaisio/PageDecorator/CorePageDecorator"]);
