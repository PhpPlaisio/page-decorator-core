/*jslint browser: true, vars: true, indent: 2, maxlen: 120 */
/*global define */

//----------------------------------------------------------------------------------------------------------------------
define(
  'Plaisio/PageDecorator/DetailTable',

  ['jquery'],

  function ($) {
    "use strict";
    //------------------------------------------------------------------------------------------------------------------
    /**
     * Object constructor.
     *
     * @constructor
     */
    function DetailTable($table) {
      // The HTML table associated with the JavaScript object.
      this.$myTable = $table;

      // Execute additional initializations (if any)
      this.initHook();
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * Array with all registered detail tables.
     *
     * @type {{DetailTable}}
     */
    DetailTable.ourTables = {};

    //------------------------------------------------------------------------------------------------------------------
    /**
     *  Install additional event handlers and other actions for the table.
     */
    DetailTable.prototype.initHook = function () {
      // Install event handlers.
      this.$myTable.find('.table_export_csv').click({table: this}, DetailTable.convertTableEventHandler);
    };

    //------------------------------------------------------------------------------------------------------------------
    /**
     * Registers tables that matches a jQuery selector as a DetailTable.
     *
     * @param selector  {string} The jQuery selector.
     */
    DetailTable.registerTable = function (selector) {
      let class_name = 'DetailTable';

      $(selector).each(function () {
        let $this1 = $(this);

        if ($this1.is('table')) {
          // Selector is a table.
          if (!$this1.hasClass('registered')) {
            DetailTable.ourTables[DetailTable.ourTables.length] = new window[class_name]($this1);
            $this1.addClass('registered');
          }
        } else {
          // Selector is not a table. Find the table below the selector.
          $this1.find('table').first().each(function () {
            let $this2 = $(this);
            if (!$this2.hasClass('registered')) {
              DetailTable.ourTables[DetailTable.ourTables.length] = new window[class_name]($this2);
              $this2.addClass('registered');
            }
          });
        }
      });
    };

    //------------------------------------------------------------------------------------------------------------------
    return DetailTable;

    //------------------------------------------------------------------------------------------------------------------
  }
);

//----------------------------------------------------------------------------------------------------------------------
