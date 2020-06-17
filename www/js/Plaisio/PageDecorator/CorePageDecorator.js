/*jslint browser: true, single: true, maxlen: 120, eval: true, white: true */
/*global define */
/*global php_plaisio_inline_js*/

//----------------------------------------------------------------------------------------------------------------------
define(
  'Plaisio/PageDecorator/CorePageDecorator',
  ['jquery',
    'Plaisio/Core/InputTable',
    'SetBased/Abc/Table/OverviewTablePackage',
    'SetBased/Abc/Form/FormPackage'],

  function ($, InputTable, OverviewTable, Form) {
    'use strict';
    //------------------------------------------------------------------------------------------------------------------
    $('form').submit(InputTable.setCsrfValue);
    Form.registerForm('form');
    InputTable.registerTable('form');

      let mq = window.matchMedia("only screen and (max-width: 40em)");
      OverviewTable.registerTable('table.overview-table', mq);

    if (window.hasOwnProperty('php_plaisio_inline_js')) {
      eval(php_plaisio_inline_js);
    }

    //------------------------------------------------------------------------------------------------------------------
  }
);

//----------------------------------------------------------------------------------------------------------------------
